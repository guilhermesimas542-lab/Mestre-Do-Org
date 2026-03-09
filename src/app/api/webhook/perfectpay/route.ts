import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WEBHOOK_TOKEN = process.env.PERFECTPAY_WEBHOOK_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Constantes de status (documentação PerfectPay)
// ---------------------------------------------------------------------------
const SALE_STATUS = {
  NONE: 0,
  PENDING: 1, // PIX/Boleto pendente
  APPROVED: 2, // Venda aprovada
  IN_PROCESS: 3,
  IN_MEDIATION: 4,
  REJECTED: 5,
  CANCELLED: 6,
  REFUNDED: 7, // Devolvido — revogar acesso
  AUTHORIZED: 8,
  CHARGED_BACK: 9, // Chargeback — revogar acesso
  COMPLETED: 10,
  CHECKOUT_ERROR: 11,
  PRECHECKOUT: 12,
  EXPIRED: 13,
  IN_REVIEW: 16,
} as const;

// ---------------------------------------------------------------------------
// Tipos do payload — documentação oficial PerfectPay
// https://help.perfectpay.com.br/article/597-integracao-via-webhook-com-a-perfect-pay
// ---------------------------------------------------------------------------
interface PerfectPayCustomer {
  customer_type_enum?: number;
  full_name?: string;
  email?: string;
  identification_type?: string;
  identification_number?: string;
  birthday?: string;
  phone_area_code?: string;
  phone_number?: string;
  country?: string;
  state?: string;
  city?: string;
  zip_code?: string;
  street_name?: string;
  street_number?: string;
  complement?: string;
  district?: string;
}

interface PerfectPayProduct {
  code?: string;
  name?: string;
  external_reference?: string;
  guarantee?: number;
}

interface PerfectPayPlan {
  code?: string;
  name?: string;
  quantity?: number;
}

interface PerfectPayMetadata {
  src?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_term?: string | null;
  utm_content?: string | null;
  utm_perfect?: string | null;
  _fbp?: string | null;
  _fbc?: string | null;
}

interface PerfectPayWebhookBody {
  token?: string;
  code?: string;
  sale_amount?: number;
  currency_enum?: number;
  coupon_code?: string | null;
  installments?: number;
  installment_amount?: number | null;
  shipping_type_enum?: number;
  shipping_amount?: number | null;
  payment_method_enum?: number;
  payment_type_enum?: number;
  billet_url?: string;
  billet_number?: string | null;
  billet_expiration?: string | null;
  quantity?: number;
  sale_status_enum?: number;
  sale_status_detail?: string;
  date_created?: string;
  date_approved?: string | null;
  product?: PerfectPayProduct;
  plan?: PerfectPayPlan;
  customer?: PerfectPayCustomer;
  metadata?: PerfectPayMetadata;
}

// ---------------------------------------------------------------------------
// Validar token (body.token ou header x-perfectpay-token)
// ---------------------------------------------------------------------------
function validateWebhook(
  headerToken: string | null,
  bodyToken: string | undefined
): boolean {
  if (!WEBHOOK_TOKEN) return false;
  if (headerToken && headerToken === WEBHOOK_TOKEN) return true;
  if (bodyToken && bodyToken === WEBHOOK_TOKEN) return true;
  return false;
}

// ---------------------------------------------------------------------------
// Mapear código do produto/plano PerfectPay para plano interno
// ---------------------------------------------------------------------------
const productPlanMap: Record<
  string,
  { plan: string; duration: number; value: number; sendPurchaseToMeta: boolean }
> = {
  // Funil Meta (slugs sem "2") — apenas front e bd_front enviam Purchase ao Meta
  PPU38CQ8F6P: { plan: "front",    duration: 365, value: 167, sendPurchaseToMeta: true },
  PPU38CQ8F6Q: { plan: "bd_front", duration: 365, value: 127, sendPurchaseToMeta: true },
  PPU38CQ85K0: { plan: "upsell",   duration: 365, value: 156, sendPurchaseToMeta: false },
  PPU38CQ8H9K: { plan: "upsell",   duration: 365, value: 156, sendPurchaseToMeta: false },
  PPU38CQ8H9J: { plan: "downsell", duration: 365, value: 97,  sendPurchaseToMeta: false },
  // Funil TikTok (slugs com "2") — nenhum envia ao Meta
  PPU38CQ8ME3: { plan: "front2",    duration: 365, value: 167, sendPurchaseToMeta: false },
  PPU38CQ8ME4: { plan: "bd_front2", duration: 365, value: 127, sendPurchaseToMeta: false },
  PPU38CQ8ME5: { plan: "upsell2",   duration: 365, value: 156, sendPurchaseToMeta: false },
  PPU38CQ8ME6: { plan: "downsell2", duration: 365, value: 97,  sendPurchaseToMeta: false },
};

function mapCodeToPlan(
  productCode: string,
  planCode: string
): { plan: string; duration: number; value: number; sendPurchaseToMeta: boolean } | null {
  const p = (productCode ?? "").trim();
  const pl = (planCode ?? "").trim();
  return productPlanMap[p] ?? productPlanMap[pl] ?? null;
}

// ---------------------------------------------------------------------------
// Recuperar fbp/fbc: 1) User no banco, 2) metadata do webhook, 3) InitiateCheckout recente
// ---------------------------------------------------------------------------
async function recoverMetaIds(
  email: string,
  metadata?: PerfectPayMetadata | null
): Promise<{ fbp: string; fbc: string }> {
  const normalizedEmail = email?.toLowerCase().trim();
  if (!normalizedEmail) return { fbp: "", fbc: "" };

  const fbpFromMeta = (metadata?._fbp ?? "").trim();
  const fbcFromMeta = (metadata?._fbc ?? "").trim();
  if (fbpFromMeta || fbcFromMeta) {
    return { fbp: fbpFromMeta, fbc: fbcFromMeta };
  }

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (user?.fbp || user?.fbc) {
    return { fbp: user.fbp ?? "", fbc: user.fbc ?? "" };
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const events = await prisma.adminEvent.findMany({
    where: {
      eventType: "InitiateCheckout",
      createdAt: { gte: since },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  for (const event of events) {
    const meta = event.metadata as { email?: string; fbp?: string; fbc?: string } | null;
    if (meta && (meta.email ?? "").toLowerCase().trim() === normalizedEmail) {
      return {
        fbp: meta.fbp ?? "",
        fbc: meta.fbc ?? "",
      };
    }
  }

  // Fallback: último InitiateCheckout na última 1h (mesmo usuário provável)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const lastEvent = await prisma.adminEvent.findFirst({
    where: {
      eventType: "InitiateCheckout",
      createdAt: { gte: oneHourAgo },
    },
    orderBy: { createdAt: "desc" },
  });
  const lastMeta = lastEvent?.metadata as { fbp?: string; fbc?: string } | null;
  if (lastMeta && (lastMeta.fbp || lastMeta.fbc)) {
    return { fbp: lastMeta.fbp ?? "", fbc: lastMeta.fbc ?? "" };
  }

  return { fbp: "", fbc: "" };
}

// ---------------------------------------------------------------------------
// Extrair nome e sobrenome de full_name
// ---------------------------------------------------------------------------
function splitFullName(fullName: string): { fn: string; ln: string } {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { fn: "", ln: "" };
  if (parts.length === 1) return { fn: parts[0], ln: "" };
  return {
    fn: parts[0],
    ln: parts.slice(1).join(" "),
  };
}

// ---------------------------------------------------------------------------
// Montar telefone (DDD + número)
// ---------------------------------------------------------------------------
function buildPhone(areaCode?: string, number?: string): string {
  const a = (areaCode ?? "").trim();
  const n = (number ?? "").trim().replace(/\D/g, "");
  if (!n) return "";
  return a ? `+55${a}${n}` : n;
}

// ---------------------------------------------------------------------------
// Idempotência: já processamos esta venda (body.code)?
// ---------------------------------------------------------------------------
async function alreadyProcessed(saleCode: string): Promise<boolean> {
  if (!saleCode) return false;
  const existing = await prisma.payment.findFirst({
    where: { gatewayId: saleCode },
  });
  return !!existing;
}

// ---------------------------------------------------------------------------
// POST: processar webhook
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PerfectPayWebhookBody;
    const headerToken = req.headers.get("x-perfectpay-token");
    const valid = validateWebhook(headerToken, body.token);
    if (!valid) {
      console.error("[webhook/perfectpay] Token inválido ou ausente");
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const saleCode = body.code ?? "";
    const statusEnum = body.sale_status_enum ?? SALE_STATUS.NONE;
    const customer = body.customer ?? {};
    const email = (customer.email ?? "").trim();
    const metadata = body.metadata;

    // Refund ou Chargeback — revogar acesso
    if (statusEnum === SALE_STATUS.REFUNDED || statusEnum === SALE_STATUS.CHARGED_BACK) {
      if (email) {
        await prisma.user
          .updateMany({
            where: { email: email.toLowerCase() },
            data: {
              isPremium: false,
              planType: null,
              subscriptionExpiresAt: null,
            },
          })
          .catch((e) => console.error("[webhook/perfectpay] Erro ao revogar acesso:", e));
      }
      return NextResponse.json({ ok: true, processed: true, action: "access_revoked" });
    }

    // Apenas venda aprovada segue com Purchase e atualização de usuário
    if (statusEnum !== SALE_STATUS.APPROVED) {
      return NextResponse.json({ ok: true });
    }

    if (!email) {
      console.error("[webhook/perfectpay] Email ausente no body");
      return NextResponse.json({ ok: true });
    }

    if (await alreadyProcessed(saleCode)) {
      return NextResponse.json({ ok: true, processed: false, duplicate: true });
    }

    const productCode = body.product?.code ?? "";
    const planCode = body.plan?.code ?? "";
    const mapped = mapCodeToPlan(productCode, planCode);
    const plan = mapped?.plan ?? "unknown";
    const duration = mapped?.duration ?? 365;
    const value = mapped?.value ?? body.sale_amount ?? 0;
    const gatewayId = saleCode;

    const { fn, ln } = splitFullName(customer.full_name ?? "");
    const phone = buildPhone(customer.phone_area_code, customer.phone_number);
    const city = (customer.city ?? "").trim();
    const state = (customer.state ?? "").trim();
    const country = (customer.country ?? "").trim();
    const zipCode = (customer.zip_code ?? "").trim();
    const birthday = (customer.birthday ?? "").trim();

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    if (mapped?.sendPurchaseToMeta === true) {
      const { fbp, fbc } = await recoverMetaIds(email, metadata);

      await fetch(`${baseUrl}/api/meta-capi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName: "Purchase",
          event_id: gatewayId,
          eventData: {
            value,
            currency: "BRL",
            content_name: plan,
            order_id: gatewayId,
          },
          userData: {
            email: email.toLowerCase(),
            fbp,
            fbc,
            phone: phone || undefined,
            fn: fn || undefined,
            ln: ln || undefined,
            city: city || undefined,
            state: state || undefined,
            country: country || undefined,
            zp: zipCode || undefined,
            db: birthday || undefined,
          },
        }),
      });
    }

    const expiresAt = new Date(
      Date.now() + duration * 24 * 60 * 60 * 1000
    );

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase() },
      update: {
        isPremium: true,
        planType: plan,
        subscriptionExpiresAt: expiresAt,
      },
      create: {
        email: email.toLowerCase(),
        isPremium: true,
        planType: plan,
        subscriptionExpiresAt: expiresAt,
      },
    });

    const utmParams =
      metadata && (metadata.utm_source || metadata.utm_medium || metadata.utm_campaign)
        ? {
            utm_source: metadata.utm_source ?? undefined,
            utm_medium: metadata.utm_medium ?? undefined,
            utm_campaign: metadata.utm_campaign ?? undefined,
            utm_term: metadata.utm_term ?? undefined,
            utm_content: metadata.utm_content ?? undefined,
          }
        : undefined;

    await prisma.payment.create({
      data: {
        userId: user.id,
        status: "completed",
        subscriptionType: plan,
        amount: value,
        gatewayId,
        utmParams: utmParams ?? undefined,
      },
    });

    return NextResponse.json({ ok: true, processed: true });
  } catch (error) {
    console.error("[webhook/perfectpay] Erro:", error);
    return NextResponse.json({ ok: true });
  }
}

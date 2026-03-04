import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WEBHOOK_TOKEN = process.env.PERFECTPAY_WEBHOOK_TOKEN ?? "";

// ---------------------------------------------------------------------------
// Função 1: Validar token do webhook (header ou body.token)
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
// Função 2: Mapear código do produto PerfectPay para plano interno
// ---------------------------------------------------------------------------
const productMap: Record<
  string,
  { plan: string; duration: number; value: number }
> = {
  PPU38CQ8F6P: { plan: "front", duration: 365, value: 167 },
  PPU38CQ8F6Q: { plan: "bd_front", duration: 365, value: 127 },
  PPU38CQ85K0: { plan: "upsell", duration: 365, value: 156 },
};

function mapProductToPlan(
  productCode: string
): { plan: string; duration: number; value: number } | null {
  const normalized = (productCode ?? "").trim();
  return productMap[normalized] ?? null;
}

// ---------------------------------------------------------------------------
// Função 3: Recuperar fbp/fbc em 3 camadas
// ---------------------------------------------------------------------------
async function recoverMetaIds(
  email: string,
  _productCode: string
): Promise<{ fbp: string; fbc: string }> {
  const normalizedEmail = email?.toLowerCase().trim();
  if (!normalizedEmail) return { fbp: "", fbc: "" };

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });
  if (user?.fbp && user?.fbc) {
    return { fbp: user.fbp, fbc: user.fbc };
  }
  if (user?.fbp) return { fbp: user.fbp, fbc: user.fbc ?? "" };
  if (user?.fbc) return { fbp: user.fbp ?? "", fbc: user.fbc };

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

  return { fbp: "", fbc: "" };
}

// ---------------------------------------------------------------------------
// Tipos do body do webhook PerfectPay (ajuste conforme a documentação real)
// ---------------------------------------------------------------------------
interface PerfectPayWebhookBody {
  status?: string;
  customer?: { email?: string };
  amount?: number;
  product?: { code?: string };
  transaction_id?: string;
  id?: string;
}

// ---------------------------------------------------------------------------
// POST: processar webhook
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PerfectPayWebhookBody & { token?: string };
    const headerToken = req.headers.get("x-perfectpay-token");
    const valid = validateWebhook(headerToken, body.token);
    if (!valid) {
      console.error("[webhook/perfectpay] Token inválido ou ausente");
      return NextResponse.json({ ok: false }, { status: 200 });
    }

    const status = body.status ?? "";
    const email = body.customer?.email ?? "";
    const amount = body.amount ?? 0;
    const productCode = body.product?.code ?? "";
    const gatewayId = body.transaction_id ?? body.id ?? productCode;

    if (status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const mapped = mapProductToPlan(productCode);
    const plan = mapped?.plan ?? "unknown";
    const duration = mapped?.duration ?? 365;
    const value = mapped?.value ?? amount;

    if (!email) {
      console.error("[webhook/perfectpay] Email ausente no body");
      return NextResponse.json({ ok: true });
    }

    const { fbp, fbc } = await recoverMetaIds(email, productCode);

    const baseUrl =
      process.env.NEXTAUTH_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");

    await fetch(`${baseUrl}/api/meta-capi`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventData: {
          value,
          currency: "BRL",
          content_name: plan,
          order_id: gatewayId,
        },
        userData: { email: email.trim(), fbp, fbc },
      }),
    });

    const expiresAt = new Date(
      Date.now() + duration * 24 * 60 * 60 * 1000
    );

    const user = await prisma.user.upsert({
      where: { email: email.toLowerCase().trim() },
      update: {
        isPremium: true,
        planType: plan,
        subscriptionExpiresAt: expiresAt,
      },
      create: {
        email: email.toLowerCase().trim(),
        isPremium: true,
        planType: plan,
        subscriptionExpiresAt: expiresAt,
      },
    });

    await prisma.payment.create({
      data: {
        userId: user.id,
        status: "completed",
        subscriptionType: plan,
        amount: value,
        gatewayId: gatewayId || undefined,
      },
    });

    return NextResponse.json({ ok: true, processed: true });
  } catch (error) {
    console.error("[webhook/perfectpay] Erro:", error);
    return NextResponse.json({ ok: true });
  }
}

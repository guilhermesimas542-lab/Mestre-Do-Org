import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";

const META_API_VERSION = "v18.0";
const PIXEL_ID = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN ?? "";
const TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE ?? undefined;

function normalizePII(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s/g, "");
}

function hashPII(value: string): string {
  const normalized = normalizePII(value);
  return createHash("sha256").update(normalized).digest("hex");
}

interface MetaCapiBody {
  eventName: "PageView" | "InitiateCheckout" | "Purchase";
  eventData?: {
    value?: number;
    currency?: string;
    content_name?: string;
    content_ids?: string[];
    order_id?: string;
  };
  userData?: {
    email?: string;
    fbp?: string;
    fbc?: string;
    phone?: string;
    fn?: string;
    ln?: string;
    city?: string;
    state?: string;
    country?: string;
    zp?: string;
    db?: string;
    ge?: string;
  };
  // Formato alternativo enviado pelo front (fb-pixel.ts)
  fbp?: string;
  fbc?: string;
  value?: number;
  currency?: string;
  contentIds?: string[];
  content_name?: string;
  order_id?: string;
}

export async function POST(req: NextRequest) {
  try {
    if (!PIXEL_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Meta CAPI não configurado (PIXEL_ID ou ACCESS_TOKEN)" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as MetaCapiBody;
    const eventName = body.eventName ?? "InitiateCheckout";
    const userData = body.userData ?? {
      fbp: body.fbp,
      fbc: body.fbc,
    };
    const eventData = body.eventData ?? {
      value: body.value,
      currency: body.currency,
      content_name: body.content_name ?? (body.contentIds?.[0] ? body.contentIds[0] : undefined),
      content_ids: body.contentIds,
      order_id: body.order_id,
    };

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "";
    const clientUserAgent = req.headers.get("user-agent") ?? "";

    const ct = req.headers.get("x-vercel-ip-city");
    const country = req.headers.get("x-vercel-ip-country");
    const st = req.headers.get("x-vercel-ip-country-region");

    const user_data: Record<string, unknown> = {
      client_ip_address: clientIp,
      client_user_agent: clientUserAgent,
      fbc: userData.fbc ?? "",
      fbp: userData.fbp ?? "",
    };

    if (userData.email) {
      user_data.em = [hashPII(userData.email)];
    }
    if (userData.phone) {
      user_data.ph = [hashPII(userData.phone)];
    }
    if (userData.fn) {
      user_data.fn = [hashPII(userData.fn)];
    }
    if (userData.ln) {
      user_data.ln = [hashPII(userData.ln)];
    }
    // Cidade, estado, país: prioridade no userData (ex.: webhook PerfectPay), senão headers Vercel
    const cityRaw = userData.city ?? ct ?? "";
    const stateRaw = userData.state ?? st ?? "";
    const countryRaw = userData.country ?? country ?? "";
    if (cityRaw) user_data.ct = [hashPII(cityRaw)];
    if (stateRaw) user_data.st = [hashPII(stateRaw)];
    if (countryRaw) user_data.country = [hashPII(countryRaw)];
    // CEP (zp), data de nascimento (db), gênero (ge) — tudo que a Meta aceita
    if (userData.zp) user_data.zp = [hashPII(userData.zp)];
    if (userData.db) user_data.db = [hashPII(userData.db)];
    if (userData.ge) user_data.ge = [hashPII(userData.ge)];

    const custom_data: Record<string, unknown> = {};
    if (eventData.value != null) custom_data.value = eventData.value;
    if (eventData.currency) custom_data.currency = eventData.currency;
    if (eventData.content_name) custom_data.content_name = eventData.content_name;
    if (eventData.content_ids?.length) custom_data.content_ids = eventData.content_ids;
    if (eventData.order_id) custom_data.order_id = eventData.order_id;

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: crypto.randomUUID(),
          action_source: "website",
          user_data: user_data,
          custom_data: Object.keys(custom_data).length > 0 ? custom_data : undefined,
        },
      ],
      access_token: ACCESS_TOKEN,
      ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }),
    };

    const url = `https://graph.facebook.com/${META_API_VERSION}/${PIXEL_ID}/events`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json()) as {
      events_received?: number;
      fbtrace_id?: string;
      error?: { message: string; type: string; code: number };
    };

    if (!res.ok) {
      console.error("[meta-capi] Resposta Meta:", data);
      const status = res.status >= 400 && res.status < 600 ? res.status : 502;
      return NextResponse.json(
        {
          ok: false,
          error: data?.error?.message ?? "Erro ao enviar evento para Meta",
          meta: data?.error ? { type: data.error.type, code: data.error.code } : undefined,
        },
        { status }
      );
    }

    return NextResponse.json({
      ok: true,
      ...data,
    });
  } catch (error) {
    console.error("[meta-capi] Erro:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { ParamBuilder } from "capi-param-builder-nodejs";

const ALLOWED_DOMAINS = ["www.institutonexxa.com", "institutonexxa.com"];
const COOKIE_MAX_AGE = 90 * 24 * 60 * 60; // 90 dias em segundos

export async function POST(req: NextRequest) {
  try {
    const builder = new ParamBuilder(ALLOWED_DOMAINS);

    // Extrai host, referer e IPs dos headers
    const host = req.headers.get("host") ?? "";
    const referer = req.headers.get("referer");
    const xForwardedFor = req.headers.get("x-forwarded-for");
    // Next.js Edge/Node não expõe remoteAddress diretamente — usa X-Real-IP como fallback
    const remoteAddress = req.headers.get("x-real-ip");

    // Converte query params para objeto simples
    const queries: Record<string, string> = {};
    req.nextUrl.searchParams.forEach((value, key) => {
      queries[key] = value;
    });

    // Lê cookies existentes da requisição
    const cookies: Record<string, string> = {};
    req.cookies.getAll().forEach(({ name, value }) => {
      cookies[name] = value;
    });

    // Processa via CAPI Param Builder — retorna cookies a serem definidos
    const cookiesToSet = builder.processRequest(
      host,
      Object.keys(queries).length > 0 ? queries : null,
      Object.keys(cookies).length > 0 ? cookies : null,
      referer ?? null,
      xForwardedFor ?? null,
      remoteAddress ?? null
    );

    // Recupera valores processados
    const fbc = builder.getFbc() ?? "";
    const fbp = builder.getFbp() ?? "";

    // _fbi pode aparecer nos cookies retornados (não há getter dedicado na SDK)
    const fbiCookie = cookiesToSet.find((c) => c.name === "_fbi");
    const fbi = fbiCookie?.value ?? "";

    // Monta a resposta com os valores
    const response = NextResponse.json({ fbc, fbp, fbi });

    // Define os cookies processados na resposta
    for (const cookie of cookiesToSet) {
      response.cookies.set(cookie.name, cookie.value, {
        maxAge: COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
        // httpOnly: false — precisa ser acessível pelo JS do cliente (Meta Pixel)
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    }

    return response;
  } catch (error) {
    console.error("[process-params] Erro ao processar parâmetros Meta:", error);
    return NextResponse.json(
      {
        error: "Falha ao processar parâmetros do CAPI",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

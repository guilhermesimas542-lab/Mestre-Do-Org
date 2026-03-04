"use client";

import { trackInitiateCheckout, getCookie } from "./fb-pixel";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

type UTMKey = (typeof UTM_KEYS)[number];
type UTMParams = Partial<Record<UTMKey, string>>;

// ---------------------------------------------------------------------------
// collectAllUTMs — merge de UTMs de todas as fontes
// Prioridade: URL atual > sessionStorage > localStorage
// ---------------------------------------------------------------------------
export function collectAllUTMs(): UTMParams {
  const result: UTMParams = {};

  // 1. localStorage (menor prioridade)
  for (const key of UTM_KEYS) {
    const value = localStorage.getItem(key);
    if (value) result[key] = value;
  }

  // 2. sessionStorage (pode estar serializado como JSON ou em chaves individuais)
  try {
    const stored = sessionStorage.getItem("utms");
    if (stored) {
      const parsed: Record<string, string> = JSON.parse(stored);
      for (const key of UTM_KEYS) {
        if (parsed[key]) result[key] = parsed[key];
      }
    }
  } catch {
    // sessionStorage sem JSON válido — ignora silenciosamente
  }

  for (const key of UTM_KEYS) {
    const value = sessionStorage.getItem(key);
    if (value) result[key] = value;
  }

  // 3. URL atual (maior prioridade)
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) result[key] = value;
  }

  return result;
}

// ---------------------------------------------------------------------------
// openCheckoutWithTracking — abre o checkout com UTMs + Meta IDs
// ---------------------------------------------------------------------------
export async function openCheckoutWithTracking(
  checkoutUrl: string,
  plan: string,
  value: number
): Promise<void> {
  // 1. Coleta UTMs de todas as fontes
  const utms = collectAllUTMs();

  // 2. Dispara InitiateCheckout no Meta Pixel + CAPI + banco
  await trackInitiateCheckout(plan, value);

  // 3. Monta a URL final com UTMs e IDs Meta como query params
  const url = new URL(checkoutUrl);

  for (const [key, val] of Object.entries(utms)) {
    if (val) url.searchParams.set(key, val);
  }

  const fbp = getCookie("_fbp");
  const fbc = getCookie("_fbc") || localStorage.getItem("_fbc") || "";
  if (fbp) url.searchParams.set("metadata_fbp", fbp);
  if (fbc) url.searchParams.set("metadata_fbc", fbc);

  const finalUrl = url.toString();

  // 4. Desktop → popup; Mobile → redirect direto
  const isDesktop = window.innerWidth > 768;

  if (isDesktop) {
    const popup = window.open(
      finalUrl,
      "checkout",
      "width=800,height=700,scrollbars=yes,resizable=yes"
    );

    // Fallback: se popup bloqueado pelo browser, redireciona normalmente
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      window.location.href = finalUrl;
    }
  } else {
    window.location.href = finalUrl;
  }
}

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

  // 2. Dispara tracking em background (não espera — redirect segue na hora)
  trackInitiateCheckout(plan, value).catch(() => {});

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

  // 4. Redirect na mesma aba (fluxo natural do lead, sem popup)
  window.location.href = finalUrl;
}

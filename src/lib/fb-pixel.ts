"use client";

// ---------------------------------------------------------------------------
// hashPII — SHA-256 com normalização (browser + Node.js)
// ---------------------------------------------------------------------------
export async function hashPII(value: string): Promise<string> {
  const normalized = value.toLowerCase().trim();
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);

  if (typeof window !== "undefined" && window.crypto?.subtle) {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  // Node.js fallback (SSR)
  const { createHash } = await import("crypto");
  return createHash("sha256").update(normalized).digest("hex");
}

// ---------------------------------------------------------------------------
// getCookie — lê um cookie pelo nome
// ---------------------------------------------------------------------------
export function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? match.split("=").slice(1).join("=") : "";
}

// ---------------------------------------------------------------------------
// initFacebookTracking — captura fbclid e grava cookie _fbc
// ---------------------------------------------------------------------------
export function initFacebookTracking(): void {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const fbclid = params.get("fbclid");

  if (fbclid) {
    const fbc = `fb.1.${Date.now()}.${fbclid}`;
    const maxAge = 90 * 24 * 60 * 60; // 90 dias em segundos
    document.cookie = `_fbc=${fbc}; max-age=${maxAge}; path=/; SameSite=Lax`;
    localStorage.setItem("_fbc", fbc);
  }
}

// ---------------------------------------------------------------------------
// Helpers internos para capturar UTMs e identificadores Meta
// ---------------------------------------------------------------------------
function getUTMParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ];
  const result: Record<string, string> = {};
  for (const key of utmKeys) {
    const value = params.get(key);
    if (value) result[key] = value;
  }
  return result;
}

function getMetaIds(): { fbp: string; fbc: string } {
  return {
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc") || localStorage.getItem("_fbc") || "",
  };
}

// ---------------------------------------------------------------------------
// trackEvent — envia evento genérico para /api/track-event
// ---------------------------------------------------------------------------
export async function trackEvent(
  eventName: string,
  eventData?: Record<string, unknown>
): Promise<void> {
  const { fbp, fbc } = getMetaIds();

  const payload = {
    eventName,
    userAgent: navigator.userAgent,
    fbp,
    fbc,
    utmParams: getUTMParams(),
    ...eventData,
  };

  await fetch("/api/track-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------------------------
// reportTrackingError — grava erro no banco para ver no dashboard
// ---------------------------------------------------------------------------
function reportTrackingError(step: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  fetch("/api/track-event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      eventName: "TrackingError",
      metadata: { step, error: message },
      userAgent: navigator.userAgent,
    }),
  }).catch(() => {});
}

// ---------------------------------------------------------------------------
// trackInitiateCheckout — salva IDs Meta + dispara CAPI + grava evento
// ---------------------------------------------------------------------------
export async function trackInitiateCheckout(
  plan: string,
  value: number
): Promise<void> {
  const { fbp, fbc } = getMetaIds();

  try {
    // 1. Persiste fbp/fbc no banco (não bloqueia se falhar)
    const r1 = await fetch("/api/save-meta-ids", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fbp, fbc }),
    });
    if (!r1.ok) {
      reportTrackingError("save-meta-ids", `status ${r1.status}`);
    }
  } catch (e) {
    reportTrackingError("save-meta-ids", e);
  }

  try {
    // 2. Dispara InitiateCheckout via CAPI
    const r2 = await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "InitiateCheckout",
        fbp,
        fbc,
        value,
        currency: "BRL",
        contentIds: [plan],
        userAgent: navigator.userAgent,
        utmParams: getUTMParams(),
      }),
    });
    if (!r2.ok) {
      const text = await r2.text();
      reportTrackingError("meta-capi", `${r2.status}: ${text.slice(0, 200)}`);
    }
  } catch (e) {
    reportTrackingError("meta-capi", e);
  }

  try {
    // 3. Grava o evento no banco local (com fbp/fbc para recuperação no webhook)
    await trackEvent("InitiateCheckout", {
      metadata: { plan, value, fbp, fbc },
    });
  } catch (e) {
    reportTrackingError("track-event", e);
  }
}

export const CONSENT_KEY = "consent.v1";
export const CONSENT_OPEN_EVENT = "consent:open";
export const CONSENT_CHANGE_EVENT = "consent:change";

export type ConsentChoice = { analytics: boolean; ts: string };

/**
 * Runs inline in <head> before any tag loads: Consent Mode v2 defaults to denied, then re-applies a
 * stored choice. Kept as a string so it executes before hydration (tracking-plan.md).
 */
export const consentDefaultsScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
  wait_for_update: 500
});
try {
  var c = JSON.parse(localStorage.getItem('${CONSENT_KEY}') || 'null');
  if (c) gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied' });
} catch (e) {}
`;

// `window.dataLayer` is declared by @next/third-parties (`dataLayer?: Object[]`).
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function readConsent(): ConsentChoice | null {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY) ?? "null");
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean) {
  const choice: ConsentChoice = { analytics, ts: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
  } catch {
    // Private mode: the choice applies to this page view only.
  }
  window.gtag?.("consent", "update", { analytics_storage: analytics ? "granted" : "denied" });
  (window.dataLayer ??= []).push({ event: "consent_update", analytics });
  if (!analytics) clearAnalyticsCookies();
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Withdrawing consent removes GA cookies set by an earlier "Accept" (on the host and the parent domain). */
function clearAnalyticsCookies() {
  const names = document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n.startsWith("_ga"));
  const host = location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const name of names)
    for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
}

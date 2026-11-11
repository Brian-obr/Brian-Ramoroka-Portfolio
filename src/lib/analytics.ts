/**
 * GA4 key events, pushed to `dataLayer` as GTM custom events (`{ event, ...params }`) once the visitor
 * has accepted analytics. In GTM, one GA4 Event tag on a Custom Event trigger forwards them to GA4.
 */
type AnalyticsEvent =
  | "generate_lead"
  | "cv_download"
  | "click_email"
  | "click_phone"
  | "click_whatsapp"
  | "outbound_click";

export const CONSENT_KEY = "consent";
export type ConsentState = "granted" | "denied";

function hasConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY) === "granted";
  } catch {
    return false;
  }
}

/** No-op without consent, so nothing is queued for GTM to replay later. */
export function track(event: AnalyticsEvent, params: Record<string, string | number> = {}) {
  if (!hasConsent()) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ??= []).push({ event, ...params });
}

/** Inline, runs before any other script: dataLayer stub + Consent Mode v2 defaults. */
export const consentBootstrap = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', functionality_storage: 'granted', security_storage: 'granted',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('${CONSENT_KEY}') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
`;

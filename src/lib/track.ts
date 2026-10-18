export type TrackEvent =
  | "generate_lead"
  | "form_submit_hiring"
  | "form_submit_project"
  | "cv_download"
  | "click_email"
  | "click_phone"
  | "click_whatsapp"
  | "click_booking"
  | "outbound_click";

/**
 * Pushes an event for GTM. When the site runs plain GA4 (no GTM container yet) it also calls gtag so the
 * event still reaches GA4. Never pass personal data (names, emails, phone numbers, messages) as params.
 */
export function track(event: TrackEvent, params: Record<string, string | number | boolean> = {}) {
  (window.dataLayer ??= []).push({ event, ...params });
  if (process.env.NEXT_PUBLIC_GTM_ID === undefined) window.gtag?.("event", event, params);
}

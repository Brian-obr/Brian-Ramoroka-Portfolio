import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

/**
 * GTM when a container id is configured (preferred, see tracking-plan.md); plain GA4 as a fallback so
 * production keeps measuring until the container exists. Consent defaults are set earlier in <head>.
 */
export default function Analytics() {
  if (process.env.NODE_ENV !== "production") return null;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;
  return null;
}

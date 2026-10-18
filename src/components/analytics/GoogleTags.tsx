import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

/** Loaded as its own chunk, only after consent (see Analytics.tsx). */
export default function GoogleTags() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;
  return null;
}

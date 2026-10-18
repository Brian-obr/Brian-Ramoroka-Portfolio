"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

/**
 * Basic Consent Mode: no Google tag is requested until the visitor accepts analytics, so the banner's
 * "only runs if you accept" is literally true. GTM when a container id is configured, else plain GA4.
 * Events pushed to dataLayer before acceptance stay queued and are processed when the tag loads.
 */
export default function Analytics() {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(readConsent()?.analytics === true);
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  if (!granted || process.env.NODE_ENV !== "production") return null;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gtmId) return <GoogleTagManager gtmId={gtmId} />;
  if (gaId) return <GoogleAnalytics gaId={gaId} />;
  return null;
}

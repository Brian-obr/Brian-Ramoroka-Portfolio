"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { CONSENT_CHANGE_EVENT, readConsent } from "@/lib/consent";

// Not in the first-load bundle: visitors who never accept never download it.
const GoogleTags = dynamic(() => import("./GoogleTags"));

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
  return <GoogleTags />;
}

"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import { CONSENT_KEY, type ConsentState } from "@/lib/analytics";

const OPEN_EVENT = "consent:open";
const CHANGE_EVENT = "consent:change";
const RELOAD_GUARD = "consent_reloaded";

function readConsent(): ConsentState | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(CHANGE_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(CHANGE_EVENT, cb);
  };
}

/** Opens the banner again (footer "Cookie settings"). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookie settings
    </button>
  );
}

/**
 * Basic Consent Mode v2: Google Tag Manager (and the GA4 tag inside it) is not requested until the visitor accepts.
 * Defaults (all denied) are set by `consentBootstrap` before this renders.
 * The banner is fixed-position, so it causes no layout shift.
 */
export default function Consent({ gtmId }: { gtmId?: string }) {
  // `undefined` during SSR and hydration: render nothing until storage is readable.
  const consent = useSyncExternalStore<ConsentState | null | undefined>(subscribe, readConsent, () => undefined);
  const [reopened, setReopened] = useState(false);

  // True once the GTM container has been rendered in this page; a script that ran stays until a full reload.
  const tagRan = useRef(false);

  // Apply the stored choice in every tab (a choice made in another tab arrives via `storage`).
  useEffect(() => {
    if (consent !== "granted" && consent !== "denied") return;
    const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
    gtag?.("consent", "update", { analytics_storage: consent });
    if (consent === "granted") {
      if (gtmId) tagRan.current = true;
      // A new grant re-arms the withdrawal cleanup below for this tab.
      try {
        sessionStorage.removeItem(RELOAD_GUARD);
      } catch {}
      return;
    }
    let reloaded = false;
    try {
      reloaded = sessionStorage.getItem(RELOAD_GUARD) === "1";
    } catch {}
    if ((tagRan.current || document.cookie.includes("_ga")) && !reloaded) {
      // Withdrawal: remove GA cookies and reload so the already-loaded gtag.js is gone too.
      const domain = window.location.hostname.replace(/^www\./, "");
      for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim()).filter((n) => n.startsWith("_ga"))) {
        for (const d of ["", `; domain=.${domain}`]) document.cookie = `${name}=; Max-Age=0; path=/${d}`;
      }
      try {
        // Reload at most once per withdrawal, even if a cookie can't be deleted (no reload loop).
        sessionStorage.setItem(RELOAD_GUARD, "1");
      } catch {}
      window.location.reload();
    }
  }, [consent, gtmId]);

  useEffect(() => {
    const show = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  const decide = (value: ConsentState) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {}
    setReopened(false);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  const showBanner = reopened || consent === null;
  const buttonClass =
    "min-h-[44px] rounded-full border border-border-hover px-4 text-sm font-semibold text-text-primary hover:border-accent";

  return (
    <>
      {gtmId && consent === "granted" && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
var s = document.createElement('script'); s.async = true;
s.src = 'https://www.googletagmanager.com/gtm.js?id=${gtmId}';
document.head.appendChild(s);`}
        </Script>
      )}
      {showBanner && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[560px] rounded-2xl border border-border-subtle bg-bg-card-solid p-5 shadow-lg md:bottom-6"
        >
          <p className="text-sm leading-relaxed text-text-body">
            I&apos;d like to use Google Analytics to see which pages help visitors. It only runs if you accept.{" "}
            <Link href="/privacy" className="deep-link">
              Privacy &amp; cookies
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => decide("denied")} className={buttonClass}>
              Reject
            </button>
            <button type="button" onClick={() => decide("granted")} className={buttonClass}>
              Accept
            </button>
          </div>
        </section>
      )}
    </>
  );
}

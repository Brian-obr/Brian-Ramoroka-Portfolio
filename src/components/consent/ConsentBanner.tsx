"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "@/lib/consent";

/** Bottom sheet overlaying the page (fixed, so it never shifts layout). Accept and Reject carry equal weight. */
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading localStorage must wait for the client; the banner is absent from server HTML on purpose.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!readConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (analytics: boolean) => {
    saveConsent(analytics);
    setOpen(false);
  };

  const button =
    "min-h-[44px] flex-1 rounded-lg px-4 text-sm font-semibold border border-white/20 transition-colors focus-visible:outline-2";

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-[560px] rounded-xl border border-white/15 bg-[#1A1817] p-5 text-[#F5F5F4] shadow-[0_8px_24px_rgb(0_0_0/0.5)]"
    >
      <p className="text-sm leading-relaxed">
        I&apos;d like to use Google Analytics to see which pages help visitors. It only runs if you accept.{" "}
        <Link href="/cookies" className="underline underline-offset-2">
          Cookie policy
        </Link>
        {" · "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button type="button" className={`${button} bg-transparent hover:bg-white/10`} onClick={() => choose(false)}>
          Reject
        </button>
        <button type="button" className={`${button} bg-transparent hover:bg-white/10`} onClick={() => choose(true)}>
          Accept analytics
        </button>
      </div>
    </section>
  );
}

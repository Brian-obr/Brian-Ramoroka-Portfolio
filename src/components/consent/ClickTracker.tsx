"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

/** One delegated listener for contact, CV and outbound clicks, so links stay plain markup. */
export default function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) track("click_email");
      else if (href.startsWith("tel:")) track("click_phone");
      else if (href.startsWith("https://wa.me/")) track("click_whatsapp");
      else if (href.endsWith(".pdf") && href.includes("/cv/")) track("cv_download");
      else if (/^https?:\/\//.test(href) && new URL(href).host !== window.location.host)
        track("outbound_click", { link_url: href });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

"use client";

import { useEffect } from "react";
import { track, type TrackEvent } from "@/lib/track";

const SITE_HOST = "www.brianramoroka.co.za";

/** One delegated listener for every tracked link, so links need no per-component wiring. */
function classify(a: HTMLAnchorElement): TrackEvent | null {
  const href = a.getAttribute("href") ?? "";
  if (a.dataset.track === "cv_download") return "cv_download";
  if (href.startsWith("mailto:")) return "click_email";
  if (href.startsWith("tel:")) return "click_phone";
  if (href.startsWith("https://wa.me/")) return "click_whatsapp";
  if (a.dataset.track === "click_booking") return "click_booking";
  if (/^https?:\/\//.test(href) && new URL(href).host !== SITE_HOST && new URL(href).host !== location.host) return "outbound_click";
  return null;
}

function locationOf(a: HTMLElement): string {
  const landmark = a.closest("header, footer, [data-section]");
  if (!landmark) return "body";
  if (landmark.tagName === "HEADER") return "header";
  if (landmark.tagName === "FOOTER") return "footer";
  return (landmark as HTMLElement).dataset.section ?? "body";
}

export default function TrackClicks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const event = classify(a);
      if (!event) return;
      const params: Record<string, string> = { link_location: locationOf(a) };
      if (event === "outbound_click") params.link_domain = new URL(a.href).host;
      if (event === "cv_download") params.file_name = a.pathname.split("/").pop() ?? "";
      track(event, params);
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

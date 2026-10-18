"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires the conversion once per submission id, so reloads and back-navigation don't double count. */
export default function ThankYouTracker({ type, id }: { type: "hiring" | "project"; id: string }) {
  useEffect(() => {
    const key = `lead:${id}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // sessionStorage unavailable: fire anyway, a duplicate is better than a lost lead.
    }
    track("generate_lead", { lead_type: type, submission_id: id });
    track(type === "hiring" ? "form_submit_hiring" : "form_submit_project", { submission_id: id });
  }, [type, id]);
  return null;
}

"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export const LEAD_FLAG = "lead_pending";

/** Fires `generate_lead` once per submission: the form sets the flag, this consumes it. */
export default function LeadEvent() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(LEAD_FLAG) === "1") {
        sessionStorage.removeItem(LEAD_FLAG);
        track("generate_lead", { form: "contact" });
      }
    } catch {}
  }, []);
  return null;
}

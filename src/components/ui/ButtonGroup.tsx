"use client";
import { useEffect, useRef } from "react";

/**
 * Buttons sit on one row (natural widths) when they fit; otherwise they stack and all take the
 * full width, so stacked buttons are always equal. Measured, not breakpoint-based, because the
 * system font makes button widths differ per platform. Without JS the row simply wraps.
 * Not used in hero sections (those keep their natural layout).
 */
export default function ButtonGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      el.dataset.layout = "measure"; // one nowrap row, to see whether it overflows
      el.dataset.layout = el.scrollWidth > el.clientWidth + 1 ? "stack" : "row";
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} data-btn-group className={`btn-group ${className}`.trim()}>
      {children}
    </div>
  );
}

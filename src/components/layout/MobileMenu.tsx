"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Full-height menu under the header. While open, the rest of the page is `inert`, so Tab can't reach
 * hidden content, and the menu closes on Escape, on navigation and when the window reaches desktop width.
 */
export default function MobileMenu({ links }: { links: { label: string; href: string }[] }) {
  const pathname = usePathname();
  // Open only for the path it was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const outside = [document.getElementById("main"), document.querySelector("footer")].filter(Boolean) as HTMLElement[];
    outside.forEach((el) => (el.inert = true));
    document.body.style.overflow = "hidden";

    const close = (returnFocus: boolean) => {
      setOpenOn(null);
      if (returnFocus) button.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close(true);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onDesktop = () => desktop.matches && close(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      outside.forEach((el) => (el.inert = false));
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpenOn(open ? null : pathname)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[8px] border border-border px-3 text-[15px] font-medium text-ink"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-64px)] overflow-y-auto border-t border-border bg-bg px-4 py-6 transition-[opacity,translate] duration-200 ease-out starting:-translate-y-2 starting:opacity-0"
      >
        <ul className="space-y-1">
          {[...links, { label: "Contact", href: "/contact" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="flex min-h-[52px] items-center rounded-[8px] px-3 text-[20px] font-medium text-ink hover:bg-surface-2 aria-[current=page]:text-accent-strong"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Download } from "lucide-react";

// The nav goes to the pages; "Download CV" opens the CV chooser (CvDialog).
const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/portfolio" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

function CvButton({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <button type="button" className={`btn btn-secondary ${className}`} data-cv-open data-btn data-cta aria-haspopup="dialog" onClick={onClick}>
      <span>Download CV</span>
      <Download aria-hidden="true" />
    </button>
  );
}

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on any navigation, including back/forward (adjusting state during render).
  const [menuPath, setMenuPath] = useState(pathname);
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setIsMobileOpen(false);
  }

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Modal behaviour: lock scroll, make the page behind inert, focus inside, Escape and Tab trap,
  // focus back to the Menu button on close, and close if the window grows past the mobile breakpoint.
  useEffect(() => {
    if (!isMobileOpen) return;
    const behind = [document.querySelector("main"), document.querySelector("footer")].filter(Boolean) as HTMLElement[];
    document.body.style.overflow = "hidden";
    behind.forEach((el) => (el.inert = true));
    closeButtonRef.current?.focus();
    const menuButton = menuButtonRef.current;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileOpen(false);
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 900px)");
    const onResize = () => desktop.matches && setIsMobileOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      menuButton?.focus();
    };
  }, [isMobileOpen]);

  return (
    <header id="top" className="sticky top-0 z-[70] border-b border-border-subtle bg-paper">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 md:px-10">
        <Link href="/" className="font-display flex min-h-[44px] items-center text-[20px] text-text-primary">
          Brian Ramoroka
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 min-[900px]:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[44px] items-center px-3 text-[15px] ${
                  active ? "text-text-primary underline decoration-amber decoration-2 underline-offset-[6px]" : "text-text-body hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <CvButton className="ml-3 !min-h-[44px] !text-[15px]" />
        </nav>

        <button
          type="button"
          ref={menuButtonRef}
          onClick={() => setIsMobileOpen(true)}
          aria-controls="mobile-menu"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border-hover px-4 text-[15px] font-semibold text-text-primary min-[900px]:hidden"
          aria-label="Open menu"
          aria-expanded={isMobileOpen}
        >
          Menu
        </button>
      </div>

      {isMobileOpen && (
        <div
          id="mobile-menu"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[80] flex flex-col bg-paper px-5 py-4 motion-safe:animate-[fade-in_200ms_ease-out] min-[900px]:hidden"
        >
          <div className="flex h-12 items-center justify-between">
            <span className="font-display text-[20px] text-text-primary">Brian Ramoroka</span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-primary"
              aria-label="Close menu"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="font-display flex min-h-[48px] items-center border-b border-border-subtle text-[30px] text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pb-6">
            <CvButton className="w-full" onClick={() => setIsMobileOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}

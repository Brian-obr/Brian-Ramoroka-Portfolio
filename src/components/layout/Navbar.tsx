"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu, Download } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => {
    setIsMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  // Dialog behaviour while the overlay is open: Esc closes, Tab is trapped inside
  useEffect(() => {
    if (!isMobileOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMobileMenu();
        return;
      }
      if (e.key !== "Tab" || !overlayRef.current) return;

      const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileOpen, closeMobileMenu]);

  return (
    <>
      {/* Desktop bottom pill nav */}
      <nav
        aria-label="Main navigation"
        className="fixed bottom-[100px] left-1/2 -translate-x-1/2 z-50 hidden lg:block"
      >
        <div className="flex items-center gap-1 px-2 py-2 rounded-full
          bg-bg-nav backdrop-blur-[20px] border border-border-subtle shadow-lg flex-nowrap">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "bg-accent-dim text-accent"
                    : "text-text-muted hover:text-text-body"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="w-px h-5 bg-border-subtle mx-1" />
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              bg-accent text-black hover:bg-accent-hover transition-colors whitespace-nowrap"
            aria-label="Download CV"
          >
            <Download size={14} />
            Download CV
          </a>
        </div>
      </nav>

      {/* Mobile: small pill with hamburger + CV */}
      <nav
        aria-label="Main navigation mobile"
        className="fixed top-4 right-4 z-50 lg:hidden"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-full
          bg-bg-nav backdrop-blur-[20px] border border-border-subtle shadow-lg">
          <a
            href="#"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold
              bg-accent text-black hover:bg-accent-hover transition-colors"
          >
            <Download size={13} />
            CV
          </a>
          <button
            ref={menuButtonRef}
            onClick={() => setIsMobileOpen(true)}
            className="px-3 py-1.5 rounded-full text-text-body hover:text-text-primary transition-colors"
            aria-label="Open menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            ref={overlayRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(10, 10, 12, 0.95)", backdropFilter: "blur(12px)" }}
          >
            <button
              ref={closeButtonRef}
              onClick={closeMobileMenu}
              className="absolute top-6 right-6 p-2 text-text-secondary hover:text-text-primary"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`text-2xl font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-accent"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full text-base font-semibold
                  bg-accent text-black hover:bg-accent-hover transition-colors"
              >
                <Download size={16} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

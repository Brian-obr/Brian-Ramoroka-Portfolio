"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import { navLinks } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  // The menu is open only for the path it was opened on, so navigating closes it without an effect.
  const [openOnPath, setOpenOnPath] = useState<string | null>(null);
  const isMobileOpen = openOnPath === pathname;
  const setIsMobileOpen = (open: boolean) => setOpenOnPath(open ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);



  return (
    <header>
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
          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
              bg-accent text-black hover:bg-accent-hover transition-colors whitespace-nowrap"
          >
            Get a quote
          </Link>
        </div>
      </nav>

      {/* Mobile: small pill with hamburger + quote CTA */}
      <nav
        aria-label="Main navigation mobile"
        className="fixed top-4 right-4 z-50 lg:hidden"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-full
          bg-bg-nav backdrop-blur-[20px] border border-border-subtle shadow-lg">
          <Link
            href="/contact"
            className="flex items-center min-h-[44px] px-4 rounded-full text-sm font-semibold
              bg-accent text-black hover:bg-accent-hover transition-colors"
          >
            Get a quote
          </Link>
          <button
            onClick={() => setIsMobileOpen(true)}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-text-body hover:text-text-primary transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: "rgba(10, 10, 12, 0.95)", backdropFilter: "blur(12px)" }}
          >
            <button
              onClick={() => setIsMobileOpen(false)}
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
              <Link
                href="/contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 flex items-center gap-2 px-8 py-3 rounded-full text-base font-semibold
                  bg-accent text-black hover:bg-accent-hover transition-colors"
              >
                Get a quote
              </Link>
            </div>
          </div>
        )}
    </header>
  );
}

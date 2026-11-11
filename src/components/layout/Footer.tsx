import Link from "next/link";
import { ArrowUp, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import { CookieSettingsButton } from "@/components/consent/Consent";
import { CONTACT, MAILTO, PRIMARY_CTA } from "@/lib/site";

// Footer, adapted from the Design canvas: brand blurb + action, then Navigate / Contact / Elsewhere
// columns, and a bottom bar with legal links and "Back to top".
const linkCls = "inline-flex min-h-[44px] min-w-[44px] items-center text-[16px] text-text-body hover:text-text-primary";

// Same pages as the main nav.
const navigate = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/portfolio" },
  { label: "Skills", href: "/skills" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="px-4 pb-6 pt-4 md:px-6">
      <div className="glass mx-auto max-w-[1240px] rounded-[20px] px-6 pt-10 md:px-12 md:pt-12">
        <div className="grid gap-10 pb-10 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="flex flex-col items-start">
            <Link href="/" className="font-display inline-flex min-h-[44px] items-center text-[22px] text-text-primary">
              Brian Ramoroka
            </Link>
            <p className="mb-6 mt-1 max-w-[340px] text-text-body">
              Front-end developer. HTML, CSS and JavaScript on WordPress, WooCommerce and Shopify, with page speed and search built in.
            </p>
            <ButtonGroup className="w-full sm:w-auto">
              <Button href={PRIMARY_CTA.href} icon={Mail}>
                {PRIMARY_CTA.label}
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <p className="eyebrow mb-2">Navigate</p>
            <nav aria-label="Footer" className="flex flex-col items-start">
              {navigate.map((l) => (
                <Link key={l.href} href={l.href} className={linkCls}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="eyebrow mb-2">Contact</p>
            <div className="flex flex-col items-start">
              <a href={MAILTO} className={`${linkCls} [overflow-wrap:anywhere]`}>
                {CONTACT.email}
              </a>
              <a href={CONTACT.phoneHref} className={linkCls}>
                {CONTACT.phoneDisplay}
              </a>
              <a href={CONTACT.whatsapp} className={linkCls} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <p className="flex min-h-[44px] items-center text-text-body">Cape Town and Midrand</p>
            </div>
          </div>
          <div>
            <p className="eyebrow mb-2">Elsewhere</p>
            <div className="flex flex-col items-start">
              <a href={CONTACT.linkedin} className={linkCls} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a href={CONTACT.github} className={linkCls} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-border-hover py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 text-[14px] text-text-muted">
            <p>&copy; {year} Brian Ramoroka</p>
            <Link href="/privacy" className="inline-flex min-h-[44px] items-center hover:text-text-primary">
              Privacy &amp; cookies
            </Link>
            <CookieSettingsButton className="inline-flex min-h-[44px] items-center hover:text-text-primary" />
          </div>
          <a href="#top" className="lift-arrow eyebrow inline-flex min-h-[44px] items-center gap-1.5 text-text-primary">
            Back to top
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

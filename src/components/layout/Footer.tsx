import Link from "next/link";
import Container from "@/components/ui/Container";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { site } from "@/lib/site";
import { navLinks } from "./nav";

const small = "inline-flex min-h-[44px] min-w-[44px] items-center text-[15px] text-muted hover:text-ink";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface-2">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="text-[17px] font-semibold text-ink">{site.name}</p>
          <p className="mt-2 max-w-[40ch] text-[15px] text-muted">Web developer in {site.locality}, South Africa. Working with clients and teams in South Africa and abroad.</p>
          <ul className="mt-4">
            <li><a className={small} href={`mailto:${site.email}`}>{site.email}</a></li>
            <li><a className={small} href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a></li>
            <li><a className={small} href={site.whatsapp}>WhatsApp</a></li>
          </ul>
        </div>
        <nav aria-label="Footer">
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">Pages</p>
          <ul className="mt-2">
            {[...navLinks, { label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href}><Link className={small} href={l.href}>{l.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="text-[13px] font-medium uppercase tracking-[0.08em] text-muted">Elsewhere</p>
          <ul className="mt-2">
            <li><a className={small} href={site.sameAs[0]}>LinkedIn</a></li>
            <li><a className={small} href={site.sameAs[1]}>GitHub</a></li>
          </ul>
          <nav aria-label="Legal" className="mt-4">
            <ul>
              <li><Link className={small} href="/privacy">Privacy policy</Link></li>
              <li><Link className={small} href="/cookies">Cookie policy</Link></li>
              <li><CookieSettingsButton className={small} /></li>
            </ul>
          </nav>
        </div>
      </Container>
      <Container className="border-t border-border py-6 text-[14px] text-muted">&copy; {new Date().getFullYear()} {site.name}</Container>
    </footer>
  );
}

import Link from "next/link";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";
import MobileMenu from "./MobileMenu";
import { navLinks } from "./nav";

export default function Header() {
  // Blur lives on a pseudo-element: backdrop-filter on the header itself would make it the containing block
  // for the fixed mobile menu and collapse the menu to the header height.
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-bg/90 before:absolute before:inset-0 before:-z-10 before:backdrop-blur-xl before:backdrop-saturate-150 supports-[backdrop-filter]:bg-bg/65">
      <Container className="flex h-16 items-center justify-between gap-3">
        <Link href="/" className="inline-flex min-h-[44px] items-center whitespace-nowrap text-[17px] font-semibold tracking-tight text-ink">
          Brian Ramoroka
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[8px] px-3 text-[15px] text-muted hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href="/contact" className="ml-3 min-h-[44px] px-4 text-[15px]">
            Get in touch
          </ButtonLink>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ButtonLink href="/contact" className="px-3 text-[15px]">
            Get in touch
          </ButtonLink>
          <MobileMenu links={navLinks} />
        </div>
      </Container>
    </header>
  );
}

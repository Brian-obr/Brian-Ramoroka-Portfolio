import Link from "next/link";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import { socialLinks } from "@/lib/constants";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";

const iconMap: Record<string, React.ElementType> = {
  Linkedin: LinkedinIcon,
  Github: GithubIcon,
};

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border-subtle">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="text-text-primary font-bold hover:text-accent transition-colors"
        >
          Brian Ramoroka
        </Link>

        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center text-text-muted hover:text-accent transition-colors"
                aria-label={link.label}
              >
                {Icon && <Icon size={24} />}
              </a>
            );
          })}
        </div>

        <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-4 text-sm text-text-muted">
          <Link href="/privacy" className="inline-flex min-h-[44px] items-center hover:text-accent">Privacy policy</Link>
          <Link href="/cookies" className="inline-flex min-h-[44px] items-center hover:text-accent">Cookie policy</Link>
          <CookieSettingsButton className="min-h-[44px] hover:text-accent" />
          <span>&copy; {new Date().getFullYear()} Brian Ramoroka</span>
        </nav>
      </div>
    </footer>
  );
}

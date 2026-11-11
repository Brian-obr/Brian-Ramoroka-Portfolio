import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type ButtonProps = {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** Icons that point onward (arrows, external) read better after the label. */
  iconAfter?: boolean;
  external?: boolean;
  download?: boolean;
  className?: string;
};

/**
 * Pill button: ink keyline, bright top edge, cast shadow; lifts 2px with a deeper shadow on hover
 * (styles in globals.css `.btn`). Every button carries an inline SVG icon (aria-hidden).
 */
export default function Button({ href, icon: Icon, children, variant = "primary", iconAfter, external, download, className = "" }: ButtonProps) {
  const cls = `btn btn-${variant} ${className}`.trim();
  const content = (
    <>
      {!iconAfter && <Icon aria-hidden="true" />}
      <span>{children}</span>
      {iconAfter && <Icon aria-hidden="true" />}
    </>
  );
  const internal = href.startsWith("/") && !download && !href.endsWith(".pdf");
  if (internal) {
    return (
      <Link href={href} className={cls} data-btn data-cta>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      data-btn
      data-cta
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}

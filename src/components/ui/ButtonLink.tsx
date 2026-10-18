import Link from "next/link";

type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap rounded-[8px] px-5 text-[16px] font-semibold active:translate-y-px";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  secondary: "border border-border-strong text-ink hover:border-ink hover:bg-surface-2",
};

export default function ButtonLink({
  href,
  variant = "primary",
  children,
  ...rest
}: { href: string; variant?: Variant; children: React.ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const className = `${base} ${variants[variant]} ${rest.className ?? ""}`;
  // Files and external URLs are plain anchors; internal pages use client navigation.
  if (/^(https?:|mailto:|tel:)/.test(href) || /\.pdf$/.test(href)) {
    return (
      <a href={href} {...rest} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest} className={className}>
      {children}
    </Link>
  );
}

import Image from "next/image";

interface BackgroundImageProps {
  /** Descriptive alt text for the profile image */
  imageAlt?: string;
  /** Use a lighter left-to-right gradient so more of the image is visible */
  lighter?: boolean;
}

/**
 * Fixed portrait behind the page content. Server-rendered and fetched at high priority because it is
 * the desktop LCP element (audit F-08). No scroll listener: the old per-frame blur re-rendered the
 * subtree on every scroll event and ignored reduced motion (F-17, F-25).
 */
export default function BackgroundImage({
  imageAlt = "Brian Ramoroka, web developer in Cape Town",
  lighter = false,
}: BackgroundImageProps) {
  const desktopLrGradient = lighter
    ? "linear-gradient(to right, #0a0a0c 0%, rgba(10,10,12,0.7) 20%, rgba(10,10,12,0.3) 40%, transparent 60%)"
    : "linear-gradient(to right, #0a0a0c 0%, rgba(10,10,12,0.75) 15%, rgba(10,10,12,0.4) 35%, rgba(10,10,12,0.1) 55%, transparent 75%)";

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 md:inset-auto md:top-0 md:right-0 md:h-full md:w-[55%]">
        <Image
          src="/images/brian-ramoroka-portrait.webp"
          alt={imageAlt}
          width={1200}
          height={1804}
          sizes="(min-width: 768px) 55vw, 100vw"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 15%" }}
        />
      </div>
      <div className="absolute inset-0 hidden md:block" style={{ background: desktopLrGradient }} />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.35) 0%, rgba(10,10,12,0.45) 30%, rgba(10,10,12,0.55) 60%, rgba(10,10,12,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,10,12,0.3) 0%, transparent 15%, transparent 60%, rgba(10,10,12,0.85) 95%)",
        }}
      />
    </div>
  );
}

import Link from "next/link";
import OpenToWorkBadge from "@/components/ui/OpenToWorkBadge";
import ContactInfoRow from "@/components/ui/ContactInfoRow";

const stats = [
  { value: "150+", label: "Client Websites" },
  { value: "Full-Stack", label: "Development" },
  { value: "8+", label: "International Markets" },
];

/* CSS-only stagger (see .fade-up in globals.css): the hero paints without
   waiting for JS hydration, keeping LCP off the JavaScript critical path. */
const delay = (s: number) => ({ animationDelay: `${s}s` });

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 w-full py-24 lg:py-32">
        {/*
          Pin all text to the left column.
          On desktop the profile image occupies the right ~45% via BackgroundImage (position:fixed).
          Constraining content to max-w-[540px] on mobile and ~50% on desktop ensures
          nothing ever overlaps the image at any breakpoint.
        */}
        <div className="max-w-[540px] lg:max-w-[50%]">
          <div className="fade-up mb-6" style={delay(0)}>
            <OpenToWorkBadge />
          </div>

          <p className="fade-up text-accent font-mono tracking-wide uppercase text-sm mb-3" style={delay(0.1)}>
            SEO Web Developer
          </p>

          <h1
            className="fade-up text-[2.5rem] md:text-[4.5rem] font-display leading-[1.1] text-text-primary mb-6"
            style={delay(0.2)}
          >
            Brian Ramoroka
          </h1>

          <p className="fade-up text-text-body text-base md:text-lg mb-8 leading-relaxed" style={delay(0.25)}>
            SEO web developer and software engineer based in Cape Town. I have built and maintained over 150 client
            websites across 8+ international markets. I am also open to joining development teams — check out my{" "}
            <Link href="/skills" className="deep-link">skills</Link> and{" "}
            <Link href="/services" className="deep-link">services</Link>.
          </p>

          <div className="fade-up mb-12" style={delay(0.3)}>
            <ContactInfoRow layout="horizontal" />
          </div>

          <div className="fade-up flex flex-wrap gap-8 md:gap-12" style={delay(0.4)}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-text-muted text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

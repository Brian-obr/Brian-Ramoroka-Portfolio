import Link from "next/link";
import OpenToWorkBadge from "@/components/ui/OpenToWorkBadge";
import ContactInfoRow from "@/components/ui/ContactInfoRow";

const stats = [
  { value: "150+", label: "Client Websites" },
  { value: "Full-Stack", label: "Development" },
  { value: "8+", label: "International Markets" },
];

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
          <div className="mb-6">
            <OpenToWorkBadge />
          </div>

          <p className="text-accent font-mono tracking-wide uppercase text-sm mb-3">
            SEO Web Developer
          </p>

          <h1 className="text-[2.5rem] md:text-[4.5rem] font-display leading-[1.1] text-text-primary mb-6"
          >
            Brian Ramoroka
          </h1>

          <p className="text-text-body text-base md:text-lg mb-8 leading-relaxed">
            SEO web developer and software engineer based in Cape Town. I have built and maintained over 150 client
            websites across 8+ international markets. I am also open to joining development teams — check out my{" "}
            <Link href="/skills" className="deep-link">skills</Link> and{" "}
            <Link href="/services" className="deep-link">services</Link>.
          </p>

          <div className="mb-12">
            <ContactInfoRow layout="horizontal" />
          </div>

          <div className="flex flex-wrap gap-8 md:gap-12">
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

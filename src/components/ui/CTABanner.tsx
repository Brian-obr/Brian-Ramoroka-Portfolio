import Link from "next/link";

export default function CTABanner({
  heading,
  buttonText,
  href,
}: {
  heading: string;
  buttonText: string;
  href: string;
}) {
  return (
    <section className="bg-bg-elevated py-16">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
          {heading}
        </h2>
        <Link
          href={href}
          className="inline-block bg-accent text-bg-deep font-semibold px-8 py-3 rounded-lg hover:bg-accent-hover transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </section>
  );
}

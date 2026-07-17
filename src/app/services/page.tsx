import type { Metadata } from "next";
import Link from "next/link";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";

export const metadata: Metadata = {
  title: "Services | Brian Ramoroka | Web Development, SEO & Software Engineering",
  description:
    "Web development, SEO campaigns, app development, CMS solutions, software engineering, and maintenance. Here is what I can do for you.",
  openGraph: {
    title: "Services | Brian Ramoroka | Web Development, SEO & Software Engineering",
    description:
      "Web development, SEO campaigns, app development, CMS solutions, software engineering, and maintenance. Here is what I can do for you.",
    url: "https://www.brianramoroka.co.za/services",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Brian Ramoroka | Web Development, SEO & Software Engineering",
    description:
      "Web development, SEO campaigns, app development, CMS solutions, software engineering, and maintenance. Here is what I can do for you.",
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/services" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://www.brianramoroka.co.za/services" },
  ],
};

const serviceSchemas = [
  {
    "@type": "Service",
    name: "Web Development",
    description: "Custom website design and development, responsive mobile-first builds, frontend and backend development, API integrations, and performance tuning.",
    provider: { "@id": "https://www.brianramoroka.co.za/#person" },
    areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
  },
  {
    "@type": "Service",
    name: "SEO Services",
    description: "Technical SEO audits, on-page optimisation, keyword research and tracking, link building, and campaign management across international markets.",
    provider: { "@id": "https://www.brianramoroka.co.za/#person" },
    areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
  },
  {
    "@type": "Service",
    name: "App Development",
    description: "Web and mobile application development using React, Next.js, Node.js, Java/Spring Boot, PostgreSQL, and modern cloud platforms.",
    provider: { "@id": "https://www.brianramoroka.co.za/#person" },
    areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
  },
  {
    "@type": "Service",
    name: "Software Engineering",
    description: "Full-stack development, database design and optimisation, CI/CD pipelines, Git version control, Agile/Scrum, and Azure cloud infrastructure.",
    provider: { "@id": "https://www.brianramoroka.co.za/#person" },
    areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
  },
  {
    "@type": "Service",
    name: "Maintenance & Support",
    description: "Website maintenance, security patches, performance monitoring, content updates, CMS management, uptime monitoring, and backup management.",
    provider: { "@id": "https://www.brianramoroka.co.za/#person" },
    areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [breadcrumbJsonLd, ...serviceSchemas],
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BackgroundImage imageSrc="/images/brian-ramoroka-software-engineer-cape-town.webp" lighter />
      <PageTransition>
        {/* Hero */}
        <section className="relative z-10 pt-28 md:pt-[140px] pb-12">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <h1 className="text-[2.5rem] md:text-[4rem] font-display leading-[1.1] text-text-primary mb-4">
              Services
            </h1>
            <p className="text-text-body text-lg max-w-2xl leading-relaxed">
              This is what I do. If you need a website built, your SEO fixed, an app developed, or just someone
              reliable to keep things running, I have got you. Have a look at what I have done on my{" "}
              <Link href="/experience" className="deep-link">experience page</Link> or just{" "}
              <Link href="/contact" className="deep-link">get in touch</Link> and we can figure it out.
            </p>
          </div>
        </section>

        {/* 01 - Web Development */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <span className="text-accent font-mono text-sm mb-4 block">01</span>
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Websites that do the work.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-5">
                <p className="text-text-body leading-relaxed">
                  I build websites from the ground up — designed to perform, rank, and convert. Whether it is a
                  business site, a landing page, or a full web platform, I handle everything from frontend to backend.
                </p>
                <ul className="space-y-2">
                  {[
                    "Custom website design and development",
                    "Responsive, mobile-first builds",
                    "Frontend with React, Next.js, SvelteKit, Tailwind CSS",
                    "Backend with Node.js, Java, Spring Boot",
                    "API integrations",
                    "Performance tuning",
                  ].map((item) => (
                    <li key={item} className="text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5">
                <div className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6">
                  <h3 className="text-text-primary font-semibold mb-3">CMS Platforms</h3>
                  <p className="text-text-body text-sm leading-relaxed">
                    WordPress &middot; Shopify &middot; Wix &middot; Magento &middot; Webflow &middot; Custom CMS builds &middot; and others
                  </p>
                </div>
                <p className="text-text-body leading-relaxed">
                  Need a website that actually works for your business?{" "}
                  <Link href="/contact" className="deep-link">Let us talk</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 02 - SEO Services */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <span className="text-accent font-mono text-sm mb-4 block">02</span>
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Getting your site in front of the right people.
            </h2>
            <div className="space-y-5 max-w-3xl">
              <p className="text-text-body leading-relaxed">
                I run SEO campaigns that actually move the needle. From technical audits to full campaign management,
                I focus on getting your website ranking where it matters — and keeping it there.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-10">
              {[
                { title: "Technical SEO Audits", desc: "Comprehensive scans covering crawlability, indexation, site speed, Core Web Vitals, mobile usability, structured data, and internal linking." },
                { title: "On-Page Optimisation", desc: "Strategic keyword integration, meta tags, heading structure, content hierarchy, image optimisation, and schema markup aligned with search intent." },
                { title: "Keyword Research & Tracking", desc: "In-depth research using Ahrefs and Google Search Console. Continuous tracking and reporting to measure progress and adapt strategy." },
                { title: "Link Building", desc: "Strategies that strengthen domain authority and competitive positioning. Quality over quantity — relevant, high-authority backlinks." },
                { title: "Campaign Management", desc: "Local, provincial, national, and international SEO campaigns. From single-city businesses to multi-country brands — strategy tailored to scope." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6 group relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <h3 className="text-text-primary font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-text-body text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl backdrop-blur-[8px] bg-[rgba(10,10,12,0.4)] border border-border-subtle p-6">
              <p className="text-text-primary font-semibold text-lg mb-2">The numbers</p>
              <p className="text-accent font-mono text-2xl mb-2">150+ client websites. 8+ markets. 90%+ good KPI ratings.</p>
              <p className="text-text-body text-sm mb-2">
                Markets: South Africa, Netherlands, Belgium, Germany, France, Spain, United Kingdom, and the USA.
              </p>
              <p className="text-text-body text-sm">
                See the full breakdown on my{" "}
                <Link href="/experience" className="deep-link">experience page</Link>, or{" "}
                <Link href="/contact" className="deep-link">get in touch</Link> to discuss your project.
              </p>
            </div>
          </div>
        </section>

        {/* 03 - App Development */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <span className="text-accent font-mono text-sm mb-4 block">03</span>
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Got an idea? Let&apos;s build it.
            </h2>
            <div className="max-w-2xl space-y-6">
              <p className="text-text-body leading-relaxed">
                I develop web applications. Client-facing tools, internal business systems, data dashboards.
                I handle the full cycle from planning to deployment.
              </p>
              <div>
                <p className="text-text-primary font-semibold mb-3">What I use:</p>
                <ul className="space-y-2">
                  {[
                    "React and Next.js for the frontend",
                    "Node.js and Java / Spring Boot on the backend",
                    "PostgreSQL, MySQL, Supabase for databases",
                    "RESTful API design and integration",
                    "Deployed on Azure and Vercel",
                  ].map((item) => (
                    <li key={item} className="text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-text-body leading-relaxed">
                If you&apos;ve got something in mind,{" "}
                <Link href="/contact" className="deep-link">let&apos;s chat &rarr;</Link>
              </p>
            </div>
          </div>
        </section>

        {/* 04 - Software Engineering */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <span className="text-accent font-mono text-sm mb-4 block">04</span>
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Code that holds up.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-5">
                <p className="text-text-body leading-relaxed">
                  Beyond building websites and apps, I bring engineering thinking to everything I do. Clean architecture,
                  maintainable code, and systems that scale — that is the foundation I work from.
                </p>
                <ul className="space-y-2">
                  {[
                    "Full-stack development (Java, JavaScript/TypeScript, Python)",
                    "Database design, management, and optimisation",
                    "CI/CD pipelines",
                    "Git version control",
                    "Agile / Scrum methodology",
                    "Azure cloud infrastructure",
                  ].map((item) => (
                    <li key={item} className="text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-body leading-relaxed">
                  See the full list of technologies I work with on my{" "}
                  <Link href="/skills" className="deep-link">skills page</Link>.
                </p>
              </div>
              <div className="space-y-5">
                <p className="text-text-body leading-relaxed">
                  I am also open to joining development teams — whether that is a full-time role, contract work, or
                  project-based collaboration. If you are looking for a developer who understands both the code and the
                  bigger picture,{" "}
                  <Link href="/contact" className="deep-link">let us connect</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 05 - Maintenance & Support */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20">
            <span className="text-accent font-mono text-sm mb-4 block">05</span>
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Keeping things running.
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              <div className="space-y-5">
                <p className="text-text-body leading-relaxed">
                  A website or application is never really done. I offer ongoing maintenance and support to keep
                  everything running smoothly — from routine updates to emergency fixes.
                </p>
                <h3 className="text-text-primary font-semibold mt-6">Website Maintenance</h3>
                <ul className="space-y-2">
                  {[
                    "Updates and security patches",
                    "Performance monitoring",
                    "Content updates and CMS management",
                    "Uptime monitoring",
                    "Backup management",
                  ].map((item) => (
                    <li key={item} className="text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-5">
                <h3 className="text-text-primary font-semibold">Computer &amp; Software Maintenance</h3>
                <ul className="space-y-2">
                  {[
                    "Software installation, configuration, and troubleshooting",
                    "OS maintenance",
                    "Development environment setup",
                  ].map((item) => (
                    <li key={item} className="text-text-body flex gap-2">
                      <span className="text-accent flex-shrink-0">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-text-body leading-relaxed mt-4">
                  Need ongoing support?{" "}
                  <Link href="/contact" className="deep-link">Get in touch</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative z-10 py-20 md:py-32">
          <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-20 text-center flex flex-col items-center">
            <h2 className="text-[2rem] md:text-[3rem] font-display leading-[1.15] text-text-primary mb-8">
              Ready?
            </h2>
            <p className="text-text-body text-lg max-w-xl leading-relaxed mb-8">
              Every project is different. Let us figure out the right approach for yours. Check out my{" "}
              <Link href="/experience" className="deep-link">experience</Link>, see my{" "}
              <Link href="/skills" className="deep-link">skills</Link>, or just{" "}
              <Link href="/contact" className="deep-link">get in touch</Link> and we can go from there.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-accent text-black font-semibold text-sm hover:bg-accent-hover transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </section>
      </PageTransition>
    </>
  );
}

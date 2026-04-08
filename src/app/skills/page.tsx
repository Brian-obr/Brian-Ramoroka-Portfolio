import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
  description:
    "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
  openGraph: {
    title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
    description:
      "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
    url: "https://www.brianramoroka.co.za/skills",
    type: "website",
    locale: "en_ZA",
    images: [{ url: "/images/brian-ramoroka-seo-web-developer.webp", width: 1200, height: 630, alt: "Brian Ramoroka — SEO Web Developer & Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills & Tools | Brian Ramoroka | Full-Stack Development, SEO & More",
    description:
      "The tech, tools, and platforms I work with. Full-stack development, SEO tools, CMS platforms, databases, cloud infrastructure.",
  },
  alternates: {
    canonical: "https://www.brianramoroka.co.za/skills",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "Skills & Tools", item: "https://www.brianramoroka.co.za/skills" },
  ],
};

export default function SkillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SkillsPageClient />
    </>
  );
}

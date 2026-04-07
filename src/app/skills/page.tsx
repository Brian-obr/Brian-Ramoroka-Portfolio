import type { Metadata } from "next";
import SkillsPageClient from "./SkillsPageClient";

export const metadata: Metadata = {
  title: "Skills & Tools",
  description:
    "Explore Brian Ramoroka's technical skills in web development, SEO, DevOps, and AI — from React and Next.js to Python and automation.",
  openGraph: {
    title: "Skills & Tools — Brian Ramoroka",
    description:
      "Explore Brian Ramoroka's technical skills in web development, SEO, DevOps, and AI.",
  },
  alternates: {
    canonical: "https://brianramoroka.com/skills",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brianramoroka.com" },
    { "@type": "ListItem", position: 2, name: "Skills & Tools", item: "https://brianramoroka.com/skills" },
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

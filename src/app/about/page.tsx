import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Brian Ramoroka — SEO web developer and software engineer based in Cape Town, specialising in high-performance websites and international SEO campaigns.",
  openGraph: {
    title: "About — Brian Ramoroka",
    description:
      "SEO web developer and software engineer based in Cape Town. Building high-performance, search-optimised websites across 8+ international markets.",
  },
  alternates: { canonical: "https://brianramoroka.com/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://brianramoroka.com" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://brianramoroka.com/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <PageTransition>
        <AboutPageClient />
      </PageTransition>
    </>
  );
}

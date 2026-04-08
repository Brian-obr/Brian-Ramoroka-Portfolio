import type { Metadata } from "next";
import PageTransition from "@/components/layout/PageTransition";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
  description:
    "Brian Ramoroka. Cape Town-based SEO web developer and software engineer. 150+ client websites across 8 international markets. 90%+ KPI track record.",
  openGraph: {
    title: "About Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka. Cape Town-based SEO web developer and software engineer. 150+ client websites across 8 international markets. 90%+ KPI track record.",
    url: "https://www.brianramoroka.co.za/about",
    type: "website",
    locale: "en_ZA",
    images: [{ url: "/images/brian-ramoroka-seo-web-developer.webp", width: 1200, height: 630, alt: "Brian Ramoroka — SEO Web Developer & Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka. Cape Town-based SEO web developer and software engineer. 150+ client websites across 8 international markets. 90%+ KPI track record.",
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/about" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.brianramoroka.co.za" },
    { "@type": "ListItem", position: 2, name: "About", item: "https://www.brianramoroka.co.za/about" },
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

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import { ogImage } from "@/lib/metadata";
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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka. Cape Town-based SEO web developer and software engineer. 150+ client websites across 8 international markets. 90%+ KPI track record.",
    images: [ogImage.url],
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/about" },
};


export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageGraph({ path: "/about", name: "About Brian Ramoroka", description: metadata.description as string, type: "AboutPage", breadcrumb: [{ name: "About", path: "/about" }] })} />
      <>
        <AboutPageClient />
      </>
    </>
  );
}

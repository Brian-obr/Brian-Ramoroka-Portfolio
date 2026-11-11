import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { profilePageGraph } from "@/lib/schema";
import { LAST_MODIFIED } from "@/lib/site";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = pageMetadata({
  title: "About Brian Ramoroka | SEO Web Developer, Cape Town",
  description:
    "Brian Ramoroka is an SEO Web Developer at Rhiza Babuyile in Cape Town. How I check a page for crawling, indexing, speed and structured data.",
  path: "/about",
  ogTitle: "About Brian Ramoroka",
  ogDescription: "SEO Web Developer in Cape Town. How I check a page before it goes live, and how I got here.",
});


export default function AboutPage() {
  return (
    <>
      <JsonLd data={profilePageGraph({ path: "/about", name: "About", dateModified: LAST_MODIFIED["/about"] })} />
      <AboutPageClient />
    </>
  );
}

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { pageGraph } from "@/lib/schema";
import { ogImage } from "@/lib/metadata";
import Hero from "@/components/sections/Hero";
import AboutSummary from "@/components/sections/AboutSummary";
import ServicesPreview from "@/components/sections/ServicesPreview";
import SkillsPreview from "@/components/sections/SkillsPreview";
import MarketsSection from "@/components/sections/MarketsSection";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import EducationSection from "@/components/sections/EducationSection";
import ContactCTA from "@/components/sections/ContactCTA";
import BackgroundImage from "@/components/BackgroundImage";

export const metadata: Metadata = {
  title: "Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
  description:
    "Brian Ramoroka is an SEO web developer and software engineer in Cape Town, South Africa. I build websites that rank and drive real growth across international markets.",
  openGraph: {
    title: "Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka is an SEO web developer and software engineer in Cape Town, South Africa. I build websites that rank and drive real growth across international markets.",
    url: "https://www.brianramoroka.co.za/",
    type: "website",
    locale: "en_ZA",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka is an SEO web developer and software engineer in Cape Town, South Africa. I build websites that rank and drive real growth across international markets.",
    images: [ogImage.url],
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/" },
};

export default function HomePage() {

  return (
    <>
      <JsonLd data={pageGraph({ path: "/", name: "Brian Ramoroka, web developer", description: metadata.description as string })} />
      <BackgroundImage />
      <>
        <Hero />
        <AboutSummary />
        <ServicesPreview />
        <SkillsPreview />
        <MarketsSection />
        <ExperiencePreview />
        <EducationSection />
        <ContactCTA />
      </>
    </>
  );
}

import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import AboutSummary from "@/components/sections/AboutSummary";
import ServicesPreview from "@/components/sections/ServicesPreview";
import SkillsPreview from "@/components/sections/SkillsPreview";
import MarketsSection from "@/components/sections/MarketsSection";
import ExperiencePreview from "@/components/sections/ExperiencePreview";
import EducationSection from "@/components/sections/EducationSection";
import ContactCTA from "@/components/sections/ContactCTA";
import PageTransition from "@/components/layout/PageTransition";
import BackgroundImage from "@/components/BackgroundImage";

export const metadata: Metadata = {
  alternates: { canonical: "https://brianramoroka.co.za" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        name: "Brian Ramoroka",
        jobTitle: "SEO Web Developer & Software Engineer",
        url: "https://brianramoroka.co.za",
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
      },
      { "@type": "WebSite", name: "Brian Ramoroka", url: "https://brianramoroka.co.za" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BackgroundImage imageSrc="/images/Brian Ramoroka/Standing.png" />
      <PageTransition>
        <Hero />
        <AboutSummary />
        <ServicesPreview />
        <SkillsPreview />
        <MarketsSection />
        <ExperiencePreview />
        <EducationSection />
        <ContactCTA />
      </PageTransition>
    </>
  );
}

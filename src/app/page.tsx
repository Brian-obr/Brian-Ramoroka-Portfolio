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
  },
  twitter: {
    card: "summary_large_image",
    title: "Brian Ramoroka | SEO Web Developer & Software Engineer | Cape Town",
    description:
      "Brian Ramoroka is an SEO web developer and software engineer in Cape Town, South Africa. I build websites that rank and drive real growth across international markets.",
  },
  alternates: { canonical: "https://www.brianramoroka.co.za/" },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://www.brianramoroka.co.za/#person",
        name: "Brian Ramoroka",
        jobTitle: "SEO Web Developer & Software Engineer",
        url: "https://www.brianramoroka.co.za",
        image: "https://www.brianramoroka.co.za/images/brian-ramoroka-seo-web-developer.webp",
        email: "ramorokaob@gmail.com",
        telephone: "+27813798635",
        address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressCountry: "ZA" },
        sameAs: [
          "https://za.linkedin.com/in/brian-obr",
          "https://github.com/Brian-obr",
        ],
        knowsAbout: [
          "SEO", "Web Development", "Software Engineering", "JavaScript", "React",
          "Next.js", "Java", "Spring Boot", "WordPress", "Shopify",
        ],
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "Cape Peninsula University of Technology",
        },
        worksFor: {
          "@type": "Organization",
          name: "Rhiza Babuyile",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.brianramoroka.co.za/#website",
        name: "Brian Ramoroka",
        url: "https://www.brianramoroka.co.za",
        publisher: { "@id": "https://www.brianramoroka.co.za/#person" },
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://www.brianramoroka.co.za/#service",
        name: "Brian Ramoroka — Web Development & SEO",
        url: "https://www.brianramoroka.co.za",
        founder: { "@id": "https://www.brianramoroka.co.za/#person" },
        areaServed: ["ZA", "NL", "BE", "DE", "FR", "ES", "GB", "US"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cape Town",
          addressCountry: "ZA",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BackgroundImage imageSrc="/images/brian-ramoroka-seo-web-developer.webp" />
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

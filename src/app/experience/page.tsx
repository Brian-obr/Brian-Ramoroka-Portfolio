import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import JsonLd from "@/components/JsonLd";
import { personLd } from "@/lib/schema";
import Link from "next/link";
import { Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import ButtonGroup from "@/components/ui/ButtonGroup";
import CvButton from "@/components/cv/CvButton";
import ExperienceEntry from "@/components/ui/ExperienceEntry";
import { h1Cls, h2Cls, innerCls } from "@/lib/page-classes";
import type { Experience } from "@/types";

export const metadata: Metadata = pageMetadata({
  title: "Experience | Brian Ramoroka, SEO Web Developer",
  description:
    "Brian Ramoroka's experience: SEO Web Developer at Rhiza Babuyile since 03/2025, and Software Developer Intern at BIIC working in Java and Spring Boot.",
  path: "/experience",
  ogTitle: "Experience: Brian Ramoroka, SEO Web Developer",
  ogDescription: "WordPress, Shopify and technical SEO work on client websites at Rhiza Babuyile, after a Java and Spring Boot internship at BIIC.",
});

// Links to the blog wait until it is published.
const experiences: Experience[] = [
  {
    title: "SEO Web Developer",
    company: "Rhiza Babuyile",
    where: "Cape Town, Western Cape | Full-time, on-site",
    dates: "03/2025 - Present",
    intro:
      "Rhiza Babuyile is a South African company that partners with Grizzly New Marketing in the Netherlands. I work with their team on client websites for businesses mainly in the Netherlands and Belgium, and also in Germany, France, Spain, the UK and the US. Most of my time goes into WordPress.",
    groups: [
      {
        heading: "Website development",
        bullets: [
          "Develop and maintain SEO-optimised client websites, mostly in WordPress (Elementor, Divi, Bricks Builder, Gutenberg, WPBakery and other builders) and WooCommerce",
          "Fix and improve front-ends in HTML, CSS and JavaScript",
          "Build campaign template pages: location and service landing pages for lead generation",
          "Make sites responsive, mobile-friendly and quick to load, including with WP Rocket on WordPress",
          "Check pages against the WCAG accessibility guidelines, including alt text and colour contrast",
          "Publish content on client sites and handle ongoing maintenance, development and performance work",
        ],
      },
      {
        heading: "SEO campaigns",
        bullets: [
          "Build and deploy SEO campaigns at local, provincial, national and international level",
          "Make on-page changes: meta titles and descriptions, image alt text, internal links and CTAs",
          "Do link building",
          "Carry out campaign activation tasks and text updates with the SEO and technical leads",
        ],
      },
      {
        heading: "Technical SEO",
        bullets: [
          "Run technical SEO audits covering crawlability, indexing, site speed and Core Web Vitals, then fix the issues found",
          "Add JSON-LD structured data (schema markup)",
          "Use Screaming Frog, Ahrefs, Semrush and AWR (Advanced Web Ranking) for audits and tracking, and Rank Math and Yoast SEO on WordPress",
        ],
      },
      {
        heading: "Search Console, analytics and tracking",
        bullets: [
          "Check pages are indexed in Google Search Console, request indexing, set up Search Console and submit XML sitemaps",
          "Set up GA4, link it to Search Console and monitor traffic",
          "Create Google Tag Manager containers and use GTM to add structured data and CSS",
          "Install Microsoft Clarity, link it to GA4, and use heatmaps and session recordings to find UX problems",
        ],
      },
      {
        heading: "Other platforms and tasks",
        bullets: [
          "Customise Shopify themes in Liquid, CSS and JavaScript, update products, pages and meta data, and add schema and tracking to Shopify stores through GTM",
          "Work on Magento 2, PrestaShop, OpenCart, Lightspeed eCom, Odoo, Webflow, Wix, Joomla, Drupal, Weebly, JouwWeb and custom CMSs when a client site runs on them",
          "Fix forms in Contact Form 7 and Gravity Forms from time to time, and set up Google reCAPTCHA",
          "Advise technical owners and content writers on website and content improvements",
          "Receive and track tasks in Salesforce Lightning",
          "Use AI tools for research, drafting, and writing, reviewing and debugging code, and check what they produce",
        ],
      },
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Business Innovation & Incubation Centre (BIIC)",
    where: "Cape Town, Western Cape | Internship, hybrid",
    dates: "07/2024 - 12/2024",
    intro: "A six-month internship on Java and Spring Boot applications backed by PostgreSQL, in an Agile team.",
    groups: [
      {
        bullets: [
          "Worked across the full development lifecycle of Java and Spring Boot applications",
          "Built features, fixed bugs and improved existing functionality",
          "Worked with REST APIs and used OAuth to secure applications",
          "Used Azure cloud services, Git for version control, and Zapier",
          "Helped with database management and back-end development",
          "Built a grounding in database design, back-end architecture and software engineering principles",
        ],
      },
    ],
  },
];

export default function ExperiencePage() {
  return (
    <>
      <JsonLd data={personLd} />
      <section>
        <div className={innerCls}>
          <h1 className={h1Cls}>Experience</h1>
          <p className="mt-[24px] mb-[48px] text-[18px] text-text-body">
            Two roles so far, both in Cape Town. The first was Java back-end work. The current one is front-end,
            WordPress and technical SEO work on client websites.
          </p>

          <div className="space-y-[32px]">
            {experiences.map((experience) => (
              <ExperienceEntry key={experience.company} experience={experience} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className={innerCls}>
          <h2 className={h2Cls}>Projects</h2>
          <p className="text-text-body">
            I also build my own projects, including a WooCommerce sneaker store and this website.
          </p>
          <p className="mt-[16px] flex flex-wrap gap-x-[24px] gap-y-[8px]">
            <Link href="/portfolio" className="deep-link">See my projects</Link>
            <Link href="/skills" className="deep-link">See all skills</Link>
          </p>
          <ButtonGroup className="mt-[32px]">
            <CvButton />
            <Button href="/contact" icon={Mail} variant="secondary">
              Contact me
            </Button>
          </ButtonGroup>
        </div>
      </section>
    </>
  );
}

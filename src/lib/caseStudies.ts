import { CONTACT } from "@/lib/site";

/** Case studies. Only work with checkable facts goes here (no unconfirmed client names). */
export type CaseStudy = {
  slug: string;
  kicker?: string;
  title: string;
  summary: string;
  /**
   * Long-page captures (desktop ~0.72:1, phone ~0.21:1) for the side-by-side layout, plus `stacked`:
   * a top crop shaped like the stacked frame (desktop 4:3, phone ~0.36:1), so no bytes are wasted.
   */
  images: { src: string; width: number; height: number; alt: string; stacked?: { src: string; width: number; height: number } }[];
  /** "What it does now" list, and what comes next. */
  features?: string[];
  next?: string;
  /** Short label/value rows for the case-study card (canvas pattern). */
  facts: { label: string; value: string }[];
  link?: { href: string; label: string };
};

// Links to the blog wait until it is published.
const breezyExchange: CaseStudy = {
  slug: "the-breezy-exchange",
  kicker: "In progress",
  title: "The Breezy Exchange",
  summary: "A WooCommerce sneaker store I'm building to show how I'd set up a South African resale shop. It's a demo, so it never takes real orders.",
  images: [
    {
      src: "/images/work/breezy-exchange-desktop.webp",
      stacked: { src: "/images/work/breezy-exchange-desktop-wide.webp", width: 1500, height: 1130 },
      width: 1500,
      height: 2075,
      alt: "The Breezy Exchange home page with the brand menu, sneaker search and the size and condition picker",
    },
    {
      src: "/images/work/breezy-exchange-mobile.webp",
      stacked: { src: "/images/work/breezy-exchange-mobile-wide.webp", width: 780, height: 2170 },
      width: 780,
      height: 3720,
      alt: "The Breezy Exchange home page on a phone",
    },
  ],
  features: [
    "You pick a UK size and a condition grade, and the store takes you straight to the matching pairs",
    "Every model comes in three condition grades, from Brand New to Used Good, each with its own price in rand, VAT included",
    "Brand and model line sit in every collection URL, such as /collections/jordan/air-jordan-4/",
    "A grading guide and a UK size guide help shoppers choose",
  ],
  next: "What I'm adding next is product structured data for each condition and real product photos. I'm also adding crawl control for filtered shop pages, so filter combinations don't create thin URLs.",
  facts: [{ label: "Built with", value: "WordPress, WooCommerce, Elementor, Blocksy, ShopEngine, Rank Math, PHP, Pantheon" }],
  link: { href: "https://dev-the-breezy-exchange.pantheonsite.io/", label: "Visit the demo store" },
};

const siteRebuild: CaseStudy = {
  slug: "brianramoroka-co-za",
  title: "brianramoroka.co.za",
  summary: "My own website. I designed and built it with the Next.js App Router, React, TypeScript and Tailwind CSS, and it runs on Vercel. Every page has its own metadata and Open Graph tags, and the site carries JSON-LD structured data.",
  images: [
    {
      src: "/images/work/brianramoroka-desktop.webp",
      stacked: { src: "/images/work/brianramoroka-desktop-wide.webp", width: 1500, height: 1130 },
      width: 1500,
      height: 2075,
      alt: "The brianramoroka.co.za home page",
    },
    {
      src: "/images/work/brianramoroka-mobile.webp",
      stacked: { src: "/images/work/brianramoroka-mobile-wide.webp", width: 780, height: 2170 },
      width: 780,
      height: 3720,
      alt: "The brianramoroka.co.za home page on a phone",
    },
  ],
  facts: [],
  link: { href: CONTACT.repo, label: "View the code on GitHub" },
};

export const caseStudies = [breezyExchange, siteRebuild];

export type CaseStudy = {
  slug: string;
  title: string;
  kind: string;
  summary: string;
  image: { src: string; width: number; height: number; alt: string };
  stack: string[];
  sections: { heading: string; body: string[] }[];
  facts: { label: string; value: string }[];
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "the-breezy-exchange",
    title: "The Breezy Exchange",
    kind: "WooCommerce demo store",
    summary: "A sneaker resale shop I built on WordPress and WooCommerce to show catalogue, filtering and product schema work.",
    image: {
      src: "/images/work/breezy-exchange-desktop.webp",
      width: 1600,
      height: 1000,
      alt: "The Breezy Exchange shop page with brand menu, price and size filters and product grid",
    },
    stack: ["WordPress", "WooCommerce", "Blocksy", "ShopEngine", "Elementor"],
    facts: [
      { label: "Catalogue", value: "50 products across 9 brands" },
      { label: "Filters", value: "Price (R750 to R7,800) and UK size" },
      { label: "Structured data", value: "ShoeStore, BreadcrumbList, CollectionPage" },
    ],
    sections: [
      {
        heading: "What it is",
        body: [
          "A demonstration store for graded sneaker resale. Every pair carries a condition grade, such as Brand New or Used - Excellent, and is priced against a fixed condition scale. No orders are fulfilled.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "The catalogue structure, brand navigation with a menu per brand, the shop page with price and size filters, and condition badges on every product card.",
          "Store-level structured data (ShoeStore) plus breadcrumbs, so search engines understand what the shop sells and where each page sits.",
        ],
      },
      {
        heading: "Still to do",
        body: ["Real product photography and individual product schema with offers and condition."],
      },
    ],
    link: { href: "https://dev-the-breezy-exchange.pantheonsite.io/shop/", label: "Open the demo store" },
  },
  {
    slug: "brianramoroka-co-za",
    title: "brianramoroka.co.za",
    kind: "Next.js rebuild",
    summary: "This site: a Next.js 16 rebuild that cut the time for the main content to appear on a throttled phone from 4.3 seconds to 1.5, with automated tests behind the fixes.",
    image: {
      src: "/images/work/brianramoroka-desktop.webp",
      width: 1600,
      height: 1000,
      alt: "The rebuilt brianramoroka.co.za home page with headline, two calls to action and portrait",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Playwright", "Lighthouse CI"],
    facts: [
      { label: "Mobile LCP, throttled lab test", value: "4.3 s to 1.5 s" },
      { label: "Page weight (home)", value: "1,043 KB to 330 KB" },
      { label: "Lighthouse performance (mobile)", value: "83-84 to 99-100" },
      { label: "Automated checks", value: "Playwright and axe on every page; Lighthouse budgets on three key pages" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "The old site hid its text until JavaScript finished loading, so on a throttled mid-range phone the main paragraph took 4.3 seconds to appear. Its hero image was a 6000-pixel-tall file, the CV button went nowhere, and analytics ran before visitors agreed to it.",
        ],
      },
      {
        heading: "What I changed",
        body: [
          "Server-rendered every page so text paints immediately, removed the animation library, resized and prioritised the hero image, and generated a proper social preview image.",
          "Added consent-first analytics, a contact form that works without JavaScript, structured data on every page and a privacy policy written for POPIA and the GDPR.",
        ],
      },
      {
        heading: "How it stays fixed",
        body: [
          "Each fix has a Playwright test written before the change. Axe accessibility checks run on every page, and Lighthouse performance budgets on the home, contact and case study pages fail the CI build if they regress.",
        ],
      },
    ],
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

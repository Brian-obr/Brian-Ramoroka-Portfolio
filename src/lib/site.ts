/** One source for the facts repeated across metadata, schema, footer and contact links (NAP consistency). */
export const site = {
  url: "https://www.brianramoroka.co.za",
  name: "Brian Ramoroka",
  jobTitle: "Web Developer",
  /** Positioning line from website-research.md §5.1. */
  tagline:
    "I build websites and web apps that load fast and get found: front-end, WordPress and Shopify, with SEO built in and a Java and Spring Boot background.",
  email: "ramorokaob@gmail.com",
  phoneDisplay: "+27 81 379 8635",
  phoneE164: "+27813798635",
  whatsapp: "https://wa.me/27813798635",
  locality: "Cape Town",
  region: "Western Cape",
  country: "ZA",
  sameAs: ["https://za.linkedin.com/in/brian-obr", "https://github.com/Brian-obr"],
} as const;

export const absoluteUrl = (path: string) => (path === "/" ? `${site.url}/` : `${site.url}${path}`);

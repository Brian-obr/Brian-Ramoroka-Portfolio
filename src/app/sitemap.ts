import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.brianramoroka.co.za";
  const today = new Date().toISOString();

  return [
    { url: baseUrl + "/", lastModified: today, changeFrequency: "monthly", priority: 1 },
    { url: baseUrl + "/about", lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: baseUrl + "/services", lastModified: today, changeFrequency: "monthly", priority: 0.9 },
    { url: baseUrl + "/experience", lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl + "/skills", lastModified: today, changeFrequency: "monthly", priority: 0.8 },
    { url: baseUrl + "/contact", lastModified: today, changeFrequency: "monthly", priority: 0.7 },
  ];
}

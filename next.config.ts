import type { NextConfig } from "next";
import { IMAGE_QUALITY } from "./src/lib/image-quality";

const isDev = process.env.NODE_ENV !== "production";

// 'unsafe-eval' is only needed by the dev server (React refresh), never in production.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: Object.values(IMAGE_QUALITY),
    // 31 days (the default is 4 hours). The images are static files: rename a file when you replace it.
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    // R2: /portfolio holds the case studies. The old placeholder project pages (never indexed)
    // and the interim /work route point to it.
    return [
      { source: "/portfolio/:slug+", destination: "/portfolio", statusCode: 301 },
      { source: "/work", destination: "/portfolio", statusCode: 301 },
      // The services pages are gone.
      { source: "/services", destination: "/experience", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/analytics/Analytics";
import TrackClicks from "@/components/analytics/TrackClicks";
import ConsentBanner from "@/components/consent/ConsentBanner";
import { consentDefaultsScript } from "@/lib/consent";
import { site } from "@/lib/site";
import "./globals.css";

// "optional": if Geist isn't ready within ~100ms the size-matched fallback stays for that view, so text
// never repaints late. The swap repaint was what Lighthouse counted as LCP (audit/2026-10/progress.md).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "optional",
});

// Only used for small labels and code: not preloaded so it never competes with the LCP.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Brian Ramoroka | Web Developer in Cape Town", template: "%s" },
  description: site.tagline,
  openGraph: { type: "website", locale: "en_ZA", siteName: site.name },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: { google: "7zT5KRWkb5rmiyErTIRP8OnVKBIdARbVCBSnfcUGhqg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0F0E0D" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Consent Mode v2 defaults: must run before GTM/GA load. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <div className="flex min-h-full flex-col">
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
          <Footer />
        </div>
        <ConsentBanner />
        <TrackClicks />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
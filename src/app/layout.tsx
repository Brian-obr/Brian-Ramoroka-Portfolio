import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Consent from "@/components/consent/Consent";
import ClickTracker from "@/components/consent/ClickTracker";
import { consentBootstrap } from "@/lib/analytics";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CvDialog from "@/components/cv/CvDialog";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Brian Ramoroka | Front-end Developer | Cape Town",
    template: "%s",
  },
  description:
    "Brian Ramoroka is a front-end developer in Cape Town and an SEO Web Developer at Rhiza Babuyile, working in WordPress, Shopify and JavaScript.",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Brian Ramoroka",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "7zT5KRWkb5rmiyErTIRP8OnVKBIdARbVCBSnfcUGhqg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4EF" },
    { media: "(prefers-color-scheme: dark)", color: "#121110" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Google Tag Manager container (it loads the GA4 tag). Only a well-formed ID is used, since it ends up in an inline script.
  const gtmId = /^GTM-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GTM_ID ?? "") ? process.env.NEXT_PUBLIC_GTM_ID : undefined;

  return (
    <html
      lang="en-ZA"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Script id="consent-default" strategy="beforeInteractive">
          {consentBootstrap}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-amber focus:px-5 focus:py-3 focus:text-on-amber focus:font-semibold"
        >
          Skip to content
        </a>
        <div className="flex flex-col min-h-full">
          <Navbar />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </div>
        <CvDialog />
        <Consent gtmId={gtmId} />
        <ClickTracker />
        {/* Cookieless visit counter (Vercel Web Analytics): no cookies or personal data, so it runs without consent. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
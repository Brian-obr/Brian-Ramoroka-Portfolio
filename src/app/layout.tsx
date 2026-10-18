import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Instrument_Serif } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/analytics/Analytics";
import TrackClicks from "@/components/analytics/TrackClicks";
import ConsentBanner from "@/components/consent/ConsentBanner";
import { consentDefaultsScript } from "@/lib/consent";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  // Decorative labels only; preloading it delayed LCP under slow 4G (audit F-05 follow-up).
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brianramoroka.co.za"),
  title: {
    default: "Brian Ramoroka — SEO Web Developer & Software Engineer",
    template: "%s",
  },
  description:
    "Brian Ramoroka is an SEO web developer and software engineer based in Cape Town, South Africa, specializing in performant, SEO-optimized web experiences.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-ZA"
      className={`${dmSans.variable} ${spaceMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        {/* Consent Mode v2 defaults: must run before GTM/GA load. */}
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg-deep">
        <div className="relative z-10 flex flex-col min-h-full">
          <Navbar />
          <main className="flex-1">{children}</main>
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
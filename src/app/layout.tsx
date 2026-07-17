import type { Metadata } from "next";
import { DM_Sans, Space_Mono, Instrument_Serif } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  // OG/Twitter card images come from src/app/opengraph-image.tsx (true 1200×630)
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en-ZA"
      className={`${dmSans.variable} ${spaceMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-deep">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <div className="relative z-10 flex flex-col min-h-full">
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        {gaId && process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </body>
    </html>
  );
}
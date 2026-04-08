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
  openGraph: {
    type: "website",
    locale: "en_ZA",
    siteName: "Brian Ramoroka",
    images: [
      {
        url: "https://www.brianramoroka.co.za/images/brian-ramoroka-seo-web-developer.webp",
        width: 1200,
        height: 630,
        alt: "Brian Ramoroka — SEO Web Developer & Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.brianramoroka.co.za/images/brian-ramoroka-seo-web-developer.webp"],
  },
  robots: {
    index: true,
    follow: true,
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
      lang="en"
      className={`${dmSans.variable} ${spaceMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-deep">
        <div className="relative z-10 flex flex-col min-h-full">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        {gaId && process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={gaId} />
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";
import { STORE_NAP, HOME_FAQS, storeJsonLd, faqPageJsonLd } from "./lib/storeNap";

const siteUrl = STORE_NAP.origin;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FORT YORK CANNABIS | Cannabis Store in Downtown Toronto",
    template: "%s | FORT YORK CANNABIS",
  },
  description:
    "FORT YORK CANNABIS is a local cannabis store at 38 Fort York Blvd in Toronto, serving Fort York, CityPlace, the waterfront, and downtown Toronto. Phone is 437-783-2511 and the store is open 24 hours.",
  keywords: [
    "weed dispensary in Toronto",
    "cannabis store near Fort York",
    "cannabis dispensary near CityPlace",
    "downtown Toronto weed store",
    "Fort York cannabis store",
    "FORT YORK CANNABIS",
  ],
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: siteUrl,
    siteName: "FORT YORK CANNABIS",
    title: "FORT YORK CANNABIS | Downtown Toronto Cannabis Store",
    description:
      "A Fort York / CityPlace cannabis store at 38 Fort York Blvd. Phone is 437-783-2511 and the store is open 24 hours.",
    images: [
      {
        url: `${siteUrl}/brand/og-fort-york-cannabis.webp`,
        width: 1200,
        height: 630,
        alt: "FORT YORK CANNABIS downtown Toronto banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORT YORK CANNABIS | Downtown Toronto Cannabis Store",
    description: "Fort York / CityPlace cannabis store at 38 Fort York Blvd.",
    images: [`${siteUrl}/brand/og-fort-york-cannabis.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/brand/fort-york-icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const graphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    (() => {
      const store = storeJsonLd() as Record<string, unknown>;
      delete store["@context"];
      return store;
    })(),
    (() => {
      const faq = faqPageJsonLd(HOME_FAQS) as Record<string, unknown>;
      delete faq["@context"];
      return faq;
    })(),
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <link rel="icon" href="/brand/fort-york-icon.png" type="image/png" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}


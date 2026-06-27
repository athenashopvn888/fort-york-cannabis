import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "./components/AgeGate";

const siteUrl = "https://fortyorkcannabis.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FORT YORK CANNABIS | Cannabis Store in Downtown Toronto",
    template: "%s | FORT YORK CANNABIS",
  },
  description:
    "FORT YORK CANNABIS is a local cannabis store at 38 Fort York Blvd in Toronto, serving Fort York, CityPlace, the waterfront, and downtown Toronto. Hours, phone, and menu details are pending owner confirmation.",
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
      "A Fort York / CityPlace cannabis store at 38 Fort York Blvd. Phone, hours, and menu are pending owner confirmation.",
    images: [
      {
        url: `${siteUrl}/banners/fort_york_social_preview.webp`,
        width: 1200,
        height: 630,
        alt: "FORT YORK CANNABIS downtown Toronto banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORT YORK CANNABIS | Downtown Toronto Cannabis Store",
    description: "Fort York / CityPlace cannabis store. Details pending owner confirmation.",
    images: [`${siteUrl}/banners/fort_york_social_preview.webp`],
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": siteUrl,
  name: "FORT YORK CANNABIS",
  description:
    "Cannabis store at 38 Fort York Blvd in Toronto, ON. Phone, hours, menu, and launch details are pending owner confirmation.",
  url: siteUrl,
  image: `${siteUrl}/banners/fort_york_social_preview.webp`,
  hasMap: "https://maps.app.goo.gl/XRcfsdmCFQrE3UkT9",
  address: {
    "@type": "PostalAddress",
    streetAddress: "38 Fort York Blvd",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5V 3Z3",
    addressCountry: "CA",
  },
  areaServed: [
    { "@type": "Place", name: "Fort York" },
    { "@type": "Place", name: "CityPlace" },
    { "@type": "City", name: "Toronto" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="geo.region" content="CA-ON" />
        <meta name="geo.placename" content="Toronto" />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <AgeGate />
      </body>
    </html>
  );
}


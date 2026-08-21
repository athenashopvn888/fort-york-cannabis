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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": siteUrl,
  name: "FORT YORK CANNABIS",
  description:
    "Cannabis store at 38 Fort York Blvd in Toronto, ON. Phone is 437-783-2511 and the store is open 24 hours.",
  url: siteUrl,
  telephone: "437-783-2511",
  openingHours: "Mo-Su 00:00-23:59",
  image: `${siteUrl}/brand/og-fort-york-cannabis.webp`,
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
        <link rel="icon" href="/brand/fort-york-icon.png" type="image/png" />
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

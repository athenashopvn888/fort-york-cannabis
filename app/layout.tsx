import { SHOW_CIGARETTES, cigaretteSafeContent } from "./lib/siteConfig";
import CigaretteStateProvider from "./components/CigaretteStateProvider";
import FleetContentProvider from "./components/FleetContentProvider";
import FullNameNap from "./components/FullNameNap";
import PinnedNavClearance from "./components/PinnedNavClearance";
import type { Metadata } from "next";
import "./globals.css";
import { getCigaretteSnapshot, toPublicCigaretteState } from "./lib/cigaretteFeed";
import { CODED_NAP, CODED_PAGES } from "./lib/fleet/coded";
import { getFleetContent } from "./lib/fleetContent";
import type { Nap } from "./lib/fleet/types";
import { STORE_NAP, HOME_FAQS, storeJsonLd, faqPageJsonLd } from "./lib/storeNap";

const siteUrl = STORE_NAP.origin;

export const revalidate = 300;

const ROOT_METADATA: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fort York Cannabis Dispensary Weed Delivery | Fort York / CityPlace",
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
    title: "Fort York Cannabis Dispensary Weed Delivery | Fort York / CityPlace",
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
    title: "Fort York Cannabis Dispensary Weed Delivery | Fort York / CityPlace",
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

export async function generateMetadata(): Promise<Metadata> {
  const fleet = await getFleetContent();
  const description = fleet.active ? fleet.pages.Home?.metaDescription || "" : "";
  const base = description && description !== CODED_PAGES.Home.metaDescription
    ? {
        ...ROOT_METADATA,
        description,
        openGraph: { ...ROOT_METADATA.openGraph, description },
        twitter: { ...ROOT_METADATA.twitter, description },
      }
    : ROOT_METADATA;
  return {
    ...base,
    other: { "fleet-content-version": fleet.version },
  };
}

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

function napDiffers(nap: Nap) {
  return nap.name !== CODED_NAP.name
    || nap.street !== CODED_NAP.street
    || nap.city !== CODED_NAP.city
    || nap.province !== CODED_NAP.province
    || nap.postalCode !== CODED_NAP.postalCode
    || nap.phoneDisplay !== CODED_NAP.phoneDisplay
    || nap.hours !== CODED_NAP.hours
    || nap.lat !== CODED_NAP.lat
    || nap.lng !== CODED_NAP.lng
    || nap.schemaName !== CODED_NAP.schemaName
    || nap.website !== CODED_NAP.website
    || nap.mapsSearchUrl !== CODED_NAP.mapsSearchUrl;
}

function graphFor(nap: Nap) {
  if (!napDiffers(nap)) return graphJsonLd;
  const store = storeJsonLd() as Record<string, unknown>;
  delete store["@context"];
  return {
    ...graphJsonLd,
    "@graph": [
      {
        ...store,
        name: nap.schemaName,
        url: nap.website,
        telephone: nap.phoneDisplay,
        hasMap: nap.mapsSearchUrl,
        address: {
          "@type": "PostalAddress",
          streetAddress: nap.street,
          addressLocality: nap.city,
          addressRegion: nap.province,
          postalCode: nap.postalCode,
          addressCountry: "CA",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: Number(nap.lat),
          longitude: Number(nap.lng),
        },
      },
      graphJsonLd["@graph"][1],
    ],
  };
}

async function FleetJsonLd() {
  const fleet = await getFleetContent();
  const graph = fleet.active && napDiffers(fleet.nap) ? graphFor(fleet.nap) : graphJsonLd;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cigaretteSafeContent(graph)) }}
    />
  );
}

async function FleetShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const [cigaretteSnapshot, fleet] = await Promise.all([getCigaretteSnapshot(), getFleetContent()]);
  const cigarettes = toPublicCigaretteState(cigaretteSnapshot);
  return (
    <FleetContentProvider value={{ active: fleet.active, version: fleet.version, nap: fleet.nap, banners: fleet.banners }}>
      <CigaretteStateProvider value={{ ...cigarettes, web: SHOW_CIGARETTES ? cigarettes.web : false }}>
        {children}
      </CigaretteStateProvider>
    </FleetContentProvider>
  );
}

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
        <FleetJsonLd />
      </head>
      <body>
        <FleetShell>
          {children}
          <FullNameNap />
          <PinnedNavClearance />
        </FleetShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProductImage, getProductPath, formatType, hasPositivePrice, type FlowerProduct } from "../lib/products";
import {
  getFlowersByTierKey,
  getTierRouteConfig,
  TIER_ROUTE_SLUGS,
} from "../lib/tierRoutes";
import { TIER_SEO } from "../lib/tierSeoContent";
import { STORE_NAP } from "../lib/storeNap";
import styles from "./tier.module.css";

function chipWeightsForFlower(flower: FlowerProduct): string[] {
  const chips: string[] = [];
  if (hasPositivePrice(flower.price3g)) chips.push("3g");
  if (hasPositivePrice(flower.price5g)) chips.push("5g");
  if (hasPositivePrice(flower.price14g)) chips.push("14g");
  if (hasPositivePrice(flower.price28g)) chips.push("28g");
  return chips;
}

export function generateStaticParams() {
  return TIER_ROUTE_SLUGS.map((tier) => ({ tier }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tier: string }>;
}): Promise<Metadata> {
  const { tier: tierSlug } = await params;
  const route = getTierRouteConfig(tierSlug);
  if (!route) return {};
  const seo = TIER_SEO[route.key];
  return {
    title: { absolute: seo.seoTitle },
    description: seo.metaDescription,
    alternates: { canonical: `${STORE_NAP.origin}/${tierSlug}` },
    openGraph: {
      title: seo.seoTitle,
      description: seo.metaDescription,
      url: `${STORE_NAP.origin}/${tierSlug}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function TierPage({
  params,
}: {
  params: Promise<{ tier: string }>;
}) {
  const { tier: tierSlug } = await params;
  const route = getTierRouteConfig(tierSlug);
  if (!route) notFound();

  const flowers = getFlowersByTierKey(route.key);
  const seo = TIER_SEO[route.key];
  const accent = route.detail.accent;
  const siblings = TIER_ROUTE_SLUGS.filter((s) => s !== tierSlug);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${STORE_NAP.origin}/${tierSlug}#webpage`,
        url: `${STORE_NAP.origin}/${tierSlug}`,
        name: seo.seoTitle,
        description: seo.metaDescription,
        isPartOf: { "@type": "WebSite", "@id": `${STORE_NAP.origin}/#website` },
        about: { "@id": `${STORE_NAP.origin}/#store` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: flowers.length,
          itemListElement: flowers.map((flower, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: flower.name,
            url: `${STORE_NAP.origin}${getProductPath(flower)}`,
          })),
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${STORE_NAP.origin}/${tierSlug}#faq`,
        mainEntity: seo.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <main className={styles.main}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Navbar />
      <section className={styles.hero} style={{ ["--tier-color" as string]: accent }}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            {STORE_NAP.neighborhood} · Flower collection · {STORE_NAP.hoursShort}
          </p>
          <h1 className={styles.title}>{seo.h1}</h1>
          <p className={styles.intro}>{seo.intro}</p>
          <p className={styles.stat}>
            <strong>{flowers.length}</strong> strains in this collection
          </p>
          <div className={styles.siblingNav}>
            {siblings.map((slug) => (
              <Link key={slug} href={`/${slug}`}>
                {slug === "aaa" ? "AAA+" : slug.charAt(0).toUpperCase() + slug.slice(1)} Weed
              </Link>
            ))}
            <Link href="/visit">Visit</Link>
            <Link href="/hours">Hours</Link>
          </div>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {flowers.map((flower) => {
            const chips = chipWeightsForFlower(flower);
            return (
              <Link key={flower.sku} href={getProductPath(flower)} className={styles.card}>
                <img
                  src={getProductImage(flower)}
                  alt={`${flower.name} flower at Fort York Cannabis`}
                  className={styles.cardImg}
                />
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{flower.name}</h2>
                  <p className={styles.cardMeta}>
                    {formatType(flower.type)}
                    {flower.thc ? ` · ${flower.thc} THC` : ""}
                  </p>
                  {chips.length > 0 ? <p className={styles.chips}>{chips.join(" · ")}</p> : null}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.copy}>
        {seo.sections.map((section) => (
          <article key={section.heading}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </article>
        ))}
        <div className={styles.faq}>
          <h2>Collection FAQ</h2>
          {seo.faqs.map((faq) => (
            <details key={faq.q}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

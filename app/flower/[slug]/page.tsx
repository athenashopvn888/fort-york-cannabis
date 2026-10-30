import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import shelfStyles from "../../components/PublicShelf.module.css";
import { BOGO_BUY_2_GET_1, BOGO_BUY_3_GET_3, FreeGramCardLine, isFreeGramTier } from "../../components/FreeGramPromo";
import { loadLiveMenuCatalog } from "../../lib/liveMenuCatalog";
import {
  formatType,
  getFlowerPriceRows,
  getProductImage,
  getSalePrice,
  getTierDetail,
  normalizeTier,
  type FlowerProduct,
} from "../../lib/products";
import { formatCad } from "../../lib/publicCatalog";
import { getRouteSlugForTier } from "../../lib/tierRoutes";
import { STORE_NAP } from "../../lib/storeNap";
import styles from "./flower.module.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function jsonScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

async function loadFlowers() {
  const { flowers } = await loadLiveMenuCatalog();
  return flowers as FlowerProduct[];
}

export async function generateStaticParams() {
  try {
    const flowers = await loadFlowers();
    return flowers.map((flower) => ({ slug: flower.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flower = (await loadFlowers()).find((row) => row.slug === slug);
  if (!flower) return {};
  const tierName = getTierDetail(flower.tier).name;
  const title = `${flower.name} | ${tierName} Flower | Fort York Cannabis`;
  const description = `${flower.name} is a ${tierName} flower on the Fort York Cannabis menu at 38 Fort York Blvd.${flower.thc ? ` THC listed at ${flower.thc}.` : ""} Adults 19+.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${STORE_NAP.origin}/flower/${flower.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function FlowerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flowers = await loadFlowers();
  const flower = flowers.find((row) => row.slug === slug);
  if (!flower) notFound();

  const tier = getTierDetail(flower.tier);
  const tierSlug = getRouteSlugForTier(flower.tier);
  const tierKey = normalizeTier(flower.tier);
  const rows = getFlowerPriceRows(flower);
  const typeName = formatType(flower.type);
  const canonical = `${STORE_NAP.origin}/flower/${flower.slug}`;
  const lowest = rows.map((row) => getSalePrice(row.price)).filter((amount) => amount > 0).sort((a, b) => a - b)[0];
  const related = flowers.filter((row) => normalizeTier(row.tier) === tierKey && row.slug !== flower.slug).slice(0, 8);
  const regular3 = Number(flower.price3g?.regular);
  const sale3 = Number(flower.price3g?.sale);
  const pay3 = sale3 > 0 && sale3 < regular3 ? sale3 : regular3;
  const regular6 = Number(flower.price5g?.regular);
  const sale6 = Number(flower.price5g?.sale);
  const pay6 = sale6 > 0 && sale6 < regular6 ? sale6 : regular6;
  const description = `${flower.name} is listed as ${tier.name}${typeName ? ` ${typeName}` : ""} flower at Fort York Cannabis.${flower.thc ? ` THC on the menu is ${flower.thc}.` : ""} Prices below are the ones on today's menu.`;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: flower.name,
    description,
    sku: flower.sku || flower.slug,
    url: canonical,
    brand: { "@type": "Brand", name: STORE_NAP.brand },
    image: flower.image ? [flower.image] : undefined,
  };
  if (lowest) {
    jsonLd.offers = { "@type": "Offer", priceCurrency: "CAD", price: lowest, url: canonical };
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonScript(jsonLd) }} />
      <main className={styles.main}>
        <Navbar />
        <div className={styles.shell}>
          <nav className={styles.crumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href={`/${tierSlug}`}>{tier.name}</Link>
            <span>/</span>
            <span>{flower.name}</span>
          </nav>
          <div className={styles.layout}>
            {flower.image ? (
              <img className={styles.photo} src={getProductImage(flower)} alt={`${flower.name} flower at Fort York Cannabis`} />
            ) : (
              <div className={styles.placeholder} aria-hidden="true">{flower.name.slice(0, 1)}</div>
            )}
            <div>
              <p className={styles.kicker}>{tier.name}{typeName ? ` · ${typeName}` : ""}</p>
              <h1>{flower.name}</h1>
              <p className={styles.meta}>
                {flower.thc ? `THC ${flower.thc}` : "THC not listed"}
                {flower.sku ? ` · SKU ${flower.sku}` : ""}
              </p>
              <p className={styles.copy}>{description} The menu can change, so call {STORE_NAP.phoneDisplay} if this name is the reason for the trip.</p>
              {isFreeGramTier(tierKey) && pay3 > 0 ? (
                <FreeGramCardLine
                  name={flower.name}
                  tier={tierKey}
                  price3g={{ amount: pay3, regular: regular3 }}
                  price6g={pay6 > 0 ? { amount: pay6 } : null}
                  show6g
                />
              ) : null}
              {rows.length ? (
                <div className={styles.table} aria-label="Listed weights and prices">
                  {rows.map((row) => {
                    const promo = !isFreeGramTier(tierKey) ? "" : row.label === "3g" ? BOGO_BUY_2_GET_1 : row.label === "6g" ? BOGO_BUY_3_GET_3 : "";
                    return (
                      <div key={row.field} className={styles.row}>
                        <span>{row.label}{promo ? <span className={styles.promo}> · {promo}</span> : null}</span>
                        <strong>{formatCad(getSalePrice(row.price))}</strong>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className={styles.note}>No price is listed for this strain on today's menu.</p>
              )}
            </div>
          </div>
          {related.length ? (
            <section className={styles.section}>
              <h2>More {tier.name} strains</h2>
              <div className={shelfStyles.grid}>
                {related.map((row) => (
                  <Link key={row.slug} href={`/flower/${row.slug}`} className={shelfStyles.card}>
                    <img src={getProductImage(row)} alt="" />
                    <div className={shelfStyles.body}>
                      <h2>{row.name}</h2>
                      {row.thc ? <p className={shelfStyles.meta}>THC {row.thc}</p> : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>
        <Footer />
      </main>
    </>
  );
}

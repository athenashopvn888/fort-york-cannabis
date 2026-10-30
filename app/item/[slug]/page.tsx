import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import shelfStyles from "../../components/PublicShelf.module.css";
import { loadLiveMenuCatalog } from "../../lib/liveMenuCatalog";
import { formatItemPrice, formatPercentLike, getItemCategoryLabel, getProductCategorySlug, getProductImage, type ItemProduct } from "../../lib/products";
import { groupBySlug, isPublicCatalogItem, singleListedDollar } from "../../lib/publicCatalog";
import { STORE_NAP } from "../../lib/storeNap";
import styles from "../../flower/[slug]/flower.module.css";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

function jsonScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

async function loadPublicItems() {
  const { items } = await loadLiveMenuCatalog();
  return (items as ItemProduct[]).filter(isPublicCatalogItem);
}

export async function generateStaticParams() {
  try {
    const groups = groupBySlug(await loadPublicItems());
    return groups.map((group) => ({ slug: group[0].slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const group = groupBySlug(await loadPublicItems()).find((rows) => rows[0]?.slug === slug);
  const item = group?.[0];
  if (!item) return {};
  const category = getItemCategoryLabel(item.category);
  const title = `${item.name} | ${category} | Fort York Cannabis`;
  const description = `${item.name} is listed under ${category} at Fort York Cannabis, 38 Fort York Blvd.${item.thc ? ` THC listed at ${formatPercentLike(item.thc)}.` : ""} Adults 19+.`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `${STORE_NAP.origin}/item/${item.slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function ItemPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const items = await loadPublicItems();
  const group = items.filter((item) => item.slug === slug);
  const item = group[0];
  if (!item) notFound();

  const category = getItemCategoryLabel(item.category);
  const categorySlug = getProductCategorySlug(item);
  const canonical = `${STORE_NAP.origin}/item/${item.slug}`;
  const listedPrice = singleListedDollar(item.price);
  const related = groupBySlug(items.filter((row) => row.category === item.category && row.slug !== item.slug)).slice(0, 8);
  const description = `${item.name} is on the ${category} list at Fort York Cannabis.${item.thc ? ` THC on the menu is ${formatPercentLike(item.thc)}.` : ""}${item.mg ? ` Potency listed as ${item.mg}.` : ""} The price shown is the live menu price.`;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.name,
    description,
    sku: item.sku || item.slug,
    url: canonical,
    brand: { "@type": "Brand", name: STORE_NAP.brand },
    image: item.image ? [item.image] : undefined,
  };
  if (listedPrice) {
    jsonLd.offers = { "@type": "Offer", priceCurrency: "CAD", price: listedPrice, url: canonical };
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
            <Link href={`/items/${categorySlug}`}>{category}</Link>
            <span>/</span>
            <span>{item.name}</span>
          </nav>
          <div className={styles.layout}>
            {item.image ? (
              <img className={styles.photo} src={getProductImage(item)} alt={`${item.name} at Fort York Cannabis`} />
            ) : (
              <div className={styles.placeholder} aria-hidden="true">{item.name.slice(0, 1)}</div>
            )}
            <div>
              <p className={styles.kicker}>{category}</p>
              <h1>{item.name}</h1>
              <p className={styles.meta}>
                {[item.type, item.thc ? `THC ${formatPercentLike(item.thc)}` : "", item.mg, item.sku ? `SKU ${item.sku}` : ""].filter(Boolean).join(" · ") || "Menu listing"}
              </p>
              <p className={styles.copy}>{description} Call {STORE_NAP.phoneDisplay} if you want this item confirmed before you come in.</p>
              <div className={styles.table} aria-label="Listed price">
                {group.map((row) => {
                  const price = formatItemPrice(row.price);
                  return (
                    <div key={`${row.sku}-${row.price}`} className={styles.row}>
                      <span>{row.sku ? `SKU ${row.sku}` : "Listed price"}</span>
                      <strong>{price || "Price not listed"}</strong>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {related.length ? (
            <section className={styles.section}>
              <h2>More {category}</h2>
              <div className={shelfStyles.grid}>
                {related.map((rows) => {
                  const relatedItem = rows[0];
                  const price = formatItemPrice(relatedItem.price);
                  return (
                    <Link key={relatedItem.slug} href={`/item/${relatedItem.slug}`} className={shelfStyles.card}>
                      <img src={getProductImage(relatedItem)} alt="" />
                      <div className={shelfStyles.body}>
                        <h2>{relatedItem.name}</h2>
                        {price ? <p className={shelfStyles.price}>{price}</p> : null}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ) : null}
        </div>
        <Footer />
      </main>
    </>
  );
}

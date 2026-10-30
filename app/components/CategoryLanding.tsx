import Link from "next/link";
import { STORE_NAP } from "../lib/storeNap";
import { loadLiveMenuCatalog } from "../lib/liveMenuCatalog";
import {
  CATEGORY_LANDINGS,
  groupBySlug,
  itemsForLanding,
  thcRangeSentence,
  type CategoryLandingSlug,
} from "../lib/publicCatalog";
import { formatItemPrice, formatPercentLike, type ItemProduct } from "../lib/products";
import styles from "./PublicShelf.module.css";

const SIBLINGS: { href: string; label: string }[] = [
  { href: "/pre-rolls", label: "Pre-Rolls" },
  { href: "/thc-vapes", label: "THC Vapes" },
  { href: "/items/edibles", label: "Edibles" },
  { href: "/items/concentrates", label: "Concentrates" },
  { href: "/accessories", label: "Accessories" },
  { href: "/menu", label: "Menu" },
];

function jsonScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function CategoryLanding({ slug }: { slug: CategoryLandingSlug }) {
  const landing = CATEGORY_LANDINGS[slug];
  const { items } = await loadLiveMenuCatalog();
  const groups = groupBySlug(itemsForLanding(items as ItemProduct[], slug));
  const thcLine = thcRangeSentence(groups.map((group) => group[0]?.thc || ""));
  const canonical = `${STORE_NAP.origin}${landing.path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: landing.title,
    description: landing.description,
    url: canonical,
    isPartOf: { "@type": "WebSite", "@id": `${STORE_NAP.origin}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: groups.length,
      itemListElement: groups.map((group, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: group[0].name,
        url: `${STORE_NAP.origin}/item/${group[0].slug}`,
      })),
    },
  };

  return (
    <main className={styles.main}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonScript(jsonLd) }} />
      <div className={styles.shell}>
        <nav className={styles.crumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{landing.name}</span>
        </nav>
        <p className={styles.kicker}>{STORE_NAP.neighborhood} · Adults 19+</p>
        <h1>{landing.name}</h1>
        <p className={styles.intro}>{landing.intro}</p>
        {thcLine ? <p className={styles.facts}>{thcLine}</p> : null}
        <p className={styles.facts}>{groups.length} {groups.length === 1 ? "item" : "items"} on this list.</p>
        <div className={styles.links}>
          {SIBLINGS.filter((link) => link.href !== landing.path).map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
        {groups.length === 0 ? (
          <p className={styles.empty}>Nothing in this category is on the menu right now.</p>
        ) : (
          <div className={styles.grid}>
            {groups.map((group) => {
              const item = group[0];
              const prices = [...new Set(group.map((row) => formatItemPrice(row.price)).filter(Boolean))];
              return (
                <Link key={item.slug} href={`/item/${item.slug}`} className={styles.card}>
                  {item.image ? (
                    <img src={item.image} alt={`${item.name} at Fort York Cannabis`} />
                  ) : (
                    <div className={styles.placeholder} aria-hidden="true">{item.name.slice(0, 1)}</div>
                  )}
                  <div className={styles.body}>
                    <h2>{item.name}</h2>
                    {item.thc ? <p className={styles.meta}>THC {formatPercentLike(item.thc)}</p> : null}
                    {prices.length ? <p className={styles.price}>{prices.join(" · ")}</p> : <p className={styles.meta}>Price not listed</p>}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

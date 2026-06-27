import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "../items.module.css";
import {
  findMenuProduct,
  getAllProductStaticParams,
  getFlowerPriceRows,
  getMenuCategoryBySlug,
  getProductDisplayPrice,
  getProductImage,
  getProductMeta,
} from "../../../lib/products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllProductStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product: productSlug } = await params;
  const item = findMenuProduct(category, productSlug);
  const menuCategory = getMenuCategoryBySlug(category);

  if (!item || !menuCategory) {
    return {
      title: "Menu Item | FORT YORK CANNABIS",
    };
  }

  return {
    title: `${item.name} | ${menuCategory.name} | FORT YORK CANNABIS`,
    description: `${item.name} at FORT YORK CANNABIS, 38 Fort York Blvd in Toronto. ${getProductMeta(item)}.`,
    alternates: {
      canonical: `/items/${category}/${item.slug}`,
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product: productSlug } = await params;
  const item = findMenuProduct(category, productSlug);
  const menuCategory = getMenuCategoryBySlug(category);

  if (!item || !menuCategory) {
    notFound();
  }

  const isFlower = "tier" in item;
  const flowerPrices = isFlower ? getFlowerPriceRows(item) : [];

  return (
    <main className={styles.detailPage}>
      <section className={styles.detailShell}>
        <div className={styles.detailImageWrap}>
          <img src={getProductImage(item)} alt={`${item.name} at Fort York Cannabis`} />
        </div>
        <div className={styles.detailCopy}>
          <Link href={`/items/${menuCategory.slug}`} className={styles.backLink}>Back to {menuCategory.name}</Link>
          <span className={styles.kicker}>{menuCategory.name}</span>
          <h1>{item.name}</h1>
          <p className={styles.detailMeta}>{getProductMeta(item)}</p>
          <strong className={styles.detailPrice}>{getProductDisplayPrice(item)}</strong>

          {isFlower ? (
            <div className={styles.priceGrid} aria-label="Flower weights and prices">
              {flowerPrices.map((row) => (
                <div key={row.label} className={styles.priceCard}>
                  <span>{row.label}</span>
                  <strong>${row.price.sale ?? row.price.regular}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.detailFacts}>
              <div><span>Category</span><strong>{item.category}</strong></div>
              {item.thc ? <div><span>THC</span><strong>{item.thc}</strong></div> : null}
              {item.mg ? <div><span>Potency</span><strong>{item.mg}</strong></div> : null}
            </div>
          )}

          <div className={styles.storeCallout}>
            <strong>FORT YORK CANNABIS</strong>
            <span>38 Fort York Blvd / 437-872-8446 / Open 11AM-2AM</span>
          </div>
        </div>
      </section>
    </main>
  );
}

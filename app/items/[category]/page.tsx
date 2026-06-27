import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  MENU_CATEGORIES,
  MENU_SOURCE_STATE,
  getMenuCategoryBySlug,
  getMenuProductsByCategory,
  getProductImage,
  type MenuProduct,
} from "../../lib/products";
import styles from "./items.module.css";

export function generateStaticParams() {
  return MENU_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);
  if (!category) return {};

  return {
    title: category.seoTitle,
    description: category.seoDescription,
    alternates: {
      canonical: `https://fortyorkcannabis.com/items/${slug}`,
    },
  };
}

export default async function ItemsCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);
  if (!category) notFound();

  const products = getMenuProductsByCategory(category);

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <img src={category.banner} alt={`${category.name} at Fort York Cannabis`} className={styles.heroImage} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroCopy}>
          <span className={styles.microLabel}>Fort York menu category</span>
          <h1>{category.name}</h1>
          <p>{category.detail}</p>
          <Link href="/menu" className={styles.backLink}>Back to full menu</Link>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.statusPanel}>
            <div>
              <span className={styles.microLabel}>Current menu mode</span>
              <h2>{MENU_SOURCE_STATE.label}</h2>
              <p>
                Fort York category routes are ready, but final product names, pricing, pickup, delivery, and live menu details are not displayed until the approved source is connected.
              </p>
            </div>
            <div className={styles.statusMeta}>
              <span>Store code</span>
              <strong>{MENU_SOURCE_STATE.storeCode}</strong>
              <span>Confirmed category items</span>
              <strong>{products.length}</strong>
            </div>
          </div>

          {products.length > 0 ? (
            <div className={styles.grid}>
              {products.map((product) => (
                <ProductCard key={product.sku || product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <span className={styles.emptyKicker}>Menu source pending</span>
              <h2>{category.name} menu coming soon</h2>
              <p>
                This page is wired for the same generated-data menu pattern used across the store network. It will stay in a clean customer-facing fallback state until Fort York product data is approved.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ product }: { product: MenuProduct }) {
  const isFlower = "tier" in product;
  const detail = isFlower
    ? [product.type, product.thc].filter(Boolean).join(" / ")
    : [product.category, product.type, product.thc || product.mg].filter(Boolean).join(" / ");

  return (
    <article className={styles.card}>
      <img src={getProductImage(product)} alt={product.name} className={styles.cardImage} />
      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>{detail || "Fort York menu item"}</span>
        <h3>{product.name}</h3>
        <p>Confirmed Fort York menu item. Final ordering actions require owner/backend approval.</p>
      </div>
    </article>
  );
}

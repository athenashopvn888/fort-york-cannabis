import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./items.module.css";
import {
  MENU_CATEGORIES,
  MENU_SOURCE_STATE,
  getMenuCategoryBySlug,
  getMenuItemCount,
  getMenuProductsByCategory,
  getProductImage,
  type MenuProduct,
} from "../../lib/products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return MENU_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Fort York Menu Category | FORT YORK CANNABIS",
    };
  }

  return {
    title: `${category.name} Preview Menu | FORT YORK CANNABIS Toronto`,
    description: `${category.name} preview products for FORT YORK CANNABIS at 38 Fort York Blvd in Toronto. Final inventory and ordering require owner approval.`,
    alternates: {
      canonical: `/items/${category.slug}`,
    },
  };
}

function getPreviewPrice(product: MenuProduct) {
  if ("tier" in product) {
    const values = [product.price3g, product.price5g, product.price14g, product.price28g]
      .flatMap((price) => (price ? [price.sale ?? price.regular] : []))
      .filter((value): value is number => typeof value === "number");

    if (!values.length) {
      return "Price pending";
    }

    return `From $${Math.min(...values)}`;
  }

  return product.price || "Price pending";
}

function ProductCard({ product }: { product: MenuProduct }) {
  const slug = product.slug;
  const isFlower = "tier" in product;
  const detail = isFlower
    ? [product.tier, product.type, product.thc ? `THC ${product.thc}` : ""].filter(Boolean).join(" / ")
    : [product.category, product.thc ? `THC ${product.thc}` : ""].filter(Boolean).join(" / ");

  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={getProductImage(product)} alt={`${product.name} preview product at Fort York Cannabis`} loading="lazy" />
        <span className={styles.previewBadge}>Preview stock</span>
      </div>
      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>{detail || "Fort York menu item"}</span>
        <h3>{product.name}</h3>
        <strong className={styles.cardPrice}>{getPreviewPrice(product)}</strong>
        <p>Temporary preview product for owner review. Final Fort York stock and ordering are pending approval.</p>
        <Link href={`/items/${isFlower ? "flower" : product.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}/${slug}`}>
          Preview details
        </Link>
      </div>
    </article>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getMenuProductsByCategory(category);
  const count = getMenuItemCount(category);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>Fort York preview menu</span>
          <h1>{category.name}</h1>
          <p>{category.detail}</p>
        </div>
        <div className={styles.statusPanel}>
          <span>{MENU_SOURCE_STATE.label}</span>
          <strong>{count} preview products</strong>
          <p>Preview stock and prices are shown for local review only. Final Fort York inventory requires owner approval.</p>
        </div>
      </section>

      {products.length > 0 ? (
        <section className={styles.grid} aria-label={`${category.name} preview products`}>
          {products.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </section>
      ) : (
        <section className={styles.empty}>
          <h2>Final inventory pending</h2>
          <p>
            This category route is ready for Fort York products, but final inventory, pricing, and availability still require owner approval.
          </p>
          <Link href="/menu">Back to menu</Link>
        </section>
      )}
    </main>
  );
}

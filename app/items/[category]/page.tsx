import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./items.module.css";
import {
  MENU_CATEGORIES,
  getFlowerTierGroups,
  getMenuCategoryBySlug,
  getMenuItemCount,
  getMenuProductsByCategory,
  getProductDisplayPrice,
  getProductImage,
  getProductMeta,
  getProductPath,
  type MenuProduct,
} from "../../lib/products";

export const dynamic = "force-static";

export function generateStaticParams() {
  return MENU_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Fort York Menu Category | FORT YORK CANNABIS",
    };
  }

  return {
    title: `${category.name} Menu | FORT YORK CANNABIS Toronto`,
    description: category.seoDescription,
    alternates: {
      canonical: `/items/${category.slug}`,
    },
  };
}

function ProductCard({ product }: { product: MenuProduct }) {
  return (
    <article className={styles.card}>
      <Link href={getProductPath(product)} className={styles.imageWrap} aria-label={`View ${product.name}`}>
        <img src={getProductImage(product)} alt={`${product.name} at Fort York Cannabis`} loading="lazy" />
        {"tier" in product && product.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
      </Link>
      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>{getProductMeta(product)}</span>
        <h3>{product.name}</h3>
        <strong className={styles.cardPrice}>{getProductDisplayPrice(product)}</strong>
        <Link href={getProductPath(product)}>View Details</Link>
      </div>
    </article>
  );
}

function FlowerTierSections() {
  const groups = getFlowerTierGroups();

  return (
    <section className={styles.tierSections} aria-label="Flower tiers">
      {groups.map((group) => (
        <section className={styles.tierSection} key={group.tier}>
          <div className={styles.tierHeader}>
            <div>
              <span className={styles.kicker}>Flower Tier</span>
              <h2>{group.tier}</h2>
            </div>
            <strong>{group.products.length} strains</strong>
          </div>
          <div className={styles.grid}>
            {group.products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const category = getMenuCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getMenuProductsByCategory(category);
  const count = getMenuItemCount(category);
  const isFlower = category.key === "FLOWER";

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <span className={styles.kicker}>Fort York Menu</span>
          <h1>{category.name}</h1>
          <p>{category.detail}</p>
        </div>
        <div className={styles.statusPanel}>
          <span>Current Menu</span>
          <strong>{count} items</strong>
          <p>Open 11AM-2AM at 38 Fort York Blvd. Call 437-872-8446 for product questions.</p>
        </div>
      </section>

      {products.length > 0 ? (
        isFlower ? (
          <FlowerTierSections />
        ) : (
          <section className={styles.grid} aria-label={`${category.name} products`}>
            {products.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </section>
        )
      ) : (
        <section className={styles.empty}>
          <h2>No items listed right now</h2>
          <p>Check another category or call the store for current menu questions.</p>
          <Link href="/menu">Back to menu</Link>
        </section>
      )}
    </main>
  );
}

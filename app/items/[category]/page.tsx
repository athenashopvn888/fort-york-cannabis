import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styles from "./items.module.css";
import {
  MENU_CATEGORIES,
  STORE_INFO,
  formatItemPrice,
  formatPricePoint,
  formatType,
  getFlowerEffects,
  getFlowerPriceRows,
  getFlowerTierGroups,
  getItemDetailChips,
  getMenuCategoryBySlug,
  getMenuItemCount,
  getMenuProductsByCategory,
  getProductDisplayPrice,
  getProductImage,
  getProductMeta,
  getProductPath,
  getTierAnchor,
  getTierDetail,
  type FlowerProduct,
  type ItemProduct,
  type MenuCategory,
  type MenuProduct,
} from "../../lib/products";
import { CIGARETTE_MIX_MATCH_LABEL, isCigaretteDealSku } from "../../lib/cigaretteDeals.mjs";

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

function CategoryNavigation({ activeSlug }: { activeSlug: string }) {
  return (
    <nav className={styles.categoryNav} aria-label="Browse menu categories">
      <Link href="/menu">Menu</Link>
      {MENU_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/items/${category.slug}`}
          aria-current={category.slug === activeSlug ? "page" : undefined}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

function StickyMenuNavigator({ activeSlug, showTiers }: { activeSlug: string; showTiers: boolean }) {
  const groups = showTiers ? getFlowerTierGroups() : [];

  return (
    <div className={styles.stickyMenuNav} data-has-tiers={showTiers ? true : false}>
      <CategoryNavigation activeSlug={activeSlug} />
      {showTiers ? (
        <nav className={styles.tierJump} aria-label="Jump to flower tier">
          {groups.map((group) => (
            <a key={group.tier} href={`#${getTierAnchor(group.tier)}`}>
              {group.detail.name}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
  );
}

function SaleBadges({ product }: { product: MenuProduct }) {
  if ("tier" in product) {
    return (
      <>
        {product.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
        {product.isHot ? <span className={styles.hotBadge}>Top Pick</span> : null}
      </>
    );
  }

  return product.isSale || product.promoImage ? <span className={styles.saleBadge}>Feature</span> : null;
}

function FlowerCard({ product }: { product: FlowerProduct }) {
  const rows = getFlowerPriceRows(product);
  const tier = getTierDetail(product.tier);
  const effects = getFlowerEffects(product);

  return (
    <article className={styles.card} style={{ "--tier-color": tier.accent } as CSSProperties}>
      <Link href={getProductPath(product)} className={styles.imageWrap} aria-label={`View ${product.name}`}>
        <Image
          src={getProductImage(product)}
          alt={`${product.name} at Fort York Cannabis`}
          width={360}
          height={280}
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 280px"
        />
        <SaleBadges product={product} />
        {product.thc ? <span className={styles.thcBadge}>THC {product.thc}</span> : null}
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.chipRow}>
          <span>{tier.name}</span>
          <span>{formatType(product.type)}</span>
          {product.sku ? <span>SKU {product.sku}</span> : null}
        </div>
        <h3>{product.name}</h3>
        <p className={styles.effectLine}>{effects.join(" / ")}</p>
        <strong className={styles.cardPrice}>{getProductDisplayPrice(product)}</strong>
        <div className={styles.weightGrid} aria-label={`${product.name} weights and prices`}>
          {rows.map((row) => (
            <div key={row.field} className={styles.weightPill}>
              <span>{row.label}</span>
              <strong>{formatPricePoint(row.price)}</strong>
              {row.promo ? <em>{row.promo}</em> : null}
            </div>
          ))}
        </div>
        <Link href={getProductPath(product)}>View Details</Link>
      </div>
    </article>
  );
}

function ItemCard({ product }: { product: ItemProduct }) {
  const chips = getItemDetailChips(product).slice(0, 5);
  const cigaretteDeal = product.category.toUpperCase() === "CIGARETTES" && isCigaretteDealSku(product.sku);
  const itemPrice = formatItemPrice(product.price) || "Price in store";

  return (
    <article className={styles.card}>
      <Link href={getProductPath(product)} className={styles.imageWrap} aria-label={`View ${product.name}`}>
        <Image
          src={getProductImage(product)}
          alt={`${product.name} at Fort York Cannabis`}
          width={360}
          height={280}
          sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 280px"
        />
        <SaleBadges product={product} />
        {cigaretteDeal ? <span className={styles.mixMatchBadge}>2 Pack $5</span> : null}
      </Link>
      <div className={styles.cardBody}>
        <span className={styles.cardMeta}>{getProductMeta(product)}</span>
        <h3>{product.name}</h3>
        <div className={styles.chipRow}>
          {chips.map((chip) => (
            <span key={chip}>{chip}</span>
          ))}
        </div>
        {cigaretteDeal ? (
          <div className={styles.cigarettePricePair} aria-label={`${itemPrice} carton and ${CIGARETTE_MIX_MATCH_LABEL}`}>
            <div>
              <span>Carton</span>
              <strong>{itemPrice}</strong>
            </div>
            <div className={styles.mixMatchPrice}>
              <span>Mix &amp; Match</span>
              <strong>2 Pack $5</strong>
            </div>
          </div>
        ) : (
          <strong className={styles.cardPrice}>{itemPrice}</strong>
        )}
        <Link href={getProductPath(product)}>View Details</Link>
      </div>
    </article>
  );
}

function ProductCard({ product }: { product: MenuProduct }) {
  return "tier" in product ? <FlowerCard product={product} /> : <ItemCard product={product} />;
}

function FlowerTierSections() {
  const groups = getFlowerTierGroups();

  return (
    <section className={styles.tierSections} aria-label="Flower tiers">
      {groups.map((group) => (
        <section className={styles.tierSection} id={group.detail.slug} key={group.tier}>
          <div className={styles.tierHeader} style={{ "--tier-color": group.detail.accent } as CSSProperties}>
            <div>
              <span className={styles.kicker}>Flower Tier</span>
              <h2>{group.detail.name}</h2>
              <p>{group.detail.description}</p>
            </div>
            <strong>{group.products.length} strains</strong>
          </div>
          <div className={styles.grid}>
            {group.products.map((product) => (
              <FlowerCard key={`${product.sku}-${product.slug}`} product={product} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

function CigaretteOfferStrip() {
  return (
    <section className={styles.cigaretteOfferStrip} aria-label="Cigarette carton and mix and match prices">
      <div>
        <span>Carton Price</span>
        <strong>$25 Cartons</strong>
      </div>
      <div className={styles.cigaretteOfferPromo}>
        <span>Selected SKUs</span>
        <strong>{CIGARETTE_MIX_MATCH_LABEL}</strong>
      </div>
      <p>Approved cigarette SKUs show both prices. Other cigarette and smoke-shelf items keep their listed price.</p>
    </section>
  );
}

function CategorySeoIntro({ category }: { category: MenuCategory }) {
  const content = category.seoContent;
  if (!content) return null;

  return (
    <section className={styles.categorySeoIntro} aria-labelledby={`${category.slug}-local-heading`}>
      <div className={styles.categorySeoCopy}>
        <span>{content.eyebrow}</span>
        <h2 id={`${category.slug}-local-heading`}>{content.heading}</h2>
        {content.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <Link href={content.landingHref}>{content.landingLabel}</Link>
      </div>
      <ul className={styles.categorySeoHighlights} aria-label={`${category.name} shopping details`}>
        {content.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
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
    <main className={`${styles.page} ${isFlower ? styles.flowerPage : styles.categoryPage}`}>
      <Navbar />

      <section
        className={styles.hero}
        style={{ "--category-banner": `url(${category.banner})` } as CSSProperties}
      >
        <div>
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/menu">Menu</Link>
            <span>/</span>
            <span>{category.name}</span>
          </nav>
          <span className={styles.kicker}>Fort York Menu</span>
          <h1>{category.name}</h1>
          <p>{category.detail}</p>
          <CategoryNavigation activeSlug={category.slug} />
        </div>
        <div className={styles.statusPanel}>
          <span>{STORE_INFO.name}</span>
          <strong>{count} items</strong>
          <p>
            Open {STORE_INFO.hours} at {STORE_INFO.shortAddress}. Call {STORE_INFO.phone} for product questions.
          </p>
          <Link href="/menu" className={styles.panelLink}>Back to Menu</Link>
        </div>
      </section>

      <StickyMenuNavigator activeSlug={category.slug} showTiers={isFlower} />

      {category.key === "CIGARETTES" ? <CigaretteOfferStrip /> : null}

      <CategorySeoIntro category={category} />

      {products.length > 0 ? (
        isFlower ? (
          <FlowerTierSections />
        ) : (
          <section className={styles.grid} aria-label={`${category.name} products`}>
            {products.map((product) => (
              <ProductCard key={`${product.sku}-${product.slug}`} product={product} />
            ))}
          </section>
        )
      ) : (
        <section className={styles.empty}>
          <h2>No items listed right now</h2>
          <p>Check another category or call the store for current menu questions.</p>
          <Link href="/menu">Back to Menu</Link>
        </section>
      )}

      <Footer />
    </main>
  );
}

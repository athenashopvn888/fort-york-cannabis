import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import styles from "../items.module.css";
import {
  STORE_INFO,
  findMenuProduct,
  formatItemPrice,
  formatPricePoint,
  getAllProductStaticParams,
  getFlowerBestValue,
  getFlowerDescription,
  getFlowerEffects,
  getFlowerPriceRows,
  getItemDescription,
  getItemDetailChips,
  getItemEffects,
  getMenuCategoryBySlug,
  getProductDisplayPrice,
  getProductImage,
  getProductMeta,
  getProductPath,
  getSalePrice,
  getTierAnchor,
  getTierDetail,
} from "../../../lib/products";
import {
  findMenuProductFrom,
  getLegacyProductRedirectFrom,
  getRelatedProductsFrom,
  loadLiveMenuCatalog,
} from "../../../lib/liveMenuCatalog";
import { CIGARETTE_MIX_MATCH_LABEL, isCigaretteDealSku } from "../../../lib/cigaretteDeals.mjs";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return getAllProductStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category, product: productSlug } = await params;
  const { flowers, items } = await loadLiveMenuCatalog();
  const item = findMenuProductFrom(category, productSlug, flowers, items);
  const menuCategory = getMenuCategoryBySlug(category);

  if (!item || !menuCategory) {
    return {
      title: "Menu Item | FORT YORK CANNABIS",
    };
  }

  return {
    title: `${item.name} | ${menuCategory.name} | FORT YORK CANNABIS`,
    description: `${item.name} at FORT YORK CANNABIS, ${STORE_INFO.address}. ${getProductMeta(item)}.`,
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
  const { flowers, items } = await loadLiveMenuCatalog();
  const item = findMenuProductFrom(category, productSlug, flowers, items);
  const menuCategory = getMenuCategoryBySlug(category);

  if (!item || !menuCategory) {
    const legacyRedirect = getLegacyProductRedirectFrom(category, productSlug, items);
    if (legacyRedirect) permanentRedirect(legacyRedirect);
    notFound();
  }

  const isFlower = "tier" in item;
  const related = getRelatedProductsFrom(item, flowers, items, 8);
  const tierDetail = isFlower ? getTierDetail(item.tier) : null;
  const detailReturnHref = isFlower
    ? `/items/${menuCategory.slug}#${getTierAnchor(item.tier)}`
    : `/items/${menuCategory.slug}`;
  const detailReturnLabel = tierDetail
    ? `Back to ${tierDetail.name}`
    : `Back to ${menuCategory.name}`;

  return (
    <main className={styles.detailPage}>
      <Navbar />

      <nav className={styles.detailExitBar} aria-label="Product detail navigation">
        <Link href={detailReturnHref} className={styles.detailExitPrimary}>{detailReturnLabel}</Link>
        <Link href={`/items/${menuCategory.slug}`} className={styles.detailExitSecondary}>All {menuCategory.name}</Link>
        <Link href="/menu" className={styles.detailExitSecondary}>Menu</Link>
      </nav>

      <nav className={styles.detailBreadcrumb} aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/menu">Menu</Link>
        <span>/</span>
        <Link href={`/items/${menuCategory.slug}`}>{menuCategory.name}</Link>
        <span>/</span>
        <span>{item.name}</span>
      </nav>

      <section className={styles.detailShell}>
        <div className={styles.detailImageWrap}>
          <Image
            src={getProductImage(item)}
            alt={`${item.name} at Fort York Cannabis`}
            width={720}
            height={720}
            sizes="(max-width: 760px) 94vw, 48vw"
            priority
          />
          <div className={styles.detailImageBadges}>
            {isFlower && item.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
            {isFlower && item.isHot ? <span className={styles.hotBadge}>Top Pick</span> : null}
            {isFlower && item.thc ? <span className={styles.thcBadge}>THC {item.thc}</span> : null}
          </div>
        </div>
        <div className={styles.detailCopy}>
          <div className={styles.backRow}>
            <Link href={detailReturnHref} className={styles.backLink}>{detailReturnLabel}</Link>
            <Link href="/menu" className={styles.backLink}>Back to Menu</Link>
          </div>
          <span className={styles.kicker}>{menuCategory.name}</span>
          <h1>{item.name}</h1>
          <p className={styles.detailMeta}>{getProductMeta(item)}</p>
          <strong className={styles.detailPrice}>{getProductDisplayPrice(item)}</strong>

          {isFlower ? <FlowerDetail product={item} /> : <ItemDetail product={item} />}

          <div className={styles.storeCallout}>
            <strong>{STORE_INFO.name}</strong>
            <span>{STORE_INFO.shortAddress}</span>
            <span>{STORE_INFO.phone}</span>
            <span>Open {STORE_INFO.hours}</span>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className={styles.relatedSection}>
          <div className={styles.relatedHeader}>
            <span className={styles.kicker}>{isFlower ? "More Strains" : "More Items"}</span>
            <h2>{isFlower ? `More from ${getTierDetail(item.tier).name}` : `More ${menuCategory.name}`}</h2>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((product) => (
              <Link key={`${product.sku}-${product.slug}`} href={getProductPath(product)} className={styles.relatedCard}>
                <Image
                  src={getProductImage(product)}
                  alt=""
                  width={260}
                  height={180}
                  sizes="(max-width: 760px) 92vw, (max-width: 1100px) 45vw, 260px"
                />
                <span>{"tier" in product ? getTierDetail(product.tier).name : menuCategory.name}</span>
                <strong>{product.name}</strong>
                <em>{getProductDisplayPrice(product)}</em>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}

function FlowerDetail({ product }: { product: Extract<ReturnType<typeof findMenuProduct>, { tier: string }> }) {
  const rows = getFlowerPriceRows(product);
  const bestValue = getFlowerBestValue(product);
  const effects = getFlowerEffects(product);

  return (
    <>
      <div className={styles.chipRowLarge}>
        <span>{getTierDetail(product.tier).name}</span>
        <span>{product.type}</span>
        {product.thc ? <span>THC {product.thc}</span> : null}
        {product.sku ? <span>SKU {product.sku}</span> : null}
      </div>

      <div className={styles.effectsRow} aria-label="Effects">
        {effects.map((effect) => (
          <span key={effect}>{effect}</span>
        ))}
      </div>

      <section className={styles.pricingTable} aria-label="Flower weights and prices">
        <div className={styles.tableHeader}>
          <span>Weight</span>
          <span>Price</span>
          <span>$/g</span>
        </div>
        {rows.map((row) => {
          const effective = getSalePrice(row.price);
          const perGram = (effective / row.grams).toFixed(2);
          return (
            <div key={row.field} className={row.promo ? styles.bundleRow : styles.tableRow}>
              {row.promo ? <p className={styles.bundleNote}>{row.label}: {row.promo}</p> : null}
              <div className={styles.tableCells}>
                <span>{row.label}</span>
                <strong>
                  {row.price.sale !== null && row.price.sale !== row.price.regular ? (
                    <>
                      <em>${row.price.regular}</em> {formatPricePoint(row.price)}
                    </>
                  ) : (
                    formatPricePoint(row.price)
                  )}
                </strong>
                <span>${perGram}/g</span>
              </div>
            </div>
          );
        })}
      </section>

      {bestValue ? <p className={styles.valueNote}>Lowest $/g: ${bestValue.perGram}/g at {bestValue.label}</p> : null}

      <section className={styles.descBlock}>
        <h2>About {product.name}</h2>
        <p>{getFlowerDescription(product)}</p>
      </section>
    </>
  );
}

function ItemDetail({ product }: { product: Extract<ReturnType<typeof findMenuProduct>, { category: string }> }) {
  const chips = getItemDetailChips(product);
  const effects = getItemEffects(product);
  const cigaretteDeal = product.category.toUpperCase() === "CIGARETTES" && isCigaretteDealSku(product.sku);

  return (
    <>
      <div className={styles.chipRowLarge}>
        {chips.map((chip) => (
          <span key={chip}>{chip}</span>
        ))}
      </div>

      <div className={styles.effectsRow} aria-label="Item details">
        {effects.map((effect) => (
          <span key={effect}>{effect}</span>
        ))}
      </div>

      <div className={styles.detailFacts}>
        <div><span>Category</span><strong>{product.category}</strong></div>
        {product.type ? <div><span>Subtype</span><strong>{product.type}</strong></div> : null}
        {product.thc ? <div><span>THC</span><strong>{product.thc}</strong></div> : null}
        {product.mg ? <div><span>Potency</span><strong>{product.mg}</strong></div> : null}
        {cigaretteDeal ? (
          <>
            <div><span>Carton</span><strong>{formatItemPrice(product.price) || "$25"}</strong></div>
            <div className={styles.mixMatchFact}><span>Mix &amp; Match</span><strong>{CIGARETTE_MIX_MATCH_LABEL}</strong></div>
          </>
        ) : (
          <div><span>Price</span><strong>{formatItemPrice(product.price) || "Price in store"}</strong></div>
        )}
      </div>

      <section className={styles.descBlock}>
        <h2>About {product.name}</h2>
        <p>{getItemDescription(product)}</p>
      </section>
    </>
  );
}

"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import TvPromoTakeover from "../components/TvPromoTakeover";
import styles from "./tv.module.css";
import {
  FLOWER_TIER_ORDER,
  STORE_INFO,
  allFlowers,
  allItems,
  formatItemPrice,
  formatPricePoint,
  formatType,
  getFlowerEffects,
  getFlowerPriceRows,
  getItemCategoryLabel,
  getProductImage,
  getTierDetail,
  isTopBundleTier,
  normalizeTier,
  type FlowerProduct,
  type ItemProduct,
} from "../lib/products";

const MAX_ROWS = 5;
const ADD_ON_CATEGORIES = new Set(["ADD ONS", "PREROLLS", "PRE-ROLLS", "PRE ROLLS"]);

function groupByTier(flowers: FlowerProduct[]) {
  return flowers.reduce<Record<string, FlowerProduct[]>>((groups, flower) => {
    const tier = normalizeTier(flower.tier);
    groups[tier] = groups[tier] || [];
    groups[tier].push(flower);
    return groups;
  }, {});
}

function rotateList<T>(items: T[], offset: number, limit: number) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(limit, items.length) }, (_, index) => items[(offset + index) % items.length]);
}

function unitLabel(unitPrice: number) {
  return `$${unitPrice} / G`;
}

function formatPotency(value?: string) {
  const text = String(value || "").trim();
  const numeric = Number(text);

  if (!text) return "";
  if (text.includes("%")) return text;
  if (Number.isFinite(numeric) && numeric > 0 && numeric <= 1) return `${Math.round(numeric * 100)}%`;
  return text;
}

function getOzFlowers(flowers: FlowerProduct[]) {
  const seen = new Set<string>();

  return flowers.filter((flower) => {
    if (!flower.price28g || seen.has(flower.sku)) return false;
    seen.add(flower.sku);
    return true;
  });
}

function getAddOnItems(items: ItemProduct[]) {
  const addOns = items.filter((item) => ADD_ON_CATEGORIES.has(item.category.toUpperCase()));
  return addOns.length ? addOns : items;
}

function PriceCell({ product, compact = false }: { product: FlowerProduct; compact?: boolean }) {
  const rows = getFlowerPriceRows(product, "tv").slice(0, compact ? 2 : 3);

  return (
    <div className={compact ? styles.priceStackCompact : styles.priceStack}>
      {rows.map((row) => (
        <div key={row.field} className={row.promo ? styles.priceDeal : styles.priceLine}>
          <span>{row.shortLabel}</span>
          <strong>{formatPricePoint(row.price)}</strong>
          {row.promo && !compact ? <em>{row.promo}</em> : null}
        </div>
      ))}
    </div>
  );
}

function TypeTag({ type }: { type: string }) {
  const key = (type || "").toLowerCase();
  return <span className={`${styles.typeTag} ${styles[key] || ""}`}>{formatType(type)}</span>;
}

function TierMenuCard({
  tier,
  products,
  tick,
  className = "",
}: {
  tier: string;
  products: FlowerProduct[];
  tick: number;
  className?: string;
}) {
  const detail = getTierDetail(tier);
  const featured = products.length ? products[tick % products.length] : undefined;
  const visible = rotateList(products, tick, MAX_ROWS);
  const isBundleTier = isTopBundleTier(tier);
  const featuredRows = featured ? getFlowerPriceRows(featured, "tv").slice(0, 3) : [];
  const effects = featured ? getFlowerEffects(featured) : [];

  return (
    <article className={`${styles.tierCard} ${className}`} style={{ "--tier-color": detail.accent } as CSSProperties}>
      <header className={styles.tierHead}>
        <div className={styles.tierTitle}>
          <span>Flower Tier</span>
          <h2>{detail.name}</h2>
        </div>
        <div className={styles.unitBadge}>
          <strong>{unitLabel(detail.unitPrice)}</strong>
          <small>{products.length} strains</small>
        </div>
      </header>

      {isBundleTier ? (
        <section className={styles.dealStrip} aria-label={`${detail.name} bundle pricing`}>
          <div className={styles.dealCell}>
            <span>{detail.deal3g || "Buy 2g Get 1g Free"}</span>
            <strong>3g Total ${detail.unitPrice * 2}</strong>
          </div>
          <div className={styles.dealCell}>
            <span>{detail.deal6g || "Buy 3g Get 3g Free"}</span>
            <strong>6g Total ${detail.unitPrice * 3}</strong>
          </div>
        </section>
      ) : (
        <section className={styles.valueStrip} aria-label={`${detail.name} value pricing`}>
          <div className={styles.valueCell}>
            <span>Unit Price</span>
            <strong>{unitLabel(detail.unitPrice)}</strong>
          </div>
          {featuredRows.slice(0, 2).map((row) => (
            <div className={styles.valueCell} key={row.field}>
              <span>{row.shortLabel}</span>
              <strong>{formatPricePoint(row.price)}</strong>
            </div>
          ))}
        </section>
      )}

      {featured ? (
        <div className={styles.cardBody}>
          <section className={styles.featurePane}>
            <div className={styles.imageFrame}>
              <img src={getProductImage(featured)} alt={featured.name} />
              {featured.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
              {featured.isHot ? <span className={styles.hotBadge}>Top Pick</span> : null}
              {featured.thc ? <span className={styles.thcBadge}>THC {featured.thc}</span> : null}
            </div>
            <div className={styles.featureCopy}>
              <TypeTag type={featured.type} />
              <h3>{featured.name}</h3>
              <p className={styles.effectLine}>{effects.join(" / ")}</p>
              <small className={styles.skuLine}>SKU {featured.sku}</small>
              <div className={styles.featurePrices}>
                {featuredRows.map((row) => (
                  <div key={row.field} className={styles.featurePrice}>
                    <span>{row.shortLabel}</span>
                    <strong>{formatPricePoint(row.price)}</strong>
                    {row.promo ? <em>{row.promo}</em> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.tablePane} aria-label={`${detail.name} strains`}>
            <div className={styles.rowsHead}>
              <span>Strain</span>
              <span>Price</span>
            </div>
            <div className={styles.productRows}>
              {visible.map((flower) => (
                <div className={styles.productRow} key={flower.sku}>
                  <div className={styles.rowMain}>
                    <strong className={styles.rowName}>{flower.name}</strong>
                    <span className={styles.rowMeta}>
                      <TypeTag type={flower.type} />
                      {flower.thc ? <b>THC {flower.thc}</b> : null}
                      {flower.isSale ? <em>Sale</em> : null}
                    </span>
                  </div>
                  <PriceCell product={flower} compact />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className={styles.emptyBoard}>Call for current {detail.name} menu</div>
      )}
    </article>
  );
}

function OzMenuCard({ flowers, tick }: { flowers: FlowerProduct[]; tick: number }) {
  const featured = flowers.length ? flowers[tick % flowers.length] : undefined;
  const visible = rotateList(flowers, tick, 5);
  const effects = featured ? getFlowerEffects(featured) : [];

  return (
    <article className={`${styles.tierCard} ${styles.ozCard}`} style={{ "--tier-color": "#b01664" } as CSSProperties}>
      <header className={styles.tierHead}>
        <div className={styles.tierTitle}>
          <span>Ounce Deals</span>
          <h2>OZ</h2>
        </div>
        <div className={styles.unitBadge}>
          <strong>$40 up</strong>
          <small>{flowers.length} options</small>
        </div>
      </header>

      <section className={styles.ozStrip} aria-label="Ounce pricing">
        <div>
          <span>Budget Shreds</span>
          <strong>$40 / OZ</strong>
        </div>
        <div>
          <span>More OZ Options</span>
          <strong>Ask Staff</strong>
        </div>
      </section>

      {featured ? (
        <div className={styles.specialBody}>
          <section className={styles.ozFeature}>
            <div className={styles.ozImageFrame}>
              <img src={getProductImage(featured)} alt={featured.name} />
              {featured.thc ? <span className={styles.thcBadge}>THC {featured.thc}</span> : null}
            </div>
            <div className={styles.ozCopy}>
              <TypeTag type={featured.type} />
              <h3>{featured.name}</h3>
              <p>{effects.join(" / ")}</p>
              <strong>{featured.price28g ? formatPricePoint(featured.price28g) : "Ask"}</strong>
            </div>
          </section>

          <section className={styles.ozRows} aria-label="Ounce options">
            {visible.map((flower) => (
              <div key={flower.sku} className={styles.ozRow}>
                <div>
                  <strong>{flower.name}</strong>
                  <span>
                    {formatType(flower.type)} {flower.thc ? `THC ${flower.thc}` : ""}
                  </span>
                </div>
                <b>{flower.price28g ? formatPricePoint(flower.price28g) : "Ask"}</b>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <div className={styles.emptyBoard}>Call for current ounce menu</div>
      )}
    </article>
  );
}

function AddOnsCard({ items, tick }: { items: ItemProduct[]; tick: number }) {
  const featured = items.length ? items[tick % items.length] : undefined;
  const visible = rotateList(items, tick + 1, 9);

  return (
    <aside className={styles.addOnsCard} aria-label="Add ons menu">
      <header className={styles.addOnsHead}>
        <span>Add Ons</span>
        <strong>Quick Picks</strong>
      </header>

      {featured ? (
        <section className={styles.addOnFeature}>
          <div className={styles.addOnImageFrame}>
            <img src={getProductImage(featured)} alt={featured.name} />
            {featured.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
          </div>
          <div>
            <small>{getItemCategoryLabel(featured.category)}</small>
            <h2>{featured.name}</h2>
            <p>
              {formatType(featured.type)} {formatPotency(featured.thc) ? `THC ${formatPotency(featured.thc)}` : ""}
            </p>
            <strong>{formatItemPrice(featured.price) || "Ask"}</strong>
          </div>
        </section>
      ) : null}

      <div className={styles.addOnRows}>
        <div className={styles.addOnRowsHead}>
          <span>Item</span>
          <span>Price</span>
        </div>
        {visible.map((item) => {
          const potency = formatPotency(item.thc);
          return (
            <div key={`${item.sku}-${item.slug}`} className={styles.addOnRow}>
              <img src={getProductImage(item)} alt="" />
              <div>
                <strong>{item.name}</strong>
                <span>
                  {getItemCategoryLabel(item.category)}{potency ? ` / THC ${potency}` : ""}
                </span>
              </div>
              <b>{formatItemPrice(item.price) || "Ask"}</b>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default function FortYorkTvPage() {
  const [flowers, setFlowers] = useState<FlowerProduct[]>(allFlowers);
  const [items, setItems] = useState<ItemProduct[]>(allItems);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [flowerRes, itemRes] = await Promise.all([
          fetch("/api/tv-data?type=flowers"),
          fetch("/api/tv-data?type=items"),
        ]);
        const [flowerData, itemData] = await Promise.all([flowerRes.json(), itemRes.json()]);
        if (!active) return;
        if (Array.isArray(flowerData) && flowerData.length > 0) {
          setFlowers(flowerData);
        }
        if (Array.isArray(itemData) && itemData.length > 0) {
          setItems(itemData);
        }
        setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch {
        if (active) setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    }

    load();
    const refresh = window.setInterval(load, 5 * 60 * 1000);
    const rotate = window.setInterval(() => setTick((value) => value + 1), 5000);

    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(rotate);
    };
  }, []);

  const grouped = useMemo(() => groupByTier(flowers), [flowers]);
  const ozFlowers = useMemo(() => getOzFlowers(flowers), [flowers]);
  const addOnItems = useMemo(() => getAddOnItems(items), [items]);

  return (
    <main className={styles.screen}>
      <div className={styles.canvas}>
        <header className={styles.header}>
          <div className={styles.brandLockup}>
            <img src="/brand/fort-york-icon.png" alt="" />
            <div>
              <span className={styles.eyebrow}>Flower Menu Board</span>
              <h1>{STORE_INFO.name}</h1>
            </div>
          </div>
          <div className={styles.storeMeta}>
            <div>
              <span>Location</span>
              <strong>{STORE_INFO.shortAddress}</strong>
            </div>
            <div>
              <span>Call</span>
              <strong>{STORE_INFO.phone}</strong>
            </div>
            <div>
              <span>Open</span>
              <strong>{STORE_INFO.hours}</strong>
            </div>
          </div>
        </header>

        <nav className={styles.tierRibbon} aria-label="Flower tier pricing">
          {FLOWER_TIER_ORDER.map((tier) => {
            const detail = getTierDetail(tier);
            return (
              <span key={tier} style={{ "--tier-color": detail.accent } as CSSProperties}>
                <b>{detail.name}</b>
                <small>{unitLabel(detail.unitPrice)}</small>
              </span>
            );
          })}
        </nav>

        <section className={styles.stage} aria-label="Fort York flower tiers and specials">
          <TierMenuCard tier="EXOTIC" products={grouped.EXOTIC || []} tick={tick} className={styles.cardExotic} />
          <TierMenuCard tier="PREMIUM" products={grouped.PREMIUM || []} tick={tick + 1} className={styles.cardPremium} />
          <TierMenuCard tier="AAA+" products={grouped["AAA+"] || []} tick={tick + 2} className={styles.cardAaa} />
          <TierMenuCard tier="AA" products={grouped.AA || []} tick={tick + 3} className={styles.cardAa} />
          <TierMenuCard tier="BUDGET" products={grouped.BUDGET || []} tick={tick + 4} className={styles.cardBudget} />
          <OzMenuCard flowers={ozFlowers} tick={tick + 5} />
          <AddOnsCard items={addOnItems} tick={tick + 6} />
        </section>

        <footer className={styles.footerRail}>
          <strong>Top tiers show total grams: 3g Total and 6g Total</strong>
          <span>Flower / OZ / Pre-Rolls / Vapes / Edibles / Concentrates / Accessories</span>
          <small>Updated {loadedAt || "--"}</small>
        </footer>
      </div>
      <TvPromoTakeover
        src="https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/buy_3g_get_3g_free_6g_total.webp"
        alt="Fort York Cannabis buy 3 grams and get 3 grams free, 6 grams total promotion"
      />
    </main>
  );
}

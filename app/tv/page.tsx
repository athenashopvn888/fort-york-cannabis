"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./tv.module.css";
import {
  FLOWER_TIER_ORDER,
  STORE_INFO,
  allFlowers,
  formatPricePoint,
  formatType,
  getFlowerEffects,
  getFlowerPriceRows,
  getProductImage,
  getTierDetail,
  isTopBundleTier,
  normalizeTier,
  type FlowerProduct,
} from "../lib/products";

const MAX_ROWS = 5;

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

function TierMenuCard({ tier, products, tick }: { tier: string; products: FlowerProduct[]; tick: number }) {
  const detail = getTierDetail(tier);
  const featured = products.length ? products[tick % products.length] : undefined;
  const visible = rotateList(products, tick, MAX_ROWS);
  const isBundleTier = isTopBundleTier(tier);
  const featuredRows = featured ? getFlowerPriceRows(featured, "tv").slice(0, 3) : [];
  const effects = featured ? getFlowerEffects(featured) : [];

  return (
    <article className={styles.tierCard} style={{ "--tier-color": detail.accent } as CSSProperties}>
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

export default function FortYorkTvPage() {
  const [flowers, setFlowers] = useState<FlowerProduct[]>(allFlowers);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const flowerRes = await fetch("/api/tv-data?type=flowers");
        const flowerData = await flowerRes.json();
        if (!active) return;
        if (Array.isArray(flowerData) && flowerData.length > 0) {
          setFlowers(flowerData);
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

  return (
    <main className={styles.screen}>
      <div className={styles.canvas}>
        <header className={styles.header}>
          <div className={styles.brandLockup}>
            <img src="/brand/fort-york-icon.svg" alt="" />
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

        <section className={styles.stage} aria-label="Fort York flower tiers">
          {FLOWER_TIER_ORDER.map((tier, index) => (
            <TierMenuCard key={tier} tier={tier} products={grouped[tier] || []} tick={tick + index} />
          ))}
        </section>

        <footer className={styles.footerRail}>
          <strong>Top tiers show total grams: 3g Total and 6g Total</strong>
          <span>Flower / Pre-Rolls / Vapes / Edibles / Concentrates / Accessories</span>
          <small>Updated {loadedAt || "--"}</small>
        </footer>
      </div>
    </main>
  );
}

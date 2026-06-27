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
  normalizeTier,
  type FlowerProduct,
} from "../lib/products";

const MAX_ROWS = 8;

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

function PriceCell({ product, compact = false }: { product: FlowerProduct; compact?: boolean }) {
  const rows = getFlowerPriceRows(product).slice(0, compact ? 2 : 4);
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
  return <span className={`${styles.typeTag} ${styles[type] || ""}`}>{formatType(type)}</span>;
}

function FeatureCard({ tier, products, tick }: { tier: string; products: FlowerProduct[]; tick: number }) {
  const detail = getTierDetail(tier);
  const product = products.length ? products[tick % products.length] : undefined;

  return (
    <article className={styles.featureCard} style={{ "--tier-color": detail.accent } as CSSProperties}>
      <div className={styles.featureTier}>
        <span>{detail.name}</span>
        <strong>{products.length} strains</strong>
      </div>
      {product ? (
        <>
          <div className={styles.featureImageWrap}>
            <img src={getProductImage(product)} alt={product.name} />
            {product.isSale ? <span className={styles.saleBadge}>Sale</span> : null}
            {product.isHot ? <span className={styles.hotBadge}>Top Pick</span> : null}
            {product.thc ? <span className={styles.thcBadge}>{product.thc}</span> : null}
          </div>
          <div className={styles.featureCopy}>
            <TypeTag type={product.type} />
            <h2>{product.name}</h2>
            <p>{getFlowerEffects(product).join(" / ")}</p>
            <small>SKU {product.sku}</small>
            <PriceCell product={product} />
          </div>
        </>
      ) : (
        <div className={styles.emptyBoard}>Call for current {detail.name} menu</div>
      )}
    </article>
  );
}

function TierBoard({ tier, products, tick }: { tier: string; products: FlowerProduct[]; tick: number }) {
  const detail = getTierDetail(tier);
  const visible = rotateList(products, tick, MAX_ROWS);

  return (
    <article className={styles.tierCard} style={{ "--tier-color": detail.accent } as CSSProperties}>
      <div className={styles.tierHead}>
        <div>
          <span>{detail.name}</span>
          <small>{detail.description}</small>
        </div>
        <strong>{products.length} strains</strong>
      </div>
      <div className={styles.productRows}>
        {visible.map((flower) => (
          <div className={styles.productRow} key={flower.sku}>
            <img src={getProductImage(flower)} alt="" />
            <div className={styles.rowMain}>
              <strong>{flower.name}</strong>
              <span>
                <TypeTag type={flower.type} />
                {flower.thc ? <b>THC {flower.thc}</b> : null}
                {flower.isSale ? <em>Sale</em> : null}
              </span>
            </div>
            <PriceCell product={flower} compact />
          </div>
        ))}
      </div>
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
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Flower Menu Board</span>
          <h1>{STORE_INFO.name}</h1>
        </div>
        <div className={styles.storeMeta}>
          <strong>{STORE_INFO.shortAddress}</strong>
          <span>{STORE_INFO.phone}</span>
          <span>Open {STORE_INFO.hours}</span>
        </div>
      </header>

      <section className={styles.dealRail} aria-label="Flower bundle pricing">
        <strong>3G TOTAL: Buy 2g Get 1g Free</strong>
        <strong>6G TOTAL: Buy 3g Get 3g Free</strong>
        <span>Top-tier bundle labels show total grams.</span>
      </section>

      <section className={styles.heroPanel} aria-label="Featured flower by tier">
        {FLOWER_TIER_ORDER.map((tier, index) => (
          <FeatureCard key={tier} tier={tier} products={grouped[tier] || []} tick={tick + index} />
        ))}
      </section>

      <section className={styles.tierGrid}>
        {FLOWER_TIER_ORDER.map((tier, index) => (
          <TierBoard key={tier} tier={tier} products={grouped[tier] || []} tick={tick + index} />
        ))}
      </section>

      <footer className={styles.footerRail}>
        <strong>Flower / Pre-Rolls / Vapes / Edibles / Concentrates / Accessories</strong>
        <small>Updated {loadedAt || "--"}</small>
      </footer>
    </main>
  );
}

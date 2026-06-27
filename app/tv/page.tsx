"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./tv.module.css";

type PricePoint = { regular?: number; sale?: number | null };
type Flower = {
  sku: string;
  name: string;
  slug: string;
  type?: string;
  tier?: string;
  thc?: string;
  image: string;
  price3g?: PricePoint | null;
  price5g?: PricePoint | null;
  price14g?: PricePoint | null;
  price28g?: PricePoint | null;
};

const TIERS = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"];
const STORE = {
  name: "FORT YORK CANNABIS",
  address: "38 FORT YORK BLVD",
  phone: "437-872-8446",
  hours: "11AM-2AM",
};

function displayPrice(product: Flower) {
  const points = [product.price3g, product.price5g, product.price14g, product.price28g]
    .flatMap((price) => (price ? [price.sale ?? price.regular] : []))
    .filter((value): value is number => typeof value === "number");
  return points.length ? `FROM $${Math.min(...points)}` : "PRICE IN STORE";
}

function groupByTier(flowers: Flower[]) {
  return flowers.reduce<Record<string, Flower[]>>((groups, flower) => {
    const tier = (flower.tier || "BUDGET").toUpperCase();
    groups[tier] = groups[tier] || [];
    groups[tier].push(flower);
    return groups;
  }, {});
}

function rotateList<T>(items: T[], offset: number, limit: number) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(limit, items.length) }, (_, index) => items[(offset + index) % items.length]);
}

export default function FortYorkTvPage() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const flowerRes = await fetch("/api/tv-data?type=flowers");
      const flowerData = await flowerRes.json();
      if (!active) return;
      setFlowers(flowerData);
      setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
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
          <h1>{STORE.name}</h1>
        </div>
        <div className={styles.storeMeta}>
          <strong>{STORE.address}</strong>
          <span>{STORE.phone}</span>
          <span>OPEN {STORE.hours}</span>
        </div>
      </header>

      <section className={styles.heroPanel} aria-label="Featured flower by tier">
        {TIERS.map((tier, index) => {
          const products = grouped[tier] || [];
          const product = products.length ? products[(tick + index) % products.length] : undefined;
          return (
            <article className={styles.featureCard} key={tier}>
              <span>{tier}</span>
              {product ? (
                <>
                  <img src={product.image} alt={product.name} />
                  <strong>{product.name}</strong>
                  <small>{[product.type, product.thc ? `THC ${product.thc}` : ""].filter(Boolean).join(" / ")}</small>
                  <b>{displayPrice(product)}</b>
                </>
              ) : (
                <strong>More strains soon</strong>
              )}
            </article>
          );
        })}
      </section>

      <section className={styles.tierGrid}>
        {TIERS.map((tier, index) => {
          const tierProducts = rotateList(grouped[tier] || [], tick + index, 7);
          return (
            <article className={styles.tierCard} key={tier}>
              <div className={styles.tierHead}>
                <span>{tier}</span>
                <strong>{(grouped[tier] || []).length} strains</strong>
              </div>
              <div className={styles.productRows}>
                {tierProducts.map((flower) => (
                  <div className={styles.productRow} key={flower.sku}>
                    <img src={flower.image} alt="" />
                    <div>
                      <strong>{flower.name}</strong>
                      <span>{[flower.type, flower.thc ? `THC ${flower.thc}` : ""].filter(Boolean).join(" / ")}</span>
                    </div>
                    <b>{displayPrice(flower)}</b>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <footer className={styles.footerRail}>
        <strong>FLOWER / PRE-ROLLS / VAPES / EDIBLES / CONCENTRATES / ACCESSORIES</strong>
        <small>Updated {loadedAt || "--"}</small>
      </footer>
    </main>
  );
}

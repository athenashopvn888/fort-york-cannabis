"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./tv.module.css";

type PricePoint = { regular?: number; sale?: number };
type Flower = {
  sku: string;
  name: string;
  slug: string;
  type?: string;
  tier?: string;
  thc?: string;
  image: string;
  price1g?: PricePoint;
  price3g?: PricePoint;
  price5g?: PricePoint;
  price14g?: PricePoint;
  price28g?: PricePoint;
};

type Item = {
  sku: string;
  name: string;
  category?: string;
  thc?: string;
  price?: string;
  image: string;
};

const TIERS = ["EXOTIC", "PREMIUM", "AAA+", "AA", "BUDGET"];
const STORE = {
  name: "FORT YORK CANNABIS",
  address: "38 Fort York Blvd",
  city: "Toronto",
  phone: "437-872-8446",
  hours: "11AM-2AM",
};

function bestPrice(product: Flower) {
  const points = [product.price1g, product.price3g, product.price5g, product.price14g, product.price28g]
    .flatMap((price) => (price ? [price.sale ?? price.regular] : []))
    .filter((value): value is number => typeof value === "number");
  return points.length ? `from $${Math.min(...points)}` : "price pending";
}

function groupByTier(flowers: Flower[]) {
  return flowers.reduce<Record<string, Flower[]>>((groups, flower) => {
    const tier = flower.tier || "PREVIEW";
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
  const [items, setItems] = useState<Item[]>([]);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      const [flowerRes, itemRes] = await Promise.all([fetch("/api/tv-data?type=flowers"), fetch("/api/tv-data?type=items")]);
      const [flowerData, itemData] = await Promise.all([flowerRes.json(), itemRes.json()]);
      if (!active) return;
      setFlowers(flowerData);
      setItems(itemData);
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
  const featured = rotateList(flowers, tick, 5);
  const addOns = items.filter((item) => ["PREROLLS", "ADD ONS", "VAPES", "EDIBLES"].includes(item.category || "")).slice(0, 8);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Preview menu board</span>
          <h1>{STORE.name}</h1>
        </div>
        <div className={styles.storeMeta}>
          <strong>{STORE.address}</strong>
          <span>{STORE.city}</span>
          <span>{STORE.phone}</span>
          <span>{STORE.hours}</span>
        </div>
      </header>

      <section className={styles.heroPanel}>
        <div>
          <span className={styles.kicker}>Flower tiers</span>
          <h2>Toronto waterfront preview stock</h2>
          <p>Temporary stock for owner review. Final Fort York inventory and ordering require approval.</p>
        </div>
        <div className={styles.featureStrip}>
          {featured.map((flower) => (
            <article key={flower.sku}>
              <img src={flower.image} alt={flower.name} />
              <span>{flower.tier}</span>
              <strong>{flower.name}</strong>
              <small>{flower.thc ? `THC ${flower.thc}` : flower.type}</small>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.tierGrid}>
        {TIERS.map((tier, index) => {
          const tierProducts = rotateList(grouped[tier] || [], tick + index, 6);
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
                    <b>{bestPrice(flower)}</b>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <footer className={styles.footerRail}>
        <div>
          <strong>Also previewing</strong>
          <span>{addOns.map((item) => item.name).join("  /  ")}</span>
        </div>
        <small>Loaded {loadedAt || "--"} / local preview only</small>
      </footer>
    </main>
  );
}

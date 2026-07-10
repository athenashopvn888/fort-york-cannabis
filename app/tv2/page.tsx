"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import styles from "./tv2.module.css";
import {
  STORE_INFO,
  allItems,
  formatItemPrice,
  formatPercentLike,
  formatType,
  getItemCategoryLabel,
  getItemDetailChips,
  getItemEffects,
  getProductImage,
  type ItemProduct,
} from "../lib/products";

type CategoryBoard = {
  id: string;
  label: string;
  subtitle: string;
  accent: string;
  categories: string[];
};

const BOARDS: CategoryBoard[] = [
  { id: "PREROLLS", label: "Pre-Rolls", subtitle: "Ready-to-go rolls", accent: "#b5452f", categories: ["PREROLLS"] },
  { id: "VAPES", label: "Vapes", subtitle: "Pens and disposables", accent: "#087e8b", categories: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"] },
  { id: "EDIBLES", label: "Edibles", subtitle: "Gummies, chocolates, drinks", accent: "#7c5cbb", categories: ["EDIBLES"] },
  { id: "CONCENTRATES", label: "Concentrates", subtitle: "Hash, resin, diamonds", accent: "#a6652d", categories: ["CONCENTRATES"] },
  { id: "ACCESSORIES", label: "Accessories", subtitle: "Add-ons and essentials", accent: "#288b5b", categories: ["ADD ONS", "ACCESSORIES"] },
  { id: "MORE", label: "Cigarettes / Magic Stuff", subtitle: "Other add-ons", accent: "#5f6f7a", categories: ["CIGARETTES", "MAGIC", "MAGIC & OTHERS"] },
];

function rotateList<T>(items: T[], offset: number, limit: number) {
  if (!items.length) return [];
  return Array.from({ length: Math.min(limit, items.length) }, (_, index) => items[(offset + index) % items.length]);
}

function getBoardItems(items: ItemProduct[], board: CategoryBoard) {
  const keys = new Set(board.categories.map((category) => category.toUpperCase()));
  return items.filter((item) => keys.has((item.category || "").toUpperCase()));
}

function getItemKey(item: ItemProduct) {
  return `${item.sku || "item"}-${item.slug}`;
}

function getItemFamily(item: ItemProduct) {
  const name = item.name.toUpperCase();
  if (name.includes("GRABBA")) return "GRABBA";

  return name
    .replace(/[^A-Z0-9\s]/g, " ")
    .replace(/\b(X\d+|AVAILABLE|NEW)\b/g, " ")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .join(" ") || getItemKey(item);
}

function getVisibleRows(items: ItemProduct[], featured: ItemProduct | undefined, tick: number, limit: number) {
  const featuredKey = featured ? getItemKey(featured) : "";
  const seenFamilies = new Set(featured ? [getItemFamily(featured)] : []);
  const candidates = rotateList(items, tick + 1, items.length).filter((item) => getItemKey(item) !== featuredKey);
  const rows: ItemProduct[] = [];
  const deferred: ItemProduct[] = [];

  for (const item of candidates) {
    const family = getItemFamily(item);
    if (!seenFamilies.has(family)) {
      rows.push(item);
      seenFamilies.add(family);
    } else {
      deferred.push(item);
    }

    if (rows.length >= limit) return rows;
  }

  return [...rows, ...deferred].slice(0, limit);
}

function ItemMeta({ item }: { item: ItemProduct }) {
  const chips = getItemDetailChips(item)
    .filter((chip) => !chip.startsWith("SKU "))
    .slice(0, 4);

  return (
    <div className={styles.metaChips}>
      {chips.map((chip) => (
        <span key={chip}>{chip}</span>
      ))}
    </div>
  );
}

function FeaturedItem({ item, accent }: { item?: ItemProduct; accent: string }) {
  if (!item) {
    return <div className={styles.emptyFeature}>Call for current menu</div>;
  }

  return (
    <div className={styles.feature} style={{ "--accent": accent } as CSSProperties}>
      <div className={styles.featureImage}>
        <img src={getProductImage(item)} alt={item.name} />
        {item.promoImage || item.isSale ? <span>Feature</span> : null}
      </div>
      <div className={styles.featureCopy}>
        <small>{getItemCategoryLabel(item.category)}</small>
        <h3>{item.name}</h3>
        <ItemMeta item={item} />
        <p>{getItemEffects(item).join(" / ")}</p>
        <strong>{formatItemPrice(item.price) || "Price in store"}</strong>
      </div>
    </div>
  );
}

function Board({ board, items, tick }: { board: CategoryBoard; items: ItemProduct[]; tick: number }) {
  const featured = items.length ? items[tick % items.length] : undefined;
  const rows = getVisibleRows(items, featured, tick, 6);

  return (
    <article className={styles.board} style={{ "--accent": board.accent } as CSSProperties}>
      <div className={styles.boardHeader}>
        <div>
          <span>{board.subtitle}</span>
          <h2>{board.label}</h2>
        </div>
        <strong>{items.length} items</strong>
      </div>
      <FeaturedItem item={featured} accent={board.accent} />
      <div className={styles.itemRows}>
        {rows.map((item) => (
          <div className={styles.itemRow} key={getItemKey(item)}>
            <img src={getProductImage(item)} alt="" />
            <div>
              <strong>{item.name}</strong>
              <span>
                {formatType(item.type) ? <b>{formatType(item.type)}</b> : null}
                {item.thc ? <b>THC {formatPercentLike(item.thc)}</b> : null}
                {item.mg ? <b>{item.mg}</b> : null}
              </span>
            </div>
            <em>{formatItemPrice(item.price) || "Price in store"}</em>
          </div>
        ))}
      </div>
    </article>
  );
}

export default function FortYorkTv2Page() {
  const [items, setItems] = useState<ItemProduct[]>(allItems);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/tv-data?type=items");
        const data = await res.json();
        if (!active) return;
        if (Array.isArray(data) && data.length > 0) {
          setItems(data);
        }
        setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      } catch {
        if (active) setLoadedAt(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      }
    }

    load();
    const refresh = window.setInterval(load, 5 * 60 * 1000);
    const rotate = window.setInterval(() => setTick((value) => value + 1), 6000);

    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(rotate);
    };
  }, []);

  const grouped = useMemo(() => {
    return BOARDS.map((board, index) => ({
      ...board,
      products: getBoardItems(items, board),
      offset: tick + index,
    }));
  }, [items, tick]);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div>
          <span>Secondary Menu Board</span>
          <h1>Fort York Menu</h1>
        </div>
        <aside>
          <strong>{STORE_INFO.name}</strong>
          <p>{STORE_INFO.shortAddress} / {STORE_INFO.phone} / Open {STORE_INFO.hours}</p>
        </aside>
      </header>

      <section className={styles.categoryGrid}>
        {grouped.map((board) => (
          <Board key={board.id} board={board} items={board.products} tick={board.offset} />
        ))}
      </section>

      <footer className={styles.footer}>
        <strong>Browse Menu</strong>
        <span>Pre-rolls / Vapes / Edibles / Concentrates / Accessories / Cigarettes / Magic Stuff</span>
        <small>Updated {loadedAt || "--"}</small>
      </footer>
    </main>
  );
}

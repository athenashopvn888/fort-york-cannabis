"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import TvPromoTakeover from "../components/TvPromoTakeover";
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
  { id: "PREROLLS", label: "Infused Preroll", subtitle: "Infused ready-to-go rolls", accent: "#b5452f", categories: ["PREROLLS"] },
  { id: "VAPES", label: "Vapes", subtitle: "Pens and disposables", accent: "#087e8b", categories: ["VAPE PENS", "VAPE DISPOSABLE", "THC VAPE", "VAPES"] },
  { id: "EDIBLES", label: "Edibles", subtitle: "Gummies, chocolates, drinks", accent: "#7c5cbb", categories: ["EDIBLES"] },
  { id: "CONCENTRATES", label: "Concentrates", subtitle: "Hash, resin, diamonds", accent: "#a6652d", categories: ["CONCENTRATES"] },
  { id: "PREROLL_SINGLES", label: "Pre Rolls", subtitle: "Single rolls and add-ons", accent: "#288b5b", categories: ["ADD ONS", "ACCESSORIES"] },
];

const PROMO_IMAGES = [
  { src: "/promos/tv2-50-oz-offer-19plus.webp", alt: "Fort York Cannabis 50 dollar ounce offer" },
  { src: "/promos/tv2-flower-pricing-19plus.webp", alt: "Fort York Cannabis flower pricing" },
  { src: "/promos/tv2-edibles-vape-pens-19plus.webp", alt: "Fort York Cannabis edibles and vape pens" },
];

const TAKEOVER_PROMOS = [
  {
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/buy_2g_get_1g_free_3g_total.webp",
    alt: "Fort York Cannabis buy 2 grams and get 1 gram free, 3 grams total promotion",
  },
  {
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/buy_3g_get_3g_free_6g_total.webp",
    alt: "Fort York Cannabis buy 3 grams and get 3 grams free, 6 grams total promotion",
  },
] as const;

const FOOTER_MESSAGES = [
  {
    label: "Browse Menu",
    text: "Pre Rolls / Infused Preroll / Vapes / Edibles / Concentrates / Specials",
  },
  {
    label: "Store Policy",
    text: "ALL SALES ARE FINAL - NO REFUND, NO EXCHANGE",
  },
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

function PromoBoard({ tick }: { tick: number }) {
  const promo = PROMO_IMAGES[tick % PROMO_IMAGES.length];

  return (
    <article className={styles.promoBoard} aria-label="Fort York Cannabis promotions">
      <img src={promo.src} alt={promo.alt} />
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
  const boardById = new Map(grouped.map((board) => [board.id, board]));
  const topBoards = ["PREROLL_SINGLES", "VAPES", "EDIBLES"]
    .map((id) => boardById.get(id))
    .filter((board): board is (typeof grouped)[number] => Boolean(board));
  const concentratesBoard = boardById.get("CONCENTRATES");
  const infusedPrerollBoard = boardById.get("PREROLLS");
  const footerMessage = FOOTER_MESSAGES[tick % FOOTER_MESSAGES.length];

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div>
          <span>Secondary Menu Board</span>
          <h1>Fort York Menu</h1>
        </div>
        <aside>
          <strong>{STORE_INFO.name}</strong>
          <p>{STORE_INFO.shortAddress} / Open {STORE_INFO.hours}</p>
        </aside>
      </header>

      <section className={styles.categoryGrid}>
        {topBoards.map((board) => (
          <Board key={board.id} board={board} items={board.products} tick={board.offset} />
        ))}
        {concentratesBoard ? (
          <Board key={concentratesBoard.id} board={concentratesBoard} items={concentratesBoard.products} tick={concentratesBoard.offset} />
        ) : null}
        <PromoBoard tick={tick} />
        {infusedPrerollBoard ? (
          <Board key={infusedPrerollBoard.id} board={infusedPrerollBoard} items={infusedPrerollBoard.products} tick={infusedPrerollBoard.offset} />
        ) : null}
      </section>

      <footer className={styles.footer}>
        <strong>{footerMessage.label}</strong>
        <span>{footerMessage.text}</span>
        <small>Updated {loadedAt || "--"}</small>
      </footer>
      <TvPromoTakeover promos={TAKEOVER_PROMOS} />
    </main>
  );
}

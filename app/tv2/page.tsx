"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TvPromoTakeover from "../components/TvPromoTakeover";
import styles from "./tv2.module.css";
import { isCigaretteDealSku, isCigaretteMixAndMatchSku } from "../lib/cigaretteDeals.mjs";
import { getTv2DaytimePromo, isTv2Daytime } from "./daytimePromos.mjs";
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
  compactLabel?: boolean;
};

const BOARDS: CategoryBoard[] = [
  { id: "PREROLLS", label: "Vape Disposable\nInfused Prerolls", subtitle: "Disposable vapes and infused pre-rolls", accent: "#b5452f", categories: ["VAPE DISPOSABLE", "PREROLLS"], compactLabel: true },
  { id: "NICOTINE_VAPES", label: "Nicotine Vapes", subtitle: "Vape pens", accent: "#087e8b", categories: ["VAPE PENS"] },
  { id: "EDIBLES", label: "Edibles", subtitle: "Gummies, chocolates, drinks", accent: "#7c5cbb", categories: ["EDIBLES"] },
  { id: "CONCENTRATES", label: "Concentrates", subtitle: "Hash, resin, diamonds", accent: "#a6652d", categories: ["CONCENTRATES"] },
  { id: "PREROLL_SINGLES", label: "Pre Rolls", subtitle: "Single rolls and add-ons", accent: "#288b5b", categories: ["ADD ONS", "ACCESSORIES"] },
  { id: "CIGARETTES", label: "Cigarettes", subtitle: "Current cigarette selection", accent: "#8a5b2a", categories: ["CIGARETTES"] },
];

const TAKEOVER_PROMOS = [
  {
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/buy_2g_get_1g_free_3g_total.webp",
    alt: "Fort York Cannabis buy 2 grams and get 1 gram free, 3 grams total promotion",
  },
] as const;

const FOOTER_MESSAGES = [
  {
    label: "Browse Menu",
    text: "Pre Rolls / Infused Preroll / Vape Disposables / Nicotine Vapes / Cigarettes / Edibles / Concentrates",
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
  const categoryPriority = new Map(board.categories.map((category, index) => [category.toUpperCase(), index]));
  return items
    .filter((item) => categoryPriority.has((item.category || "").toUpperCase()))
    .sort((left, right) => {
      const leftPriority = categoryPriority.get((left.category || "").toUpperCase()) ?? board.categories.length;
      const rightPriority = categoryPriority.get((right.category || "").toUpperCase()) ?? board.categories.length;
      return leftPriority - rightPriority;
    });
}

function getItemKey(item: ItemProduct) {
  return `${item.sku || "item"}-${item.slug}`;
}

function isCigaretteItem(item: ItemProduct) {
  return (item.category || "").toUpperCase() === "CIGARETTES";
}

function isCigaretteDealItem(item: ItemProduct) {
  return isCigaretteItem(item) && isCigaretteDealSku(item.sku);
}

function getTv2DisplayPrice(item: ItemProduct, showCigaretteDeal: boolean) {
  const price = formatItemPrice(item.price) || "Price in store";
  if (!isCigaretteDealItem(item)) return price;
  return showCigaretteDeal ? "2 PACK $5" : "$25 CARTON";
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
  const chips = [
    ...(isCigaretteMixAndMatchSku(item.sku) ? ["MIX AND MATCH"] : []),
    ...getItemDetailChips(item).filter((chip) => !chip.startsWith("SKU ")),
  ]
    .slice(0, 4);

  return (
    <div className={styles.metaChips}>
      {chips.map((chip) => (
        <span key={chip}>{chip}</span>
      ))}
    </div>
  );
}

function FeaturedItem({ item, accent, showCigaretteDeal }: { item?: ItemProduct; accent: string; showCigaretteDeal: boolean }) {
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
        <strong className={isCigaretteDealItem(item) && showCigaretteDeal ? styles.cigarettePromoPrice : undefined}>
          {getTv2DisplayPrice(item, showCigaretteDeal)}
        </strong>
      </div>
    </div>
  );
}

function Board({ board, items, tick }: { board: CategoryBoard; items: ItemProduct[]; tick: number }) {
  const featured = items.length ? items[tick % items.length] : undefined;
  const rows = getVisibleRows(items, featured, tick, 6);
  const showCigaretteDeal = board.id === "CIGARETTES" && tick % 2 === 1;

  return (
    <article className={styles.board} style={{ "--accent": board.accent } as CSSProperties}>
      <div className={styles.boardHeader}>
        <div>
          <span>{board.subtitle}</span>
          <h2 className={board.compactLabel ? styles.compactBoardTitle : undefined}>{board.label}</h2>
        </div>
        <strong>{items.length} items</strong>
      </div>
      <FeaturedItem item={featured} accent={board.accent} showCigaretteDeal={showCigaretteDeal} />
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
            <em className={isCigaretteDealItem(item) && showCigaretteDeal ? styles.cigarettePromoPrice : undefined}>
              {getTv2DisplayPrice(item, showCigaretteDeal)}
            </em>
          </div>
        ))}
      </div>
    </article>
  );
}

function PromoBoard({ cardId, promo }: { cardId: string; promo: { src: string; alt: string } }) {
  return (
    <article className={styles.promoBoard} aria-label={promo.alt} data-promo-card={cardId}>
      <Image src={promo.src} alt={promo.alt} fill priority sizes="(min-width: 1300px) 33vw, 50vw" />
    </article>
  );
}

export default function FortYorkTv2Page() {
  const [items, setItems] = useState<ItemProduct[]>(allItems);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");
  const [daytime, setDaytime] = useState(false);

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
    const syncDaytime = () => setDaytime(isTv2Daytime());
    syncDaytime();
    const refresh = window.setInterval(load, 5 * 60 * 1000);
    const rotate = window.setInterval(() => setTick((value) => value + 1), 6000);
    const daytimeRefresh = window.setInterval(syncDaytime, 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(rotate);
      window.clearInterval(daytimeRefresh);
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
  const topBoards = ["PREROLL_SINGLES", "NICOTINE_VAPES", "EDIBLES"]
    .map((id) => boardById.get(id))
    .filter((board): board is (typeof grouped)[number] => Boolean(board));
  const concentratesBoard = boardById.get("CONCENTRATES");
  const infusedPrerollBoard = boardById.get("PREROLLS");
  const cigarettesBoard = boardById.get("CIGARETTES");
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
        {topBoards.map((board) => {
          const promo = getTv2DaytimePromo(board.id, daytime);
          return promo ? (
            <PromoBoard key={board.id} cardId={board.id} promo={promo} />
          ) : (
            <Board key={board.id} board={board} items={board.products} tick={board.offset} />
          );
        })}
        {concentratesBoard ? (
          <Board key={concentratesBoard.id} board={concentratesBoard} items={concentratesBoard.products} tick={concentratesBoard.offset} />
        ) : null}
        {cigarettesBoard ? (() => {
          const promo = getTv2DaytimePromo(cigarettesBoard.id, daytime);
          return promo ? (
            <PromoBoard key={cigarettesBoard.id} cardId={cigarettesBoard.id} promo={promo} />
          ) : (
            <Board
              key={cigarettesBoard.id}
              board={cigarettesBoard}
              items={cigarettesBoard.products}
              tick={cigarettesBoard.offset}
            />
          );
        })() : null}
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

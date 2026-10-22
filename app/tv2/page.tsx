"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import TvPromoTakeover from "../components/TvPromoTakeover";
import FleetTvTakeover from "../components/fleet/FleetTvTakeover";
import { useFleetTvManifest } from "../components/fleet/useFleetTvManifest";
import { pickTv2Sheet } from "../lib/fleet/tv";
import styles from "./tv2.module.css";
import { CIGARETTE_FLASH_MESSAGE, isCigaretteFlashWindow } from "../tv/flashMessages";
import HiringRibbon from "../components/HiringRibbon";
import { tvHiring } from "../lib/tvHiring";
import { isCigaretteDealSku, isCigaretteMixAndMatchSku } from "../lib/cigaretteDeals.mjs";
import { getTv2DaytimePromo, isCigaretteOfferVisible, isTv2Daytime } from "./daytimePromos.mjs";
import { SHOW_CIGARETTES, cigaretteSafeContent, isPreservedSmokeItem } from "../lib/siteConfig";
import { useCigaretteState } from "../components/CigaretteStateProvider";
import {
  STORE_INFO,
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

const BOARDS_RAW: CategoryBoard[] = [
  { id: "PREROLLS", label: "Vape Disposable\nInfused Prerolls", subtitle: "Disposable vapes and infused pre-rolls", accent: "#b5452f", categories: ["VAPE DISPOSABLE", "PREROLLS"], compactLabel: true },
  { id: "NICOTINE_VAPES", label: "Nicotine Vapes", subtitle: "Vape pens", accent: "#087e8b", categories: ["VAPE PENS"] },
  { id: "EDIBLES", label: "Edibles", subtitle: "Gummies, chocolates, drinks", accent: "#7c5cbb", categories: ["EDIBLES"] },
  { id: "CONCENTRATES", label: "Concentrates", subtitle: "Hash, resin, diamonds", accent: "#a6652d", categories: ["CONCENTRATES"] },
  { id: "PREROLL_SINGLES", label: "Pre Rolls", subtitle: "Single rolls and add-ons", accent: "#288b5b", categories: ["ADD ONS", "ACCESSORIES"] },
  { id: "CIGARETTES", label: "Cigarettes", subtitle: "Current cigarette selection", accent: "#8a5b2a", categories: ["CIGARETTES"] },
];
const BOARDS = SHOW_CIGARETTES
  ? BOARDS_RAW
  : BOARDS_RAW.filter((board) => board.id !== "CIGARETTES");

/** Sheet spot for each coded board. The infused-preroll board has no sheet spot. */
const TV2_SHEET_SPOT: Record<string, string> = {
  PREROLL_SINGLES: "PREROLLS_ADDONS",
  NICOTINE_VAPES: "VAPES",
  EDIBLES: "EDIBLES",
  CONCENTRATES: "CONCENTRATES",
  CIGARETTES: "CIGARETTES",
};

const TAKEOVER_PROMOS = [
  {
    src: "https://pub-eb3e1fe18a43477eabc885cfb791d97c.r2.dev/products/buy_2g_get_1g_free_3g_total.webp",
    alt: "Fort York Cannabis buy 2 grams and get 1 gram free, 3 grams total promotion",
  },
] as const;

const FOOTER_MESSAGES = cigaretteSafeContent([
  {
    label: "Browse Menu",
    text: "Pre Rolls / Infused Preroll / Vape Disposables / Nicotine Vapes / Cigarettes / Edibles / Concentrates",
  },
  {
    label: "Store Policy",
    text: "ALL SALES ARE FINAL - NO REFUND, NO EXCHANGE",
  },
]);

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

function Board({
  board,
  items,
  tick,
  offerOverlay = false,
}: {
  board: CategoryBoard;
  items: ItemProduct[];
  tick: number;
  offerOverlay?: boolean;
}) {
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
      {offerOverlay ? (
        <div className={styles.timedPromoOverlay} aria-label="Mix and Match 2 Pack $5 Cigarette Offer">
          <img src="/banners/2pack5cig.webp" alt="Mix and Match 2 Pack $5 Cigarette Offer" />
        </div>
      ) : null}
    </article>
  );
}

function SheetPromoCard({
  spot,
  sheet,
  accent,
  onBroken,
}: {
  spot: string;
  sheet: { kind: "promo" | "off"; image: string; alt: string };
  accent: string;
  onBroken: (kind: "promo" | "off") => void;
}) {
  const markBroken = () => onBroken(sheet.kind);
  return (
    <article
      className={styles.promoBoard}
      aria-label={sheet.alt}
      data-fleet-tv-card={spot}
      data-fleet-tv-kind={sheet.kind}
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className={styles.boardHeader}>
        <h2>{sheet.kind === "promo" ? "PROMO" : sheet.alt}</h2>
      </div>
      <div className={styles.promoViewport}>
        <img
          className={styles.promoImg}
          src={sheet.image}
          alt={sheet.alt}
          referrerPolicy="no-referrer"
          ref={(node) => {
            if (node?.complete && node.naturalWidth === 0) markBroken();
          }}
          onError={markBroken}
        />
      </div>
    </article>
  );
}

function PromoBoard({
  cardId,
  promo,
  accent,
}: {
  cardId: string;
  promo: { src: string; fallbackSrc?: string; alt: string };
  accent: string;
}) {
  return (
    <article
      className={styles.promoBoard}
      aria-label={promo.alt}
      data-promo-card={cardId}
      style={{ "--accent": accent } as CSSProperties}
    >
      <div className={styles.boardHeader}>
        <h2>PROMO</h2>
      </div>
      <div className={styles.promoViewport}>
        <img
          className={styles.promoImg}
          src={promo.src}
          alt={promo.alt}
          referrerPolicy="no-referrer"
          onError={(event) => {
            const target = event.currentTarget;
            if (promo.fallbackSrc && target.dataset.fallbackApplied !== "true") {
              target.dataset.fallbackApplied = "true";
              target.src = promo.fallbackSrc;
            }
          }}
        />
      </div>
    </article>
  );
}

export default function FortYorkTv2Page() {
  const tvOn = useCigaretteState().tv;
  const showCigs = SHOW_CIGARETTES && tvOn;
  const [items, setItems] = useState<ItemProduct[]>([]);
  const [tick, setTick] = useState(0);
  const [loadedAt, setLoadedAt] = useState("");
  const [daytime, setDaytime] = useState(false);
  const [cigaretteOfferVisible, setCigaretteOfferVisible] = useState(false);
  const [showCigaretteFlash, setShowCigaretteFlash] = useState(() => isCigaretteFlashWindow());
  const [sheetBroken, setSheetBroken] = useState<Record<string, { promo?: boolean; off?: boolean }>>({});
  const fleetTv = useFleetTvManifest();

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/tv-data?type=items");
        const data = await res.json();
        if (!active) return;
        if (Array.isArray(data)) {
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
    const flashRefresh = window.setInterval(() => setShowCigaretteFlash(isCigaretteFlashWindow()), 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(refresh);
      window.clearInterval(rotate);
      window.clearInterval(daytimeRefresh);
      window.clearInterval(flashRefresh);
    };
  }, []);

  useEffect(() => {
    const startedAt = performance.now();
    const updateOffer = () => {
      setCigaretteOfferVisible(
        isCigaretteOfferVisible(isTv2Daytime(), performance.now() - startedAt),
      );
    };
    const offerTimer = window.setInterval(updateOffer, 250);
    return () => window.clearInterval(offerTimer);
  }, []);

  const boards = showCigs ? BOARDS : BOARDS.filter((board) => board.id !== "CIGARETTES");
  const grouped = useMemo(() => {
    return boards.map((board, index) => ({
      ...board,
      products: (() => {
        const boardItems = getBoardItems(items, board);
        if (showCigs || board.id !== "PREROLL_SINGLES") return boardItems;
        const seen = new Set(boardItems.map(getItemKey));
        const preserved = items.filter((item) => isPreservedSmokeItem(item) && !seen.has(getItemKey(item)));
        return [...boardItems, ...preserved];
      })(),
      offset: tick + index,
    }));
  }, [boards, items, showCigs, tick]);
  const boardById = new Map(grouped.map((board) => [board.id, board]));
  const topBoards = ["PREROLL_SINGLES", "NICOTINE_VAPES", "EDIBLES"]
    .map((id) => boardById.get(id))
    .filter((board): board is (typeof grouped)[number] => Boolean(board));
  const concentratesBoard = boardById.get("CONCENTRATES");
  const infusedPrerollBoard = boardById.get("PREROLLS");
  const cigarettesBoard = boardById.get("CIGARETTES");
  // 08:00-16:59 Toronto: no cigarette or nicotine wording on screen.
  const baseFooterMessages = daytime
    ? FOOTER_MESSAGES.map((message) => ({
        ...message,
        text: message.text.replace(/ \/ Nicotine Vapes| \/ Cigarettes/g, ""),
      }))
    : FOOTER_MESSAGES;
  const footerMessages = showCigaretteFlash && showCigs && !daytime
    ? [...baseFooterMessages, { label: "Cigarettes", text: CIGARETTE_FLASH_MESSAGE }]
    : baseFooterMessages;
  const footerMessage = footerMessages[tick % footerMessages.length];

  const sheetFor = (boardId: string, categoryOff: boolean, noItems: boolean) => {
    const spot = TV2_SHEET_SPOT[boardId];
    if (!spot) return null;
    const broken = sheetBroken[spot] || {};
    const sheet = pickTv2Sheet(fleetTv.cards[spot], {
      categoryOff,
      noItems,
      promoBroken: Boolean(broken.promo),
      offBroken: Boolean(broken.off),
    });
    return sheet ? { spot, sheet } : null;
  };

  const markSheetBroken = (spot: string, kind: "promo" | "off") => {
    setSheetBroken((prev) => ({ ...prev, [spot]: { ...prev[spot], [kind]: true } }));
  };

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

      <HiringRibbon hiring={tvHiring} />

      <section className={styles.categoryGrid}>
        {topBoards.map((board) => {
          const sheetCard = sheetFor(board.id, false, board.products.length === 0);
          if (sheetCard) {
            return (
              <SheetPromoCard
                key={board.id}
                spot={sheetCard.spot}
                sheet={sheetCard.sheet}
                accent={board.accent}
                onBroken={(kind) => markSheetBroken(sheetCard.spot, kind)}
              />
            );
          }
          const promo = getTv2DaytimePromo(board.id, daytime);
          return promo ? (
            <PromoBoard key={board.id} cardId={board.id} promo={promo} accent={board.accent} />
          ) : (
            <Board key={board.id} board={board} items={board.products} tick={board.offset} />
          );
        })}
        {concentratesBoard ? (() => {
          const sheetCard = sheetFor(concentratesBoard.id, false, concentratesBoard.products.length === 0);
          if (sheetCard) {
            return (
              <SheetPromoCard
                key={concentratesBoard.id}
                spot={sheetCard.spot}
                sheet={sheetCard.sheet}
                accent={concentratesBoard.accent}
                onBroken={(kind) => markSheetBroken(sheetCard.spot, kind)}
              />
            );
          }
          return (
            <Board key={concentratesBoard.id} board={concentratesBoard} items={concentratesBoard.products} tick={concentratesBoard.offset} />
          );
        })() : null}
        {cigarettesBoard ? (() => {
          const sheetCard = sheetFor(cigarettesBoard.id, !showCigs, cigarettesBoard.products.length === 0);
          if (sheetCard) {
            return (
              <SheetPromoCard
                key={cigarettesBoard.id}
                spot={sheetCard.spot}
                sheet={sheetCard.sheet}
                accent={cigarettesBoard.accent}
                onBroken={(kind) => markSheetBroken(sheetCard.spot, kind)}
              />
            );
          }
          const promo = getTv2DaytimePromo(cigarettesBoard.id, daytime);
          return promo ? (
            <PromoBoard
              key={cigarettesBoard.id}
              cardId={cigarettesBoard.id}
              promo={promo}
              accent={cigarettesBoard.accent}
            />
          ) : (
            <Board
              key={cigarettesBoard.id}
              board={cigarettesBoard}
              items={cigarettesBoard.products}
              tick={cigarettesBoard.offset}
              offerOverlay={cigaretteOfferVisible}
            />
          );
        })() : (() => {
          const sheetCard = sheetFor("CIGARETTES", true, true);
          if (!sheetCard) return null;
          return (
            <SheetPromoCard
              key="CIGARETTES"
              spot={sheetCard.spot}
              sheet={sheetCard.sheet}
              accent="#8a5b2a"
              onBroken={(kind) => markSheetBroken(sheetCard.spot, kind)}
            />
          );
        })()}
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
      <FleetTvTakeover promos={fleetTv.fullscreenPromos} />
    </main>
  );
}

"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./TvPromoTakeover.module.css";

const PROMO_INTERVAL_MS = 60 * 1000;
const INITIAL_PREVIEW_DELAY_MS = 5 * 1000;
const PROMO_HOLD_MS = 5 * 1000;
const SLIDE_DURATION_MS = 650;

type TvPromoTakeoverProps = {
  promos: readonly [TvPromo, ...TvPromo[]];
};

export type TvPromo = {
  src: string;
  alt: string;
};

type PromoPhase = "hidden" | "entering" | "visible" | "exiting";

const subscribeToClient = () => () => {};

export default function TvPromoTakeover({ promos }: TvPromoTakeoverProps) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [imagesReady, setImagesReady] = useState(false);
  const [activePromoIndex, setActivePromoIndex] = useState(0);
  const [phase, setPhase] = useState<PromoPhase>("hidden");

  useEffect(() => {
    let active = true;
    const loadedPromos = new Set<number>();
    const preloads = promos.map((promo, index) => {
      const preload = new Image();
      const markReady = () => {
        if (!active || loadedPromos.has(index)) return;
        loadedPromos.add(index);
        if (loadedPromos.size === promos.length) setImagesReady(true);
      };
      preload.addEventListener("load", markReady);
      preload.src = promo.src;
      if (preload.complete && preload.naturalWidth > 0) markReady();
      return { preload, markReady };
    });

    return () => {
      active = false;
      preloads.forEach(({ preload, markReady }) => preload.removeEventListener("load", markReady));
    };
  }, [promos]);

  useEffect(() => {
    if (!imagesReady) return;

    let promoActive = false;
    let nextPromoIndex = 0;
    let holdTimer: number | undefined;
    let exitTimer: number | undefined;
    let releaseTimer: number | undefined;

    const showPromo = () => {
      if (promoActive) return;
      promoActive = true;
      setActivePromoIndex(nextPromoIndex);
      nextPromoIndex = (nextPromoIndex + 1) % promos.length;
      setPhase("entering");
      holdTimer = window.setTimeout(() => {
        setPhase("visible");
        exitTimer = window.setTimeout(() => {
          setPhase("exiting");
          releaseTimer = window.setTimeout(() => {
            setPhase("hidden");
            promoActive = false;
          }, SLIDE_DURATION_MS);
        }, PROMO_HOLD_MS);
      }, SLIDE_DURATION_MS);
    };

    const initialPreviewTimer = window.setTimeout(showPromo, INITIAL_PREVIEW_DELAY_MS);
    const promoTimer = window.setInterval(showPromo, PROMO_INTERVAL_MS);

    return () => {
      window.clearTimeout(initialPreviewTimer);
      window.clearInterval(promoTimer);
      if (holdTimer !== undefined) window.clearTimeout(holdTimer);
      if (exitTimer !== undefined) window.clearTimeout(exitTimer);
      if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
    };
  }, [imagesReady, promos.length]);

  if (!mounted) return null;

  const activePromo = promos[activePromoIndex];

  return createPortal(
    <aside
      className={`${styles.takeover} ${styles[phase]}`}
      aria-hidden={phase === "hidden"}
      aria-label={phase !== "hidden" ? "Fort York Cannabis promotion" : undefined}
    >
      <img
        src={activePromo.src}
        alt={activePromo.alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
    </aside>,
    document.body,
  );
}

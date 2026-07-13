"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./TvPromoTakeover.module.css";

const PROMO_INTERVAL_MS = 60 * 1000;
const INITIAL_PREVIEW_DELAY_MS = 5 * 1000;
const PROMO_HOLD_MS = 5 * 1000;
const SLIDE_DURATION_MS = 650;

type TvPromoTakeoverProps = {
  src: string;
  alt: string;
};

type PromoPhase = "hidden" | "entering" | "visible" | "exiting";

const subscribeToClient = () => () => {};

export default function TvPromoTakeover({ src, alt }: TvPromoTakeoverProps) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [imageReady, setImageReady] = useState(false);
  const [phase, setPhase] = useState<PromoPhase>("hidden");

  useEffect(() => {
    const preload = new Image();
    const markReady = () => setImageReady(true);
    preload.addEventListener("load", markReady);
    preload.src = src;

    if (preload.complete && preload.naturalWidth > 0) markReady();

    return () => preload.removeEventListener("load", markReady);
  }, [src]);

  useEffect(() => {
    if (!imageReady) return;

    let promoActive = false;
    let holdTimer: number | undefined;
    let exitTimer: number | undefined;
    let releaseTimer: number | undefined;

    const showPromo = () => {
      if (promoActive) return;
      promoActive = true;
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
  }, [imageReady]);

  if (!mounted) return null;

  return createPortal(
    <aside
      className={`${styles.takeover} ${styles[phase]}`}
      aria-hidden={phase === "hidden"}
      aria-label={phase !== "hidden" ? "Fort York Cannabis promotion" : undefined}
    >
      <img
        src={src}
        alt={alt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        onLoad={() => setImageReady(true)}
      />
    </aside>,
    document.body,
  );
}

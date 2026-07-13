"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import styles from "./TvPromoTakeover.module.css";

const PROMO_INTERVAL_MS = 5 * 60 * 1000;
const INITIAL_PREVIEW_DELAY_MS = 5 * 1000;
const PROMO_HOLD_MS = 5 * 1000;
const SLIDE_DURATION_MS = 650;

type TvPromoTakeoverProps = {
  src: string;
  alt: string;
};

const subscribeToClient = () => () => {};

export default function TvPromoTakeover({ src, alt }: TvPromoTakeoverProps) {
  const mounted = useSyncExternalStore(subscribeToClient, () => true, () => false);
  const [imageReady, setImageReady] = useState(false);
  const [visible, setVisible] = useState(false);

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
    let hideTimer: number | undefined;
    let releaseTimer: number | undefined;

    const showPromo = () => {
      if (promoActive) return;
      promoActive = true;
      setVisible(true);
      hideTimer = window.setTimeout(() => {
        setVisible(false);
        releaseTimer = window.setTimeout(() => {
          promoActive = false;
        }, SLIDE_DURATION_MS);
      }, SLIDE_DURATION_MS + PROMO_HOLD_MS);
    };

    const initialPreviewTimer = window.setTimeout(showPromo, INITIAL_PREVIEW_DELAY_MS);
    const promoTimer = window.setInterval(showPromo, PROMO_INTERVAL_MS);

    return () => {
      window.clearTimeout(initialPreviewTimer);
      window.clearInterval(promoTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      if (releaseTimer !== undefined) window.clearTimeout(releaseTimer);
    };
  }, [imageReady]);

  if (!mounted) return null;

  return createPortal(
    <aside
      className={`${styles.takeover} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
      aria-label={visible ? "Fort York Cannabis promotion" : undefined}
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

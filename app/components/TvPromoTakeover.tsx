"use client";

import { useEffect, useState } from "react";
import styles from "./TvPromoTakeover.module.css";

const PROMO_INTERVAL_MS = 5 * 60 * 1000;
const PROMO_HOLD_MS = 5 * 1000;
const SLIDE_DURATION_MS = 650;

type TvPromoTakeoverProps = {
  src: string;
  alt: string;
};

export default function TvPromoTakeover({ src, alt }: TvPromoTakeoverProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let hideTimer: number | undefined;

    const showPromo = () => {
      setVisible(true);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setVisible(false), SLIDE_DURATION_MS + PROMO_HOLD_MS);
    };

    const promoTimer = window.setInterval(showPromo, PROMO_INTERVAL_MS);

    return () => {
      window.clearInterval(promoTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <aside
      className={`${styles.takeover} ${visible ? styles.visible : ""}`}
      aria-hidden={!visible}
      aria-label={visible ? "Fort York Cannabis promotion" : undefined}
    >
      <img src={src} alt={alt} />
    </aside>
  );
}

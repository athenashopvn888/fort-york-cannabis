"use client";

import type { TvFullscreenPromo } from "../../lib/fleet/types";
import TvPromoTakeover from "./TvPromoTakeover";

/** Sheet fullscreen promo. Renders nothing unless a row is active, so the coded TV picture stays. */
export default function FleetTvTakeover({ promos }: { promos: readonly TvFullscreenPromo[] }) {
  if (promos.length === 0) return null;
  return <TvPromoTakeover promos={promos} />;
}

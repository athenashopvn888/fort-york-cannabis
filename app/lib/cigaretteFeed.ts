import { cache } from "react";
import {
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  foldCodedGate,
  reconcileSurfaceItems,
  type CigaretteSurfaceDecision,
  type CigaretteWording,
} from "./cigDecision";
import { allItems, type ItemProduct } from "./products";
import { cigaretteEnvHardOff } from "./siteConfig";

export type CigaretteSnapshot = {
  web: CigaretteSurfaceDecision;
  tv: CigaretteSurfaceDecision;
  guides: CigaretteSurfaceDecision;
  wording: CigaretteWording;
  live: boolean;
  items: ItemProduct[];
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

function snapshotFrom(cig: unknown, items: ItemProduct[], live: boolean, errored: boolean): CigaretteSnapshot {
  const web = foldCodedGate(decideCigaretteSurface({ cig, items, surface: "web", errored }));
  const tv = foldCodedGate(decideCigaretteSurface({ cig, items, surface: "tv", errored }));
  const guides = foldCodedGate(decideCigaretteGuide({ cig, items, errored }));
  return { web, tv, guides, wording: decideCigaretteSurface({ cig, items, surface: "web", errored }).wording, live, items };
}

const MENU_FEED = () => (process.env.MENU_FEED_URL || "").trim()
  || "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

let cached: { at: number; snap: CigaretteSnapshot } | null = null;
let inflight: Promise<CigaretteSnapshot> | null = null;

async function loadCigaretteFeed(): Promise<CigaretteSnapshot> {
  if (cigaretteEnvHardOff()) return snapshotFrom(null, [], false, false);
  try {
    const endpoint = `${MENU_FEED()}?store=FYC01`;
    const response = await fetch(endpoint, { next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return snapshotFrom(null, allItems, false, true);
    const data = await response.json() as { cig?: unknown; items?: ItemProduct[] };
    const cig = data?.cig ?? null;
    const items = Array.isArray(data?.items) && data.items.length ? data.items : allItems;
    return snapshotFrom(cig, items, true, false);
  } catch {
    return snapshotFrom(null, allItems, false, true);
  }
}

export async function readCigaretteFeed(): Promise<CigaretteSnapshot> {
  const now = Date.now();
  if (cached && now - cached.at < 60_000) return cached.snap;
  if (!inflight) {
    inflight = loadCigaretteFeed().finally(() => {
      inflight = null;
    });
  }
  const snap = await inflight;
  cached = { at: Date.now(), snap };
  return snap;
}

export function resetCigaretteFeedCache(): void {
  cached = null;
  inflight = null;
}

export const getCigaretteSnapshot = cache(readCigaretteFeed);

export function toPublicCigaretteState(snap: CigaretteSnapshot): PublicCigaretteState {
  return { web: snap.web.show, tv: snap.tv.show, wording: snap.wording };
}

export function snapshotHeaders(snap: CigaretteSnapshot): Record<string, string> {
  return cigarettePublicHeaders({ web: snap.web.show, tv: snap.tv.show, wording: snap.wording });
}

export { reconcileSurfaceItems };

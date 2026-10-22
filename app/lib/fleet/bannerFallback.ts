import type { BannerFallbackStep } from "./types.ts";

/** Swap once per step: sheet image, then the coded file, then stop on the text banner. */
export function advanceBannerFallback(step: BannerFallbackStep, src: string, codedImage: string): { step: BannerFallbackStep; src: string } {
  if (step === "sheet" && codedImage && src !== codedImage) return { step: "coded", src: codedImage };
  if (step !== "text") return { step: "text", src: "" };
  return { step: "text", src: "" };
}

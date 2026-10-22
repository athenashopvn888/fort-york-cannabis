"use client";

import { useState, type CSSProperties } from "react";
import { advanceBannerFallback } from "../lib/fleet/bannerFallback";
import type { BannerFallbackStep, ResolvedBanner } from "../lib/fleet/types";

const BRAND_BG = "#06120b";
const BRAND_FG = "#84cc16";

/** Bundle image, then the coded file for the same spot, then a brand-colour category block. */
export default function FleetBannerImage({
  banner,
  alt,
  title,
  width,
  height,
  style,
  loading,
}: {
  banner: Pick<ResolvedBanner, "image" | "codedImage" | "categoryName" | "title" | "render" | "imageWidth" | "imageHeight">;
  alt: string;
  title: string;
  width: number;
  height: number;
  style?: CSSProperties;
  loading?: "eager" | "lazy";
}) {
  const initialStep: BannerFallbackStep = banner.render === "text" || !banner.image ? "text" : "sheet";
  const [step, setStep] = useState<BannerFallbackStep>(initialStep);
  const [src, setSrc] = useState(initialStep === "text" ? "" : banner.image);
  const label = banner.categoryName || banner.title;
  const useCodedFallback = () => {
    const next = advanceBannerFallback(step, src, banner.codedImage);
    if (next.step === step && next.src === src) return;
    setStep(next.step);
    setSrc(next.src);
  };
  const frame = {
    display: "block",
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    aspectRatio: `${width} / ${height}`,
    ...style,
  } as const;
  if (step === "text" || !src) {
    return (
      <div
        data-fleet-text-banner=""
        role="img"
        aria-label={alt}
        title={title}
        style={{
          ...frame,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_BG,
          color: BRAND_FG,
          fontWeight: 800,
          fontSize: "clamp(28px, 4vw, 48px)",
          lineHeight: 1.1,
          textAlign: "center",
          padding: "24px",
        }}
      >
        {label}
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={src}
      src={src}
      alt={alt}
      title={title}
      width={width}
      height={height}
      style={frame}
      loading={loading}
      ref={(node) => {
        if (node?.complete && node.naturalWidth === 0) queueMicrotask(useCodedFallback);
      }}
      onError={useCodedFallback}
    />
  );
}

import { SHOW_CIGARETTES } from "../lib/siteConfig";
import CigaretteSeasonalNotice from "./CigaretteSeasonalNotice";
import FleetBannerImage from "./FleetBannerImage";
import { Fragment } from "react";
import Link from "next/link";
import { CODED_BANNERS, bannersMatchCoded } from "../lib/fleet/coded";
import type { FleetState, ResolvedBanner } from "../lib/fleet/types";

const STORE_NAME = "Fort York Cannabis";
const THEME = { accent: "#84cc16", background: "#06120b" };
const promosRaw = [
  { key: "weed", href: "/exotic", image: "/banners/core-top-weed.webp", alt: `${STORE_NAME} Exotic, Premium and AAA+ flower tiers`, caption: "Top 3 tiers only (Exotic, Premium, AAA+): Buy 2g Get 1g FREE · Buy 3g Get 3g FREE (6g)" },
  { key: "vapes", href: "/items/vapes", image: "/banners/core-vapes-nicotine-thc.webp", alt: `${STORE_NAME} nicotine and THC vape categories`, caption: "Nicotine + THC vapes" },
  { key: "cigarettes", href: "/items/cigarettes", image: "/banners/core-cigarette-mix-match.webp", alt: `${STORE_NAME} 2 packs for $5 mix and match and $25 carton cigarette offer`, caption: "2 PACKS $5 / $25 CARTON" },
  { key: "premium-cigarettes", href: "/items/cigarettes", image: "/banners/core-premium-cigarettes.webp", alt: `${STORE_NAME} BB Full Flavor and Lights, Marlboro and Belmont cigarettes`, caption: "BB Full Flavor + Lights 2 packs $5 · Marlboro & Belmont $10/pack" },
] as const;
const promos = SHOW_CIGARETTES
  ? promosRaw
  : promosRaw.filter((promo) => !/cigarette|marlboro|belmont/i.test(`${promo.key} ${promo.href} ${promo.alt} ${promo.caption}`));

const STORE_ORIGIN = "https://fortyorkcannabis.com";
const bannerImageObjects = promos.map((promo) => ({ "@type": "ImageObject", name: promo.alt, contentUrl: `${STORE_ORIGIN}${promo.image}`, description: `${promo.alt} at ${STORE_NAME}.`, caption: promo.caption }));

const figureStyle = { margin: 0, width: "100%" } as const;
const imageStyle = { display: "block", width: "100%", maxWidth: "100%", height: "auto" } as const;
const captionStyle = { margin: 0, padding: "10px 14px", background: "#111827", color: "#ffffff", textAlign: "center" as const, fontWeight: 800, lineHeight: 1.35 };

function CodedBanners() {
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": bannerImageObjects }).replace(/</g, "\\u003c") }} />
      {promos.map((promo) => (
        <Fragment key={promo.key}>
        {promo.key === "cigarettes" && <CigaretteSeasonalNotice />}
        <figure data-core-banner={promo.key} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
          <Link href={promo.href} aria-label={promo.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={promo.image}
              alt={promo.alt}
              title={promo.caption}
              width={promo.key === "cigarettes" ? 2048 : 1672}
              height={promo.key === "cigarettes" ? 768 : 941}
              style={imageStyle}
              loading="eager"
            />
          </Link>
          <figcaption style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{promo.caption}</figcaption>
        </figure>
        </Fragment>
      ))}
    </aside>
  );
}

function SheetBanners({ banners, showCigs }: { banners: ResolvedBanner[]; showCigs: boolean }) {
  const visible = banners.filter((banner) => !banner.hidden && (showCigs || (banner.id !== "cigarettes" && banner.id !== "premium-cigarettes")));
  return (
    <aside data-fleet-homepage-announcement="" aria-label="Store promotions" style={{ display: "flex", flexDirection: "column", width: "100%", maxWidth: "100%", height: "auto", minHeight: 0, overflow: "visible", position: "relative", zIndex: 50 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": bannerImageObjects }).replace(/</g, "\\u003c") }} />
      {visible.map((banner) => {
        const width = banner.imageWidth || (banner.id === "cigarettes" ? 2048 : 1672);
        const height = banner.imageHeight || (banner.id === "cigarettes" ? 768 : 941);
        return (
          <Fragment key={banner.id}>
            {banner.id === "cigarettes" && showCigs ? <CigaretteSeasonalNotice /> : null}
            <figure data-core-banner={banner.id} style={{ ...figureStyle, boxShadow: `inset 0 0 0 2px ${THEME.accent}` }}>
              <Link href={banner.href} aria-label={banner.alt} style={{ display: "block", width: "100%", background: THEME.background }}>
                <FleetBannerImage banner={banner} alt={banner.alt} title={banner.title} width={width} height={height} style={imageStyle} loading="eager" />
              </Link>
              <figcaption style={{ ...captionStyle, borderBottom: `3px solid ${THEME.accent}` }}>{banner.textBar}</figcaption>
            </figure>
          </Fragment>
        );
      })}
    </aside>
  );
}

export default function FleetAnnouncementBanner({ fleet, showCigs }: { fleet: FleetState; showCigs: boolean }) {
  const codedVisibility = showCigs === SHOW_CIGARETTES;
  if ((!fleet.active || bannersMatchCoded(fleet.banners)) && codedVisibility) return <CodedBanners />;
  const banners = fleet.banners.length ? fleet.banners : CODED_BANNERS;
  return <SheetBanners banners={banners} showCigs={showCigs} />;
}

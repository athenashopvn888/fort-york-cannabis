"use client";

import { usePathname } from "next/navigation";
import { useFleetContent } from "./FleetContentProvider";
import { FULL_NAME_NAP, FULL_NAME_NAP_ADDRESS } from "../lib/fullNameNap";

/**
 * FYC01 exact full-name NAP (name, address, phone) line, shown at the foot of every page.
 * Name = the store's full name exactly as used on its Google Business Profile.
 * Address and phone = the public GBP primary phone and storefront address. No delivery-line numbers.
 * Additive only: sits below each page's existing footer. Hidden on in-store TV screens.
 * On /contact, /visit and /hours it expands into a NAP + hours block.
 */

const HIDE_ON = /^\/(fl)?tv/i;
const CONTACT_PAGES = /^\/(contact|visit|hours)(\/|$)/i;

const linkStyle = { color: "inherit", textDecoration: "underline", textUnderlineOffset: "2px" } as const;

export default function FullNameNap() {
  const pathname = usePathname() || "/";
  const fleet = useFleetContent();
  if (HIDE_ON.test(pathname)) return null;
  const expanded = CONTACT_PAGES.test(pathname);
  const n = fleet.active ? {
    code: FULL_NAME_NAP.code,
    fullName: fleet.nap.name,
    street: fleet.nap.street,
    city: fleet.nap.city,
    region: fleet.nap.province,
    postal: fleet.nap.postalCode,
    phoneDisplay: fleet.nap.phoneDisplay,
    phoneTel: fleet.nap.phoneTel.startsWith("tel:") ? fleet.nap.phoneTel : `tel:${fleet.nap.phoneTel}`,
    hours: fleet.nap.hours,
    mapsUrl: fleet.nap.mapsSearchUrl,
    neighbourhood: fleet.nap.area,
    intersection: fleet.nap.intersection,
    transit: FULL_NAME_NAP.transit,
    visitPath: FULL_NAME_NAP.visitPath,
  } : FULL_NAME_NAP;
  const address = fleet.active
    ? `${fleet.nap.street}, ${fleet.nap.city}, ${fleet.nap.province} ${fleet.nap.postalCode}`
    : FULL_NAME_NAP_ADDRESS;
  return (
    <section
      aria-label={`${n.fullName} name, address and phone`}
      data-fullname-nap={n.code}
      style={{
        background: "#0b0f17",
        color: "#e5e7eb",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        padding: expanded ? "22px 16px calc(24px + env(safe-area-inset-bottom))" : "14px 16px calc(16px + env(safe-area-inset-bottom))",
        textAlign: "center",
        fontSize: "13px",
        lineHeight: 1.6,
        overflowWrap: "anywhere",
        position: "relative",
        zIndex: 1,
      }}
    >
      {expanded ? (
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "left", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12, padding: "16px 18px", background: "rgba(255,255,255,0.04)" }}>
          <h2 style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>{n.fullName}</h2>
          <p style={{ margin: "0 0 4px" }}>
            <a href={n.mapsUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{address}</a>
          </p>
          <p style={{ margin: "0 0 4px" }}>
            Phone: <a href={n.phoneTel} style={linkStyle}>{n.phoneDisplay}</a>
          </p>
          <p style={{ margin: 0 }}>Hours: {n.hours}</p>
          {n.neighbourhood ? (
            <div data-fullname-area="" style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.14)" }}>
              <p style={{ margin: "0 0 4px", fontWeight: 700, color: "#ffffff" }}>Cannabis Dispensary in {n.neighbourhood}</p>
              {n.intersection ? <p style={{ margin: "0 0 4px" }}>Nearest intersection: {n.intersection}</p> : null}
              {n.transit ? <p style={{ margin: 0 }}>Transit: {n.transit}</p> : null}
            </div>
          ) : null}
        </div>
      ) : (
        <p style={{ margin: 0 }}>
          <strong style={{ color: "#ffffff" }}>{n.fullName}</strong>
          {" · "}
          <a href={n.mapsUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{address}</a>
          {" · "}
          <a href={n.phoneTel} style={linkStyle}>{n.phoneDisplay}</a>
          {" · "}
          <a href={n.visitPath} style={linkStyle} data-fullname-visit-link="">Visit &amp; contact</a>
        </p>
      )}
    </section>
  );
}

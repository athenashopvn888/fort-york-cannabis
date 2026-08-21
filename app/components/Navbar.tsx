"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Navbar.module.css";

const ALL_LINKS: { href: string; label: string; featured?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/weed-dispensary-toronto/", label: "Toronto Store" },
  { href: "/menu", label: "Menu" },
  { href: "/info/fort-york-cannabis-local-visit-guide-2026", label: "Visit Guide" },
  { href: "/info/fort-york-cannabis-store", label: "Fort York" },
  { href: "/info/cityplace-cannabis-dispensary", label: "CityPlace" },
  { href: "/contact", label: "Contact" },
    { href: "/careers/budtender", label: "Join Team", featured: true },

  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar} id="main-nav">
      <div className={styles.topBar}>
        <Link href="/" className={styles.logo} style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/brand/fort-york-icon.png" alt="FORT YORK CANNABIS logo" style={{ width: "34px", height: "34px", borderRadius: "8px" }} />
          <span style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "17px",
            letterSpacing: "0.04em",
            color: "white",
          }}>
            FORT YORK CANNABIS
          </span>
        </Link>
        <div className={styles.topBarRight}>
          <span className={styles.open}>OPEN 24 HOURS</span>
        </div>
      </div>

      <div className={styles.scrollBar}>
        <div className={styles.scrollInner}>
          {ALL_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.pill} ${link.featured ? styles.pillHiring : ""} ${isActive ? styles.pillActive : ""}`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "120px 24px 60px",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 48, fontWeight: 900, marginBottom: 16 }}>FYC</span>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 900,
            color: "var(--text-primary)",
            margin: "0 0 12px",
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontSize: 16,
            color: "var(--text-secondary)",
            maxWidth: 460,
            margin: "0 0 32px",
            lineHeight: 1.6,
          }}
        >
          This page is not part of the Fort York Cannabis local website. Confirmed store facts remain on the homepage, contact page, and Toronto landing page.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link
            href="/"
            style={{
              padding: "14px 28px",
              background: "var(--green-dark)",
              color: "white",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 800,
            }}
          >
            Home
          </Link>
          <Link
            href="/weed-dispensary-toronto/"
            style={{
              padding: "14px 28px",
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Toronto Landing
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
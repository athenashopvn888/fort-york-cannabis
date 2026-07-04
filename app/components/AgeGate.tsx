"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./AgeGate.module.css";

function shouldShowAgeGate() {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname;
  if (path === "/tv" || path === "/tv2" || path.startsWith("/tv/") || path.startsWith("/tv2/")) {
    return false;
  }

  return localStorage.getItem("fyc_age_verified") !== "true";
}

export default function AgeGate() {
  const [show, setShow] = useState(shouldShowAgeGate);
  const [underage, setUnderage] = useState(false);
  useEffect(() => {
    if (!show) return;

    document.body.classList.add("ageGateLocked");

    return () => {
      document.body.classList.remove("ageGateLocked");
    };
  }, [show]);

  const handleVerify = () => {
    localStorage.setItem("fyc_age_verified", "true");
    setShow(false);
  };

  const handleUnderage = () => {
    setUnderage(true);
  };

  if (!show || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="age-gate-title">
        {underage ? (
          <div className={styles.underageState}>
            <span className={styles.warningIcon}>!</span>
            <h2 id="age-gate-title" className={styles.title}>Access Denied</h2>
            <p className={styles.text}>
              You must be 19 years of age or older to enter this website.
            </p>
            <a href="https://www.google.com" className={styles.exitBtn}>
              Exit to Google
            </a>
          </div>
        ) : (
          <div className={styles.promptState}>
            <div className={styles.logoWrap}>
              <img
                src="/brand/fort-york-icon.svg"
                alt="FORT YORK CANNABIS"
                className={styles.logo}
              />
            </div>
            <h2 id="age-gate-title" className={styles.title}>Age Verification</h2>
            <p className={styles.text}>
              FORT YORK CANNABIS requires all visitors to be of legal age.
              Are you <strong>19 years of age or older</strong>?
            </p>
            <div className={styles.btnRow}>
              <button
                type="button"
                className={styles.yesBtn}
                onClick={handleVerify}
              >
                Yes, I am 19+
              </button>
              <button
                type="button"
                className={styles.noBtn}
                onClick={handleUnderage}
              >
                No, I am not
              </button>
            </div>
            <span className={styles.disclaimer}>
              By entering this site you agree to our Terms of Service & Privacy Policy.
            </span>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}

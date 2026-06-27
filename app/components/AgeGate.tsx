"use client";

import { useState } from "react";
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

  const handleVerify = () => {
    localStorage.setItem("fyc_age_verified", "true");
    setShow(false);
  };

  const handleUnderage = () => {
    setUnderage(true);
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {underage ? (
          <div className={styles.underageState}>
            <span className={styles.warningIcon}>!</span>
            <h2 className={styles.title}>Access Denied</h2>
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
                src="/brand/fort-york-logo.png"
                alt="FORT YORK CANNABIS"
                className={styles.logo}
              />
            </div>
            <h2 className={styles.title}>Age Verification</h2>
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
    </div>
  );
}
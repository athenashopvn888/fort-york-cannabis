"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import styles from "./AgeGate.module.css";

function shouldShowAgeGate() {
  if (typeof window === "undefined") return false;

  const path = window.location.pathname;
  if (path === "/tv" || path === "/tv2" || path.startsWith("/tv/") || path.startsWith("/tv2/")) {
    return false;
  }

  return localStorage.getItem("fyc_age_verified") !== "true";
}

function subscribeToAgeGate() {
  return () => undefined;
}

function getServerAgeGateSnapshot() {
  return false;
}

export default function AgeGate() {
  const shouldShow = useSyncExternalStore(
    subscribeToAgeGate,
    shouldShowAgeGate,
    getServerAgeGateSnapshot,
  );
  const [dismissed, setDismissed] = useState(false);
  const [underage, setUnderage] = useState(false);
  const show = shouldShow && !dismissed;

  useEffect(() => {
    if (!show) return;

    document.body.classList.add("ageGateLocked");

    return () => {
      document.body.classList.remove("ageGateLocked");
    };
  }, [show]);

  const handleVerify = () => {
    localStorage.setItem("fyc_age_verified", "true");
    setDismissed(true);
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
              <Image
                src="/brand/fort-york-logo.png"
                alt="FORT YORK CANNABIS"
                className={styles.logo}
                width={720}
                height={280}
                priority
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

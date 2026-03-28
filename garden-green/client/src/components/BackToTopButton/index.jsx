import React from "react";
import styles from "./index.module.css";
import { useEffect, useState } from "react";

function BackToTopButton() {
  const [backToTop, setBackToTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  }, []);
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.Btn}>
      {backToTop && (
        <button className={styles.topBtn} onClick={scrollUp}>
          ^
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;

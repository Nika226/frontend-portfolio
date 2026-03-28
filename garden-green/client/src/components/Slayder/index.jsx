import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

const Slayder = () => {
  const navigateSlayder = useNavigate();
  return (
    <div className={styles.slayder}>
      <div className={styles.sleft}>
        <h1>Amazing Discounts on Garden Products!</h1>
        <div>
          <button
            className={styles.slayderbtn}
            onClick={() => navigateSlayder("/allsales")}
          >
            CHECK OUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slayder;

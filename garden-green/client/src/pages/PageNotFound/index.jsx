import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import four from "../../assets/images/four.svg";
import foundnot from "../../assets/images/foundnot.png";

function PageNotFound() {
  const navigateNotFound = useNavigate();
  return (
    <div className={styles.containerNf}>
      <img src={four} alt="not found" />
      <img src={foundnot} alt="not found" />
      <img src={four} alt="not found" />
      <h3>Page Not Found</h3>
      <p>
        We’re sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>

      <button onClick={() => navigateNotFound("/")}>Go Home</button>
    </div>
  );
}

export default PageNotFound;

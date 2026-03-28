import React from "react";
import styles from "./index.module.css";
import Contacts from "../Contacts";
import Map from "../Map";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Contacts />
        <Map />
      </div>
    </footer>
  );
};
export default Footer;

import React from "react";
import styles from "./index.module.css";
import arrow_icon from "../../assets/images/breadcrum_arrow.png";

const Breadcrum = (props) => {
  const { product } = props;
  return (
    <div className={styles.breadcrum}>
      Main page <img src={arrow_icon} alt="" /> Categories{" "}
      <img src={arrow_icon} alt="" /> {product.category}{" "}
      <img src={arrow_icon} alt="" /> {product.name}
    </div>
  );
};

export default Breadcrum;

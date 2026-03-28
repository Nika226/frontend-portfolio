import React from "react";
import styles from "./index.module.css";
import star_icon from "../../assets/images/star_icon.png";
import star_dull_icon from "../../assets/images/star_dull_icon.png";

const ProductDisplay = () => {
  /*= (props) => {
  const { product } = props;*/
  return (
    <div className={styles.productdisplay}>
      <div className={styles.productdisplay_left}>
        <div className={styles.productdisplay_imglist}>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
        <div className={styles.productdisplay_img}></div>
        <img className={styles.productdisplay_mainimg} src="" alt="" />
        <div className="productdisplay_right">
          <div className={styles.productdisplay_srarright}>
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(104)</p>
          </div>
          <div className={styles.productdisplay_rightprices}>
            <div className={styles.productdisplay_rightprices_old}> </div>
            <div className={styles.productdisplay_rightprices_new}> </div>
            <div className={styles.productdisplay_right_description}>
              This high quality everyday secateur features a fully hardened and
              tempered, high-carbon steel blade for lasting sharpness. For
              comfort, the robust but lightweight alloy handles are covered in a
              soft grip, in a bright terracotta colour for maximum visibility in
              the garden. It won’t be easy to leave this pruner behind at the
              end of the day! Rubber cushion stops prevent jarring over repeated
              use, reducing hand strain for the user. This secateur cuts up to
              2.5 cm diameter. Carrying RHS endorsement, possibly the highest
              accolade in gardening, for peace of mind this pruner comes with a
              ten-year guarantee against manufacturing defects. Supplied with
              replacement blade and spare spring. You may also be interested in
              our pack of two replacement springs.
            </div>
            <button>ADD TO CART</button>
            <p className={styles.productdisplay_rightcategory_click}>
              Read more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;

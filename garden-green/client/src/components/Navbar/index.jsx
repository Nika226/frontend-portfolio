import React, { useState } from "react";
import styles from "./index.module.css";
import logo from "../../assets/images/logo.svg";
import cart_icon from "../../assets/images/cart_icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("Main page");
  const cartItemsCount = useSelector(
    (state) => state.products.cartItems.length ?? 0
  );
  return (
    <div className={styles.navbar}>
      <div className={styles.navlogo}>
        <img
          src={logo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
      <ul className={styles.navmenu}>
        <li
          onClick={() => {
            setMenu("mainpage");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Main page
          </Link>{" "}
          {menu === "mainpage" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("categories");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="categories">
            Categories
          </Link>{" "}
          {menu === "categories" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("allproducts");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/allproducts">
            All products
          </Link>
          {menu === "allproducts" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("allsales");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/allsales">
            All sales{" "}
          </Link>
          {menu === "allsales" ? <hr /> : <></>}
        </li>
      </ul>
      <div className={styles.navlogincart}>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className={styles.navcartcount}>{cartItemsCount}</div>
      </div>
    </div>
  );
};

export default Navbar;

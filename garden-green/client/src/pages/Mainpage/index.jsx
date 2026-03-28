import React from "react";
import Slayder from "../../components/Slayder/index.jsx";
import Offer from "../../components/Offer/index.jsx";
import { useEffect, useRef } from "react";
import SaleComponent from "../../components/SaleComponent/index.jsx";
import styles from "./index.module.css";
import { fetchCategories } from "../../storage/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDocumentTitle } from "../../utils/setDocumentTitle";

function Mainpage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  useEffect(() => {
    setDocumentTitle("home");
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);
  const saleComponentRef = useRef(null);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };
  return (
    <div>
      <Slayder />
      <div className={styles.categoriesDiv}>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <div className={styles.categoriesBar}></div>
        <button
          className={styles.categoriesBtn}
          onClick={() => {
            navigate("/categories");
          }}
        >
          All categories{" "}
        </button>
      </div>
      <div className={styles.swipperDiv}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryCard}>
            <img
              className={styles.categoriesImg}
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
              onClick={() => {
                handleCategoryClick(category.id);
              }}
            />
            <p className={styles.swipperTitle}>{category.title}</p>
          </div>
        ))}
      </div>

      <Offer />
      <div ref={saleComponentRef}></div>
      <SaleComponent />
    </div>
  );
}

export default Mainpage;

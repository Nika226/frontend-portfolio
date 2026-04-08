import { useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import MainPageBtn from "../../components/MainButton/index.jsx";
import { setDocumentTitle } from "../../utils/setDocumentTitle";
import mockCategories from "../../data/mockCategories";

function Categories() {
  console.log("render Categories");

  const categories = mockCategories;

  useEffect(() => {
    setDocumentTitle("category");
  }, []);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <>
      <div className={styles.categoriesDiv}>
        <MainPageBtn />
        <button
          className={styles.categoriesBtn}
          onClick={() => {
            navigate("/categories");
          }}
        >
          Categories
        </button>
        <h2 className={styles.categoriesTitle}>Categories</h2>
        <div className={styles.categoriesDivImg}>
          {categories.map((category) => (
            <div className={styles.imgPDiv} key={category.id}>
              <img
                className={styles.categoriesImg}
                src={category.image}
                alt={category.title}
                onClick={() => {
                  handleCategoryClick(category.id);
                }}
              />
              <p className={styles.categoriInfo}>{category.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Categories;

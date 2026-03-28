import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
function MainButton() {
  const navigateCategories = useNavigate();

  return (
    <>
      <button
        className={styles.mainPageBtn}
        onClick={() => {
          navigateCategories("/");
        }}
      >
        Main page
      </button>
    </>
  );
}

export default MainButton;

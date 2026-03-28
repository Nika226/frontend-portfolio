import { Link } from "react-router-dom";
import { SlSocialInstagram } from "react-icons/sl";
import { SiWhatsapp } from "react-icons/si";
import styles from "./index.module.css";

const Contacts = () => {
  return (
    <section>
      <h2 className={styles.title}>Contact</h2>
      <div className={styles.divInfo}>
        <div>
          <div className={styles.infoText}>
            <p className={styles.paragraphText}>Phone</p>
            <Link className={styles.Info} to="tel:+49 999 999 99 99">
              +49 999 999 99 99
            </Link>
          </div>
          <div className={styles.infoText}>
            <p className={styles.paragraphText}>Address</p>
            <p className={styles.Info}>
              Linkstraße 2, 8 OG, 10785, Berlin, Deutschland
            </p>
          </div>
        </div>
        <div>
          <div className={`${styles.infoText} ${styles.infotextTwo} `}>
            <p className={styles.paragraphText}>Socials</p>
            <div className={styles.footerImg}>
              <Link
                className={styles.socImg}
                to="https://www.instagram.com/startainstitute/"
                target="_blank"
              >
                <SlSocialInstagram />
              </Link>
              <Link
                className={styles.socImg_wats}
                to="https://wa.me/+499999999999"
                target="_blank"
              >
                <SiWhatsapp />
              </Link>
            </div>
          </div>

          <div className={`${styles.infoText} ${styles.infotextTwo}`}>
            <p className={styles.paragraphText}>Working Hours</p>
            <p className={styles.paragraphInfoInfo}>24 hours a day</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contacts;

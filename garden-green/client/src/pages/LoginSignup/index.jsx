import React from "react";
import styles from "./index.module.css";

const LoginSignup = () => {
  return (
    <div className={styles.loginsign_up}>
      <div className={styles.loginsignup_container}>
        <h2>Sign Up</h2>
        <div className={styles.loginsignup_fields}>
          <input type="text" placeholder="Your Name" />
          <input type="Email" placeholder="Email address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className={styles.loginSingup_login}>
          Already have an account? <span> Login here</span>
        </p>
        <div className={styles.loginsignup_agree}>
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;

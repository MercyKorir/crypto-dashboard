import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Landing.module.css";

const Landing = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Crypto</div>
        <Link to={"/signin"}>Login</Link>
      </header>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Our Website</h1>
          <p>Experience the best products and services.</p>
          <button className={styles.heroBtn}>Get Started</button>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>Logo</div>
          <div className={styles.footerSocial}>
            <Link to={""}>GitHub</Link>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <p>&copy; 2023 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

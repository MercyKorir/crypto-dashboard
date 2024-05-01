import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LoadingAnimation from "./LoadingAnimation";
import styles from "../styles/Landing.module.css";

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const handleStarted = () => {
    navigate("/signin");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>Crypto</div>
        <Link to={"/signin"} className={styles.loginBtn}>
          Login
        </Link>
      </header>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Our Website</h1>
          <p>Experience the best products and services.</p>
          <button className={styles.heroBtn} onClick={handleStarted}>
            Get Started
          </button>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>Crypto</div>
          <div className={styles.footerSocial}>
            <Link to={"https://github.com/MercyKorir"}>
              <GitHubIcon fontSize="inherit" />
            </Link>
          </div>
        </div>
        <div className={styles.footerCopyright}>
          <p>&copy; 2024. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

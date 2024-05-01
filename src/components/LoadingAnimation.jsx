import React from "react";
import styles from "../styles/LoadingAnimation.module.css";

const LoadingAnimation = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default LoadingAnimation;

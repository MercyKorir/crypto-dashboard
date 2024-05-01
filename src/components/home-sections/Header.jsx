import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import styles from "../../styles/home-sections/Header.module.css";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.backArrow}>
          <ArrowBackIcon className={styles.backArrowIcon} fontSize="inherit" />
        </div>
        <div className={styles.userProfile}>
          <PersonIcon className={styles.userIcon} fontSize="inherit" />
        </div>
      </div>
    </div>
  );
};

export default Header;

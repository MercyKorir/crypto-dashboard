import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/home-sections/Header.module.css";

const Header = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsername(userName);
    }
  }, []);
  const userInitial = username ? username.charAt(0).toUpperCase() : "";
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.backArrow}>
          <ArrowBackIcon className={styles.backArrowIcon} fontSize="inherit" />
        </div>
        <div className={styles.userProfile}>
          <h3 className={styles.userIcon}>{userInitial}</h3>
        </div>
      </div>
    </div>
  );
};

export default Header;

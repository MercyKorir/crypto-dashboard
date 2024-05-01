import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "../../styles/home-sections/Header.module.css";

const Header = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      setUsername(userName);
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const userInitial = username ? username.charAt(0).toUpperCase() : "";
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div className={styles.backArrow} onClick={handleGoBack}>
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

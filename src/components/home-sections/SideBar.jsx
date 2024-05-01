import React, { useState } from "react";
import { Link } from "react-router-dom";
import NorthWestIcon from "@mui/icons-material/NorthWest";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import styles from "../../styles/home-sections/SideBar.module.css";

const SideBar = (handleLogout) => {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <div
      className={`${styles.sideBarContainer} ${
        collapse ? styles.minimize : ""
      }`}
    >
      <div
        className={`${collapse ? styles.minimize : ""} ${
          styles.sideBarContent
        }`}
      >
        <div className={styles.topContent}>
          <div className={`${collapse ? styles.hide : ""} ${styles.logo}`}>
            <h1>Crypto</h1>
          </div>
          <div className={styles.nav}>
            <div
              className={`${collapse ? styles.hide : ""} ${styles.navButtons}`}
            >
              <div className={styles.homeBtnContainer}>
                <Link to={"/"} className={styles.homeBtn}>
                  Home
                </Link>
              </div>
              <div className={styles.logoutBtnContainer}>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </div>
            </div>
            <div className={styles.collapseExpandCont}>
              {collapse ? (
                <div className={styles.collapseBtn} onClick={handleCollapse}>
                  <NorthEastIcon className={styles.collapseIcon} />
                </div>
              ) : (
                <div className={styles.collapseBtn} onClick={handleCollapse}>
                  <NorthWestIcon className={styles.collapseIcon} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={`${collapse ? styles.hide : ""} ${styles.footer}`}>
          <p>&copy; 2024 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default SideBar;

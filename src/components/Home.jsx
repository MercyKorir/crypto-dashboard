import React from "react";
import Header from "./home-sections/Header";
import CryptoList from "./home-sections/CryptoList";
import SideBar from "./home-sections/SideBar";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.left}>
        <SideBar />
      </div>
      <div className={styles.right}>
        <Header />
        <CryptoList />
      </div>
    </div>
  );
};

export default Home;

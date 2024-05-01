import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import Header from "./home-sections/Header";
import CryptoList from "./home-sections/CryptoList";
import SideBar from "./home-sections/SideBar";
import LoadingAnimation from "./LoadingAnimation";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } else {
        setIsLoggedIn(false);
        setTimeout(() => {
          setIsLoading(false);
          navigate("/signin");
        }, 3000);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("userName");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.left}>
        <SideBar logout={handleLogout} />
      </div>
      <div className={styles.right}>
        <Header />
        <CryptoList />
      </div>
    </div>
  );
};

export default Home;

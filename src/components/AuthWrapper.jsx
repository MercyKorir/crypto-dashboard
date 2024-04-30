import React, { useState, useEffect } from "react";
import styles from "../styles/AuthWrapper.module.css";

const AuthWrapper = ({ children, formType }) => {
  const [heightValue, setHeightValue] = useState("");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const determineHeight = () => {
      if (formType === "login") {
        setHeightValue("700px");
        setTitle("Login");
        setDescription("Welcome Back!👋");
      } else if (formType === "signup") {
        setTitle("Sign Up");
        setDescription("New here? Welcome!👋");
        if (screenWidth >= 768) {
          setHeightValue("630px");
        } else {
          setHeightValue("fit-content");
        }
      } else {
        setHeightValue("600px");
      }
    };
    determineHeight();
  }, [formType, screenWidth]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.formContainer} style={{ height: heightValue }}>
        <div className={styles.formTitle}>
          <p>{description}</p>
          <h2>{title}</h2>
        </div>
        <div className={styles.formContent}>{children}</div>
      </div>
    </div>
  );
};

export default AuthWrapper;

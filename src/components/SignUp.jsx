import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignUp = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confPasswordFocus, setConfPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleConfPasswordFocus = () => {
    setConfPasswordFocus(true);
  };

  const handleUsernameFocus = () => {
    setUsernameFocus(true);
  };

  return (
    <div className={styles.signUpForm}>
      <form action="">
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
            <span className={usernameFocus ? styles.hideIcon : ""}>
              <AccountCircleIcon className={styles.formIcon} />
            </span>
            <input
              type="username"
              id="username"
              name="username"
              onFocus={handleUsernameFocus}
              onBlur={() => setUsernameFocus(false)}
            />
            <label
              htmlFor="username"
              className={usernameFocus ? styles.hideLabel : ""}
            >
              Full Name
            </label>
          </div>
          <div className={styles.inputItem}>
            <span className={emailFocus ? styles.hideIcon : ""}>
              <EmailIcon className={styles.formIcon} />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              onFocus={handleEmailFocus}
              onBlur={() => setEmailFocus(false)}
            />
            <label
              htmlFor="email"
              className={emailFocus ? styles.hideLabel : ""}
            >
              Email
            </label>
          </div>
          <div className={styles.inputItem}>
            <span className={passwordFocus ? styles.hideIcon : ""}>
              <LockIcon className={styles.formIcon} />
            </span>
            <input
              type="password"
              id="password"
              name="password"
              onFocus={handlePasswordFocus}
              onBlur={() => setPasswordFocus(false)}
            />
            <label
              htmlFor="password"
              className={passwordFocus ? styles.hideLabel : ""}
            >
              Password
            </label>
          </div>
          <div className={styles.inputItem}>
            <span className={confPasswordFocus ? styles.hideIcon : ""}>
              <LockIcon className={styles.formIcon} />
            </span>
            <input
              type="password"
              id="confirm"
              name="confirm"
              onFocus={handleConfPasswordFocus}
              onBlur={() => setConfPasswordFocus(false)}
            />
            <label
              htmlFor="confirm"
              className={confPasswordFocus ? styles.hideLabel : ""}
            >
              Confirm Password
            </label>
          </div>
        </div>
        <div className={styles.navigationContainer}>
          <div className={styles.forgotPwdContainer}>
            <Link className={styles.forgotPwd} to={"/"}>
              Forgot Password?
            </Link>
          </div>
          <div className={styles.buttonSignUp}>
            <div className={styles.loginBtnContainer}>
              <button>Login</button>
            </div>
            <div className={styles.signUpContainer}>
              <p>
                Don't have an account?{""}{" "}
                <Link className={styles.signUpLink} to={"/signup"}>
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/SignIn.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const SignIn = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  return (
    <div className={styles.loginForm}>
      <form action="">
        <div className={styles.inputContainer}>
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

export default SignIn;

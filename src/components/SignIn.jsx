import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = () => {
    let emailErrors = {};
    if (!email.trim()) {
      emailErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailErrors.email = "Email is invalid!";
    }

    if (Object.keys(emailErrors).length === 0) {
      setError((prevErrors) => {
        delete prevErrors.email;
        return { ...prevErrors };
      });
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        ...emailErrors,
      }));
    }
  };

  const validatePassword = () => {
    let passwordErrors = {};
    if (!password) {
      passwordErrors.password = "Password is required!";
    }

    if (Object.keys(passwordErrors).length === 0) {
      setError((prevErrors) => {
        delete prevErrors.password;
        return { ...prevErrors };
      });
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        ...passwordErrors,
      }));
    }
  };

  const handleEmailBlur = () => {
    validateEmail();
    setEmailFocus(false);
  };

  const handlePwdBlur = () => {
    validatePassword();
    setPasswordFocus(false);
  };

  const handleEmailFocus = () => {
    setEmailFocus(true);
  };

  const handlePasswordFocus = () => {
    setPasswordFocus(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      const user = userInfo.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ firebaseError: `Error: ${errorCode} - ${errorMessage}` });
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
            <div>
              <span className={emailFocus ? styles.hideIcon : ""}>
                <EmailIcon className={styles.formIcon} />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={handleEmailFocus}
                onBlur={handleEmailBlur}
                required
              />
              <label
                htmlFor="email"
                className={emailFocus ? styles.hideLabel : ""}
              >
                Email
              </label>
            </div>
            <div
              className={`${
                error.email ? styles.validationErr : styles.hideValidationErr
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{error.email}</p>
            </div>
          </div>
          <div className={styles.inputItem}>
            <div>
              <span className={passwordFocus ? styles.hideIcon : ""}>
                <LockIcon className={styles.formIcon} />
              </span>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={handlePasswordFocus}
                onBlur={handlePwdBlur}
                required
              />
              <label
                htmlFor="password"
                className={passwordFocus ? styles.hideLabel : ""}
              >
                Password
              </label>
            </div>
            <div
              className={`${
                error.password ? styles.validationErr : styles.hideValidationErr
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{error.password}</p>
            </div>
          </div>
        </div>
        {error.firebaseError && (
          <div className={styles.errorMessage}>{error.firebaseError}</div>
        )}
        <div className={styles.navigationContainer}>
          <div className={styles.forgotPwdContainer}>
            <Link className={styles.forgotPwd} to={"/"}>
              Forgot Password?
            </Link>
          </div>
          <div className={styles.buttonSignUp}>
            <div className={styles.loginBtnContainer}>
              <button type="submit">Login</button>
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

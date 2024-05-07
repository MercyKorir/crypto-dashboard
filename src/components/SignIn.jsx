import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "../styles/SignIn.module.css";

const SignIn = () => {
  const [error, setError] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user is logged in and send them to dashboard
    const checkUser = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => checkUser();
  }, [navigate]);

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
  };

  const handlePwdBlur = () => {
    validatePassword();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      const user = userInfo.user;

      const userName = user.displayName;
      localStorage.setItem("userName", userName);
      navigate("/dashboard");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ firebaseError: `${errorCode}: ${errorMessage}` });
    }
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
            <div className={styles.inputBox}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                required
              />
              <span className={styles.formIcon}>
                <EmailIcon fontSize="inherit" />
              </span>
              <label htmlFor="email">Email</label>
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
            <div className={styles.inputBox}>
              <span className={styles.visibilityIcon}>
                <div onClick={() => setShowPwd(!showPwd)}>
                  {showPwd ? (
                    <VisibilityIcon
                      fontSize="inherit"
                      style={{ cursor: "pointer" }}
                    />
                  ) : (
                    <VisibilityOffIcon
                      fontSize="inherit"
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </div>
              </span>
              <input
                type={showPwd ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handlePwdBlur}
                required
              />
              <span className={styles.formIcon}>
                <LockIcon fontSize="inherit" />
              </span>
              <label htmlFor="password">Password</label>
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
            <div className={styles.signUpContainer}>
              <p>
                Or{" "}
                <Link className={styles.signUpLink} to={"/"}>
                  Go Home
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

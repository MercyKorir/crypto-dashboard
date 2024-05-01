import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const SignUp = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confPasswordFocus, setConfPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

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

  const validateConfPassword = () => {
    let confPasswordErrors = {};
    if (!confPassword) {
      confPasswordErrors.confPassword = "Password is required!";
    }

    if (Object.keys(confPasswordErrors).length === 0) {
      setError((prevErrors) => {
        delete prevErrors.confPassword;
        return { ...prevErrors };
      });
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        ...confPasswordErrors,
      }));
    }
  };

  const validateUsername = () => {
    let usernameErrors = {};
    if (!username.trim()) {
      usernameErrors.username = "Username is required!";
    }

    if (Object.keys(usernameErrors).length === 0) {
      setError((prevErrors) => {
        delete prevErrors.username;
        return { ...prevErrors };
      });
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        ...usernameErrors,
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

  const handleConfPwdBlur = () => {
    validateConfPassword();
    setConfPasswordFocus(false);
  };

  const handleUsernameBlur = () => {
    validateUsername();
    setUsernameFocus(false);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userInfo = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userInfo.user;

      await updateProfile(user, { displayName: username });

      console.log(user);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError({ firebaseError: `${errorCode}: ${errorMessage}` });
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className={styles.signUpForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
            <div>
              <span className={usernameFocus ? styles.hideIcon : ""}>
                <AccountCircleIcon className={styles.formIcon} />
              </span>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={handleUsernameFocus}
                onBlur={handleUsernameBlur}
                required
              />
              <label
                htmlFor="username"
                className={usernameFocus ? styles.hideLabel : ""}
              >
                Username
              </label>
            </div>
            <div
              className={`${
                error.username ? styles.validationErr : styles.hideValidationErr
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{error.username}</p>
            </div>
          </div>
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
          <div className={styles.inputItem}>
            <div>
              <span className={confPasswordFocus ? styles.hideIcon : ""}>
                <LockIcon className={styles.formIcon} />
              </span>
              <input
                type="password"
                id="confirm"
                name="confirm"
                value={confPassword}
                onChange={(e) => setConfPassword(e.target.value)}
                onFocus={handleConfPasswordFocus}
                onBlur={handleConfPwdBlur}
                required
              />
              <label
                htmlFor="confirm"
                className={confPasswordFocus ? styles.hideLabel : ""}
              >
                Confirm Password
              </label>
            </div>
            <div
              className={`${
                error.confPassword
                  ? styles.validationErr
                  : styles.hideValidationErr
              }`}
            >
              <span className={styles.warnIcon}>
                <WarningAmberIcon fontSize="inherit" />
              </span>{" "}
              <p>{error.confPassword}</p>
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
              <button type="submit">Sign Up</button>
            </div>
            <div className={styles.signUpContainer}>
              <p>
                Don't have an account?{""}{" "}
                <Link className={styles.signUpLink} to={"/signin"}>
                  Sign In
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

export default SignUp;

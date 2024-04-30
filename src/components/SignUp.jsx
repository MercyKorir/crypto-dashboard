import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import styles from "../styles/SignUp.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const SignUp = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confPasswordFocus, setConfPasswordFocus] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
      setError(`${errorCode}: ${errorMessage}`);
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className={styles.signUpForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <div className={styles.inputItem}>
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
              onBlur={() => setUsernameFocus(false)}
              required
            />
            <label
              htmlFor="username"
              className={usernameFocus ? styles.hideLabel : ""}
            >
              Username
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
              onBlur={() => setEmailFocus(false)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={handlePasswordFocus}
              onBlur={() => setPasswordFocus(false)}
              required
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
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
              onFocus={handleConfPasswordFocus}
              onBlur={() => setConfPasswordFocus(false)}
              required
            />
            <label
              htmlFor="confirm"
              className={confPasswordFocus ? styles.hideLabel : ""}
            >
              Confirm Password
            </label>
          </div>
        </div>
        {error && <div className={styles.errorMessage}>{error}</div>}
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
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

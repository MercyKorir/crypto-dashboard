import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SignIn.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const SignIn = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      setError(`Error: ${errorCode} - ${errorMessage}`);
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
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

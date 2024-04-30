import React from "react";
import styles from "../styles/SignIn.module.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className={styles.loginForm}>
      <form action="">
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
        </div>
        <div>
          <Link to={"/"}>Forgot Password?</Link>
        </div>
        <div>
          <button>Login</button>
        </div>
        <div>
          <p>
            Don't have an account?{""} <Link to={"/signup"}>Sign Up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;

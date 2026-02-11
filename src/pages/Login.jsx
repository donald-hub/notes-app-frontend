import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import {setToken} from "../lib/auth";
import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const data = await loginUser({ email, password });

      // STEP 3 (partial): store token
      setToken(data.token);

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div className={styles.authPage}>
    <div className={styles.loginContainer}>
    <h2 className={styles.header}>Welcome back</h2>
    <p className={styles.authSub}>Sign in to your account</p>
    <form className={styles.loginForm} onSubmit={handleSubmit}>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <input className={styles.emailInput}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className={styles.passwordInput}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.submitButton} type="submit">Login</button>
    </form>
    <div className={styles.registerLink}>Don’t have an account?<Link to="/register"><span>Register</span></Link></div>
    </div>
    </div>
    </>
  );
};

export default Login;

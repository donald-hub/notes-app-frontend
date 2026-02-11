import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth";
import styles from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await registerUser({ name, email, password });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    <div className={styles.authPage}>
    <div className={styles.registerContainer}>
    <form onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      <p className={styles.authSub}>Start taking notes in seconds</p>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input className={styles.usernameInput}
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      
      <input className={styles.emailInput}
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input className={styles.passwordInput}
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.submitButton} type="submit">Register</button>
    </form>
    <div className={styles.loginLink}>Already registered? <Link to="/login"><span>Login</span></Link></div>
    </div>
    </div>
    </>
  );
};

export default Register;

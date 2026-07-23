import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/auth.js";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await forgotPassword(email);

      navigate("/verify-otp", {
        state: { email },
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
};

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>
        <h1 className={styles.header}>
          Forgot Password
        </h1>

        <p className={styles.authSub}>
          Enter your registered email address.
          <br />
          We'll send you a 6-digit OTP.
        </p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.emailInput}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}>
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
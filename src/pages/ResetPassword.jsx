import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../services/auth";
import styles from "./ResetPassword.module.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from VerifyOtp page
  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
        setLoading(true);
        await resetPassword(email, password);
        navigate("/login");
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Reset Password</h1>
      </div>

        <p className={styles.authSub}>
          Create a new password for your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.loginForm}
        >
          <div>
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading
              ? "Updating..."
              : "Reset Password"}
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

export default ResetPassword;
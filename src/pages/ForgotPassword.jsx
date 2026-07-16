import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/auth.js";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your registered email address.
          <br />
          We'll send you a 6-digit OTP.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition">
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
import { useRef, useState } from "react";
import { Link,useNavigate, useLocation  } from "react-router-dom";
import { verifyOtp } from "../services/auth";
import styles from "./VerifyOtp.module.css";



const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      otp[index] === "" &&
      index > 0
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const otpCode = otp.join("");

  if (otpCode.length !== 6) {
    setError("Please enter the complete OTP.");
    return;
  }

  try {
    setLoading(true);
    setError("");

    await verifyOtp(email, otpCode);

    navigate("/reset-password", {
      state: { email },
    });

  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.authPage}>
      <div className={styles.container}>

        <h1 className={styles.header}>
          Verify OTP
        </h1>

        <p className={styles.authSub}>
          Enter the 6-digit code sent to your email.
        </p>

        <form
          onSubmit={handleSubmit}
          className={styles.loginForm}
        >
          <div className="flex justify-between gap-2">

            {otp.map((digit, index) => (

              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) =>
                  handleChange(index, e.target.value)
                }
                onKeyDown={(e) =>
                  handleKeyDown(index, e)
                }
                className="w-12 h-14 text-center text-xl border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

            ))}

          </div>
            {error && (
            <p className="text-red-500 text-sm text-center mt-4">
                {error}
            </p>
            )}
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
            >
            {loading ? "Verifying..." : "Verify OTP"}
            </button>
        </form>

        <div className="text-center mt-6">

          <button
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>

        </div>

        <div className="text-center mt-3">

          <Link
            to="/login"
            className="text-gray-500 hover:underline text-sm"
          >
            Back to Login
          </Link>

        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;
import { useRef, useState } from "react";
import { Link,useNavigate, useLocation  } from "react-router-dom";
import { verifyOtp } from "../services/auth";




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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold text-center">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter the 6-digit code sent to your email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8"
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
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
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
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendurl } from "@/App";
import { ShopContext } from "@/components/context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  // Reset OTP-related state when mode/email changes
  useEffect(() => {
    setOtp("");
    setOtpSent(false);
    setOtpVerified(false);
    setNewPassword("");
  }, [currentState, email]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Send OTP for signup/reset
  const sendOtpHandler = async () => {
    if (!email) return toast.error("Enter email first");

    try {
      setLoading(true);

      const res = await axios.post(`${backendurl}/api/user/send-otp`, {
        email,
        type: currentState === "Sign Up" ? "signup" : "reset",
      });

      if (res.data.success) {
        toast.success("OTP sent");
        setOtpSent(true);
        setTimer(30);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const verifyOtpHandler = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      setLoading(true);

      const res = await axios.post(`${backendurl}/api/user/verify-otp`, {
        email,
        otp,
        type: currentState === "Sign Up" ? "signup" : "reset",
      });

      if (res.data.success) {
        toast.success("OTP verified");
        setOtpVerified(true);

        // Auto-register after successful OTP verification
        if (currentState === "Sign Up") {
          const register = await axios.post(`${backendurl}/api/user/register`, {
            name,
            email,
            password,
          });

          if (register.data.token) {
            setToken(register.data.token);
            localStorage.setItem("token", register.data.token);
            toast.success("Account created");
            navigate("/");
          }
        }
      } else {
        toast.error("Invalid OTP");
      }
    } catch {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  // Reset password after OTP verification
  const resetPasswordHandler = async () => {
    if (!newPassword) return toast.error("Enter new password");

    try {
      setLoading(true);

      const res = await axios.post(`${backendurl}/api/user/reset-password`, {
        email,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successful");
        setCurrentState("Login");
      } else {
        toast.error(res.data.message);
      }
    } catch {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  // Login or Signup
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (currentState === "Sign Up") {
        if (!otpVerified) return toast.error("Verify OTP first");

        response = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendurl}/api/user/login`, {
          email,
          password,
        });
      }

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-700 text-white items-center justify-center p-10">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-bold">
            {currentState === "Login" ? "Welcome Back 👋" : "Join Us 🚀"}
          </h1>
          <p className="text-orange-100">
            Manage your shopping experience with ease.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">
        <form
          onSubmit={
            currentState === "Forgot Password"
              ? (e) => e.preventDefault()
              : onSubmitHandler
          }
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold">{currentState}</h2>

          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />

          {currentState !== "Forgot Password" && (
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg pr-12"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-sm"
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          )}

          {(currentState === "Forgot Password" || currentState === "Sign Up") &&
            !otpSent && (
              <button
                type="button"
                onClick={sendOtpHandler}
                className="w-full bg-blue-500 text-white py-2 rounded-lg"
              >
                Send OTP
              </button>
            )}

          {(currentState === "Forgot Password" || currentState === "Sign Up") &&
            otpSent &&
            !otpVerified && (
              <div className="space-y-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  className="w-full p-3 border rounded-lg text-center tracking-widest"
                />
                <button
                  type="button"
                  onClick={verifyOtpHandler}
                  className="w-full bg-green-500 text-white py-2 rounded-lg"
                >
                  Verify OTP
                </button>
              </div>
            )}

          {currentState === "Forgot Password" && otpVerified && (
            <div className="space-y-2">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
              />
              <button
                type="button"
                onClick={resetPasswordHandler}
                className="w-full bg-orange-500 text-white py-2 rounded-lg"
              >
                Reset Password
              </button>
            </div>
          )}

          <div className="flex justify-between text-sm">
            {currentState === "Login" && (
              <span
                onClick={() => setCurrentState("Forgot Password")}
                className="text-gray-400 cursor-pointer"
              >
                Forgot password?
              </span>
            )}

            {currentState === "Login" && (
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-orange-500 cursor-pointer ml-auto"
              >
                Create account
              </span>
            )}

            {currentState !== "Login" && (
              <span
                onClick={() => setCurrentState("Login")}
                className="text-orange-500 cursor-pointer ml-auto"
              >
                Back to Login
              </span>
            )}
          </div>

          {currentState !== "Forgot Password" && (
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl"
            >
              {loading
                ? "Please wait..."
                : currentState === "Login"
                ? "Sign In"
                : "Sign Up"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
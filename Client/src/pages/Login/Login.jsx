import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendurl } from "@/App";
import { ShopContext } from "@/components/context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(ShopContext);

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  // Google login
  const handleGoogleLogin = () => {
    window.location.href = `${backendurl}/auth/google`;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (isLogin) {
        response = await axios.post(`${backendurl}/api/user/login`, {
          email,
          password,
        });
      } else {
        response = await axios.post(`${backendurl}/api/user/register`, {
          name,
          email,
          password,
        });
      }

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        navigate("/");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">

        {/* Title */}
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="space-y-4">

          {!isLogin && (
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          )}

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <div className="relative">
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete={isLogin ? "current-password" : "new-password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg pr-12 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-sm text-gray-500 hover:text-gray-700"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition text-white py-3 rounded-xl font-medium"
          >
            {loading
              ? "Please wait..."
              : isLogin
              ? "Login"
              : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <hr className="flex-1 border-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-medium
                     bg-white border border-gray-300 text-gray-700
                     transition-all duration-200
                     hover:bg-gray-100 hover:shadow-md
                     active:scale-95"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-5 h-5"
            alt="google"
          />
          Continue with Google
        </button>

        {/* Bottom Toggle */}
        <p className="text-center text-sm text-gray-500">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-500 font-medium cursor-pointer hover:underline"
          >
            {isLogin ? "Create account" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;
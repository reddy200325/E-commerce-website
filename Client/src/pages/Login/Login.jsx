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
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (currentState === "Sign Up") {
        response = await axios.post(
          `${backendurl}/api/user/register`,
          { name, email, password }
        );
      } else {
        response = await axios.post(
          `${backendurl}/api/user/login`,
          { email, password }
        );
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

  useEffect(() => {
    if (token) navigate("/");
  }, [token]);

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-orange-500 to-orange-700 text-white items-center justify-center p-10">
        <div className="max-w-md space-y-4">
          <h1 className="text-4xl font-bold leading-tight">
            {currentState === "Login" ? "Welcome Back 👋" : "Join Us 🚀"}
          </h1>
          <p className="text-orange-100">
            Manage your shopping experience with ease.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">

        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6"
        >

          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentState}
            </h2>
            <p className="text-sm text-gray-500">
              Enter your details below
            </p>
          </div>

          {/* NAME */}
          {currentState === "Sign Up" && (
            <input
              type="text"
              placeholder="Full Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          )}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none pr-12"
            />

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-3 text-sm text-gray-500"
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>

          {/* FOOTER LINKS */}
          <div className="flex justify-between text-sm">

            <span className="text-gray-400 cursor-pointer hover:text-gray-600">
              Forgot password?
            </span>

            {currentState === "Login" ? (
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-orange-500 font-medium cursor-pointer hover:underline"
              >
                Create account
              </span>
            ) : (
              <span
                onClick={() => setCurrentState("Login")}
                className="text-orange-500 font-medium cursor-pointer hover:underline"
              >
                Login instead
              </span>
            )}

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition active:scale-95"
          >
            {loading
              ? "Please wait..."
              : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
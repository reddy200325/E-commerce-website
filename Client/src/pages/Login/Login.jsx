import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendurl } from "../../App";
import { ShopContext } from "../../components/context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState("Login");

  const { token, setToken } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          `${backendurl}/api/user/register`,
          { name, email, password }
        );

        if (response.data.token) {
          setToken(response.data.token);
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }

      } else {
        const response = await axios.post(
          `${backendurl}/api/user/login`,
          { email, password }
        );

        if (response.data.token) {
          setToken(response.data.token);
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-orange-400 to-orange-600">

      {/* CARD */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-4"
      >

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {currentState}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Please enter your details
          </p>
        </div>

        {/* INPUTS */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* OPTIONS */}
        <div className="flex justify-between text-xs sm:text-sm">
          <span className="text-gray-400 cursor-pointer hover:text-gray-600">
            Forgot password?
          </span>

          {currentState === "Login" ? (
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-orange-500 font-medium cursor-pointer"
            >
              Create account
            </span>
          ) : (
            <span
              onClick={() => setCurrentState("Login")}
              className="text-orange-500 font-medium cursor-pointer"
            >
              Login instead
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full mt-2 bg-orange-500 text-white py-2.5 rounded-full hover:bg-orange-600 transition font-medium"
        >
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>

      </form>
    </div>
  );
};

export default Login;
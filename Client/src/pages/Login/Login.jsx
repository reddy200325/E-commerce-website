import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  return (
    <div className="min-h-screen flex justify-center items-center bg-[linear-gradient(135deg,#ff7739,#ff5500)]">

      <form className="bg-white p-8 max-[480px]:p-6 rounded-[15px] w-[90%] max-w-[350px] flex flex-col gap-4 shadow-[0_10px_25px_rgba(0,0,0,0.15)]">

        {/* HEADER */}
        <div className="text-center mb-2">
          <h2 className="text-[1.8rem] mb-1">{currentState}</h2>
          <p className="text-[0.9rem] text-[#777]">
            Welcome back! Please enter your details
          </p>
        </div>

        {/* INPUTS */}
        {currentState !== "Login" && (
          <input
            type="text"
            placeholder="Full Name"
            required
            className="w-full px-3 py-2.5 border border-[#ddd] rounded-[8px] outline-none focus:border-[#ff7739] focus:shadow-[0_0_5px_rgba(255,119,57,0.3)]"
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          required
          className="w-full px-3 py-2.5 border border-[#ddd] rounded-[8px] outline-none focus:border-[#ff7739] focus:shadow-[0_0_5px_rgba(255,119,57,0.3)]"
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-3 py-2.5 border border-[#ddd] rounded-[8px] outline-none focus:border-[#ff7739] focus:shadow-[0_0_5px_rgba(255,119,57,0.3)]"
        />

        {/* FOOTER */}
        <div className="flex justify-between text-[0.8rem] mt-1">
          <span className="text-[#999] cursor-pointer">
            Forgot password?
          </span>

          {currentState === "Login" ? (
            <span
              onClick={() => setCurrentState("Sign Up")}
              className="text-[#ff7739] font-medium cursor-pointer"
            >
              Create account
            </span>
          ) : (
            <span
              onClick={() => setCurrentState("Login")}
              className="text-[#ff7739] font-medium cursor-pointer"
            >
              Login instead
            </span>
          )}
        </div>

        {/* BUTTON */}
        <button className="w-full mt-2 bg-[#ff7739] text-white py-2.5 rounded-[25px] cursor-pointer hover:bg-[#ff5500] transition">
          {currentState === "Login" ? "Sign In" : "Sign Up"}
        </button>

      </form>
    </div>
  );
};

export default Login;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendurl } from '@/App';

const Login = ({ setToken }) => {

  // State for form inputs
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Handle form submission
  const OnSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(backendurl + "/api/user/admin", {
        email,
        password
      });

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    // Full screen centered container
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">

      {/* Login Card */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm animate-fadeIn">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Admin Panel
        </h2>

        {/* Login Form */}
        <form onSubmit={OnSubmitHandler}>

          {/* Email Input */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Email Address</p>
            <input
              type="email"
              placeholder="Enter Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>

          {/* Password Input */}
          <div className="mb-5">
            <p className="text-sm text-gray-600 mb-1">Password</p>
            <input
              type="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 active:scale-95 transition"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;
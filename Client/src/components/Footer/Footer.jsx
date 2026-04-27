import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 px-4 md:px-10 lg:px-20 py-10 md:py-14 flex flex-col gap-10">

      {/* Newsletter Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
          Need Update on Latest Offers?
        </h2>

        <p className="text-sm md:text-base text-gray-400">
          Subscribe to our newsletter to get frequent updates
        </p>

        {/* Input */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mt-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full sm:w-auto flex-1 px-4 py-3 rounded-xl sm:rounded-l-xl sm:rounded-r-none border border-gray-600 bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-xl sm:rounded-r-xl sm:rounded-l-none font-semibold text-black">
            Join now
          </button>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-700 pt-6">

        {/* Social Icons */}
        <div className="flex gap-5 text-lg">
          <FaFacebook className="cursor-pointer hover:text-orange-400 transition" />
          <FaInstagram className="cursor-pointer hover:text-orange-400 transition" />
          <FaYoutube className="cursor-pointer hover:text-orange-400 transition" />
        </div>

        {/* Links */}
        <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm md:text-base">
          <li className="cursor-pointer hover:text-orange-400 transition">Home</li>
          <li className="cursor-pointer hover:text-orange-400 transition">Service</li>
          <li className="cursor-pointer hover:text-orange-400 transition">About Us</li>
          <li className="cursor-pointer hover:text-orange-400 transition">Privacy policy</li>
        </ul>

      </div>

      {/* Copyright */}
      <p className="text-center text-xs md:text-sm text-gray-500">
        © 2026 stylewave. All rights reserved
      </p>

    </footer>
  );
};

export default Footer;
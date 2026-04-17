import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="flex flex-col gap-[30px] p-[60px]">

      <div className="grid place-content-center gap-[30px]">
        <h2 className="text-[40px] text-center">
          Need Update on Latest Offers?
        </h2>

        <p className="text-[18px] text-center">
          Subscribe to our newsletter to get frequent updates
        </p>

        <div className="flex items-center justify-center">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="flex-grow p-[15px] border-[2px] border-[#ff7739] border-r-0 rounded-tl-[20px] rounded-bl-[20px] outline-none text-[14px]"
          />

          <button className="bg-[#ff7739] text-black border-0 px-[20px] py-[17px] rounded-tr-[20px] rounded-br-[20px] font-bold cursor-pointer">
            Join now
          </button>
        </div>
      </div>

      <div className="flex justify-between">

        <div className="flex gap-[15px] mt-[10px]">
          <FaFacebook className="text-[20px]" />
          <FaInstagram className="text-[20px]" />
          <FaYoutube className="text-[20px]" />
        </div>

        <div>
          <ul className="flex gap-[15px]">
            <li className="text-[18px] list-none">Home</li>
            <li className="text-[18px] list-none">Service</li>
            <li className="text-[18px] list-none">About Us</li>
            <li className="text-[18px] list-none">Privacy policy</li>
          </ul>
        </div>

      </div>

      <p className="text-center">
        © 2024 stylewave. All rights reserved
      </p>

    </footer>
  );
};

export default Footer;
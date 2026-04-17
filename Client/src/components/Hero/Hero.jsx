import React from 'react'
import hero_img from '../../assets/woman1.png'
import { FaShippingFast } from 'react-icons/fa'
import { BiSupport } from "react-icons/bi"
import { MdPayment } from "react-icons/md"
import { FiSend } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="p-[30px]">

      {/* HERO TOP */}
      <div className="flex items-center justify-between gap-[50px] bg-[linear-gradient(135deg,#fff6f0,#ffffff)] rounded-[25px] p-[50px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <h2 className="text-[1.4rem] text-[#ff7739] tracking-[1px]">
            Unleash Your Unique Style
          </h2>

          <h1 className="text-[3.2rem] my-[12px] leading-[1.2] font-[700]">
            Fashion That Speaks For You
          </h1>

          <p className="text-[#555] mb-[25px] text-[16px]">
            Shop the latest trends and timeless essentials from our collections.
          </p>

          <button className="bg-[linear-gradient(135deg,#ff7739,#ff5500)] text-white border-0 px-[28px] py-[13px] rounded-[30px] text-[16px] cursor-pointer transition-all duration-300">
            Shop Now
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={hero_img}
            alt="fashion"
            className="max-w-full h-auto rounded-[20px]"
          />
        </div>

      </div>

      {/* HERO BOTTOM FEATURES */}
      <div className="grid grid-cols-4 gap-[20px] mt-[40px]">

        <div className="flex items-center gap-[15px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[10px] p-[18px] rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)]">
          <FaShippingFast className="text-[32px] text-[#ff7739]" />
          <div>
            <h3 className="text-[17px]">Free Shipping</h3>
            <p className="text-[14px] text-[#666]">On all orders</p>
          </div>
        </div>

        <div className="flex items-center gap-[15px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[10px] p-[18px] rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)]">
          <FiSend className="text-[32px] text-[#ff7739]" />
          <div>
            <h3 className="text-[17px]">Worldwide Delivery</h3>
            <p className="text-[14px] text-[#666]">We deliver globally</p>
          </div>
        </div>

        <div className="flex items-center gap-[15px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[10px] p-[18px] rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)]">
          <BiSupport className="text-[32px] text-[#ff7739]" />
          <div>
            <h3 className="text-[17px]">24/7 Support</h3>
            <p className="text-[14px] text-[#666]">Always here for you</p>
          </div>
        </div>

        <div className="flex items-center gap-[15px] bg-[rgba(255,255,255,0.7)] backdrop-blur-[10px] p-[18px] rounded-[15px] shadow-[0_5px_20px_rgba(0,0,0,0.05)]">
          <MdPayment className="text-[32px] text-[#ff7739]" />
          <div>
            <h3 className="text-[17px]">Secure Payment</h3>
            <p className="text-[14px] text-[#666]">100% safe checkout</p>
          </div>
        </div>

      </div>

    </section>
  )
}

export default Hero
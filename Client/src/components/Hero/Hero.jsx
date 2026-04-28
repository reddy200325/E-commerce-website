import React from 'react'
import hero_img from '@/assets/woman1.png'
import { FaShippingFast } from 'react-icons/fa'
import { BiSupport } from "react-icons/bi"
import { MdPayment } from "react-icons/md"
import { FiSend } from 'react-icons/fi'

const Hero = ({ bestSeller }) => {
  return (
    <section className="px-4 md:px-8 lg:px-12 py-6 md:py-10">

      {/* HERO TOP */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 bg-gradient-to-br from-orange-50 to-white rounded-3xl p-6 md:p-10 lg:p-14 shadow-sm">

        {/* LEFT SIDE */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-sm md:text-base text-orange-500 tracking-wide font-medium">
            Unleash Your Unique Style
          </h2>

          <h1 className="text-2xl md:text-4xl lg:text-5xl my-3 font-bold leading-tight">
            Fashion That Speaks For You
          </h1>

          <p className="text-gray-600 mb-6 text-sm md:text-base max-w-md mx-auto md:mx-0">
            Shop the latest trends and timeless essentials from our collections.
          </p>

          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition text-white px-6 py-3 rounded-full text-sm md:text-base shadow-md">
            Shop Now
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src={hero_img}
            alt="fashion"
            className="w-[80%] sm:w-[70%] md:w-full max-w-md object-contain"
          />
        </div>

      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10">

        {[ 
          { icon: <FaShippingFast />, title: "Free Shipping", desc: "On all orders" },
          { icon: <FiSend />, title: "Worldwide Delivery", desc: "We deliver globally" },
          { icon: <BiSupport />, title: "24/7 Support", desc: "Always here for you" },
          { icon: <MdPayment />, title: "Secure Payment", desc: "100% safe checkout" }
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            <div className="text-2xl text-orange-500">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm md:text-base font-medium">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">
                {item.desc}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* ✅ BEST SELLER (Conditional Rendering) */}
      {bestSeller && bestSeller.length > 0 && (
        <div className="mt-10">
          {/* Your Best Seller Component Here */}
        </div>
      )}

    </section>
  )
}

export default Hero
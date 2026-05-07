import React from "react";
import hero_img from "@/assets/woman1.png";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdPayment } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Hero = ({ bestSeller }) => {
  const navigate = useNavigate();

  return (
    <section className="px-4 md:px-8 lg:px-12 pt-4 md:pt-6 pb-6">

      {/* HERO */}
      <div className="bg-[#f7f3ef] rounded-[32px] overflow-hidden shadow-sm">

        <div className="grid md:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="px-6 md:px-12 lg:px-16 py-10 md:py-14">

            <p className="text-orange-500 text-sm font-medium tracking-wide mb-3">
              New Trend Collection
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900">
              Fashion
              <br />
              For Every
              <br />
              Moment
            </h1>

            <p className="mt-5 text-gray-600 text-sm md:text-base max-w-md leading-relaxed">
              Discover stylish outfits, timeless essentials and modern trends designed for your everyday lifestyle.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                onClick={() =>
                  document
                    .getElementById("home-collection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-orange-500 hover:bg-orange-600 transition text-white px-7 py-3 rounded-full text-sm font-medium shadow-md"
              >
                Shop Now
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("best-sellers")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border border-gray-300 hover:border-orange-500 hover:text-orange-500 transition px-7 py-3 rounded-full text-sm font-medium bg-white"
              >
                Explore
              </button>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center items-end h-full">

            <img
              src={hero_img}
              alt="fashion"
              className="w-[85%] md:w-full max-w-md object-contain"
            />

          </div>

        </div>

      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">

        {[
          {
            icon: <FaShippingFast />,
            title: "Free Shipping",
            desc: "All orders"
          },
          {
            icon: <FiSend />,
            title: "Worldwide",
            desc: "Fast delivery"
          },
          {
            icon: <BiSupport />,
            title: "24/7 Support",
            desc: "Always online"
          },
          {
            icon: <MdPayment />,
            title: "Secure Pay",
            desc: "Safe checkout"
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition"
          >

            <div className="text-orange-500 text-2xl">
              {item.icon}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {item.title}
              </h3>

              <p className="text-xs text-gray-500">
                {item.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

     

    </section>
  );
};

export default Hero;
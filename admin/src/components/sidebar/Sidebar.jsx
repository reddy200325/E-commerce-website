import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaCentos } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdFormatListBulleted, MdShoppingCart } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';

const Sidebar = ({ setToken }) => {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
       ? "bg-orange-500 text-white shadow-md"
       : "text-gray-600 hover:bg-gray-100"
     }`;

  return (
    <>
      {/* Mobile header with toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2">
          <FaCentos className="text-2xl" />
          <h1 className="text-lg font-semibold">StyleWave</h1>
        </div>
        <button onClick={() => setOpen(!open)}>
          <HiMenu className="text-2xl" />
        </button>
      </div>

      {/* Sidebar container */}
      <div className={`
        fixed top-0 left-0 z-40 h-full w-64 bg-gray-50 border-r p-4
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:block
      `}>
        <div className="hidden md:flex items-center gap-2 mb-6">
          <FaCentos className="text-3xl" />
          <h1 className="text-xl font-semibold">StyleWave</h1>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink to="/add" className={linkClass} onClick={() => setOpen(false)}>
            <IoMdAddCircleOutline className="text-xl" />
            <p className="text-sm md:text-base">Add Product</p>
          </NavLink>

          <NavLink to="/list" className={linkClass} onClick={() => setOpen(false)}>
            <MdFormatListBulleted className="text-xl" />
            <p className="text-sm md:text-base">List Products</p>
          </NavLink>

          <NavLink to="/order" className={linkClass} onClick={() => setOpen(false)}>
            <MdShoppingCart className="text-xl" />
            <p className="text-sm md:text-base">Orders</p>
          </NavLink>

          <hr className="my-3" />

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <IoLogOut className="text-xl" />
            <p className="text-sm md:text-base">Logout</p>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
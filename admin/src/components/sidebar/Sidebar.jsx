import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCentos } from 'react-icons/fa';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdFormatListBulleted, MdShoppingCart } from 'react-icons/md';
import { IoLogOut } from 'react-icons/io5';

const Sidebar = ({ setToken }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
     ${isActive
        ? "bg-orange-500 text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100"
     }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center text-xs
     ${isActive ? "text-orange-500" : "text-gray-500"}`;

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden md:block w-64 min-h-screen bg-gray-50 border-r p-4">
        <div className="flex items-center gap-2 mb-6">
          <FaCentos className="text-3xl" />
          <h1 className="text-xl font-semibold">StyleWave360</h1>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink to="/add" className={linkClass}>
            <IoMdAddCircleOutline className="text-xl" />
            <p>Add Product</p>
          </NavLink>

          <NavLink to="/list" className={linkClass}>
            <MdFormatListBulleted className="text-xl" />
            <p>List Products</p>
          </NavLink>

          <NavLink to="/order" className={linkClass}>
            <MdShoppingCart className="text-xl" />
            <p>Orders</p>
          </NavLink>

          <hr className="my-3" />

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <IoLogOut className="text-xl" />
            <p>Logout</p>
          </button>
        </div>
      </div>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around items-center py-2">

          <NavLink to="/add" className={mobileLinkClass}>
            <IoMdAddCircleOutline className="text-2xl" />
            <span>Add</span>
          </NavLink>

          <NavLink to="/list" className={mobileLinkClass}>
            <MdFormatListBulleted className="text-2xl" />
            <span>List</span>
          </NavLink>

          <NavLink to="/order" className={mobileLinkClass}>
            <MdShoppingCart className="text-2xl" />
            <span>Orders</span>
          </NavLink>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
            }}
            className="flex flex-col items-center text-gray-500 text-xs"
          >
            <IoLogOut className="text-2xl" />
            <span>Logout</span>
          </button>

        </div>
      </div>
    </>
  );
};

export default Sidebar;
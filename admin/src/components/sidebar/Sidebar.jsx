import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaCentos } from 'react-icons/fa'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdFormatListBulleted, MdShoppingCart } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'

const Sidebar = ({ setToken }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-4 rounded-md transition 
     ${isActive
      ? "bg-orange-500 text-white shadow"
      : "text-gray-600 hover:bg-gray-100"
    }`

  return (
    <div className="w-64 min-h-screen border-r bg-gray-50 p-4">

      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FaCentos className="text-3xl" />
        <h1 className="text-xl font-semibold">StyleWave</h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3">

        <NavLink to="/add" className={linkClass}>
          <IoMdAddCircleOutline className="text-xl" />
          <p className="hidden sm:block">Add Product</p>
        </NavLink>

        <NavLink to="/list" className={linkClass}>
          <MdFormatListBulleted className="text-xl" />
          <p className="hidden sm:block">List Products</p>
        </NavLink>

        <NavLink to="/order" className={linkClass}>
          <MdShoppingCart className="text-xl" />
          <p className="hidden sm:block">Orders</p>
        </NavLink>

        {/* Divider */}
        <hr className="my-3" />

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("token");
            setToken("");
          }}
          className="flex items-center gap-3 px-5 py-4 rounded-md text-gray-600 hover:bg-gray-100 transition"
        >
          <IoLogOut className="text-xl" />
          <p className="hidden sm:block">Logout</p>
        </button>

      </div>
    </div>
  )
}

export default Sidebar
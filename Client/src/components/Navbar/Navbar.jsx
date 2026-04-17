import React, { useContext, useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiUser, BiCart, BiMenu, BiX } from 'react-icons/bi'
import { FaCentos } from "react-icons/fa"
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
    const { updateSearchTerm, getCartCount } = useContext(ShopContext)

    const [loading, setLoading] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [searchInput, setSearchInput] = useState('')

    const profileRef = useRef()
    const navigate = useNavigate()

    const handleNavigation = (path) => {
        setLoading(true)
        setTimeout(() => setLoading(false), 200)
        navigate(path)
        setMenuOpen(false)
    }

    const handleSearch = () => {
        updateSearchTerm(searchInput)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <>
            {/* LOADER */}
            {loading && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[999]">
                    <FaCentos className="text-orange-500 text-5xl animate-spin" />
                </div>
            )}

            {/* NAVBAR */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b">

                {/* TOP */}
                <div className="flex items-center justify-between px-4 md:px-10 py-3">

                    {/* LOGO */}
                    <Link to="/">
                        <h2 className="text-2xl font-extrabold text-orange-500">
                            StyleWave
                        </h2>
                    </Link>

                    {/* MENU ICON */}
                    <div className="text-3xl md:hidden cursor-pointer"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <BiX /> : <BiMenu />}
                    </div>

                    {/* SEARCH */}
                    <div className="hidden md:flex flex-1 mx-6 max-w-xl">
                        <div className="flex w-full overflow-hidden rounded-full border focus-within:ring-2 focus-within:ring-orange-400">
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search products..."
                                className="w-full px-4 py-2 outline-none"
                            />
                            <button
                                onClick={handleSearch}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-5"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* ICONS */}
                    <div className="flex items-center gap-5">

                        {/* PROFILE */}
                        <div className="relative" ref={profileRef}>
                            <BiUser
                                className="text-2xl cursor-pointer hover:text-orange-500 transition"
                                onClick={() => setProfileOpen(!profileOpen)}
                            />

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-40 bg-white shadow-lg rounded-lg overflow-hidden border">
                                    <Link to="/login" className="block px-4 py-2 hover:bg-orange-50">
                                        Account
                                    </Link>
                                    <button
                                        className="w-full text-left px-4 py-2 hover:bg-orange-50"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* CART */}
                        <div
                            className="relative cursor-pointer"
                            onClick={() => handleNavigation("/cart")}
                        >
                            <BiCart className="text-2xl hover:text-orange-500 transition" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                                {getCartCount()}
                            </span>
                        </div>

                    </div>
                </div>

                {/* SEARCH MOBILE */}
                <div className="md:hidden px-4 pb-3">
                    <div className="flex rounded-full overflow-hidden border">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-3 py-2 outline-none"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-orange-500 text-white px-4"
                        >
                            Go
                        </button>
                    </div>
                </div>

                {/* BOTTOM MENU */}
                <div className={`${menuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row items-center justify-center gap-6 py-3 border-t`}> 

                    <button onClick={() => handleNavigation("/category/Men")}
                        className="hover:text-orange-500 font-medium"
                    >
                        Men
                    </button>

                    <button onClick={() => handleNavigation("/category/Women")}
                        className="hover:text-orange-500 font-medium"
                    >
                        Women
                    </button>

                    <button onClick={() => handleNavigation("/category/Kids")}
                        className="hover:text-orange-500 font-medium"
                    >
                        Kids
                    </button>

                </div>

            </nav>
        </>
    )
}

export default Navbar
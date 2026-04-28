import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Cart from "./pages/Cart/Cart"
import Collection from "./pages/Collection/Collection"
import ProductDetails from "./pages/ProductDetails/ProductDetails"
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { ToastContainer } from "react-toastify"
import Checkout from './pages/Checkout/Checkout'
import Order from './pages/Order/Order'

export const backendurl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:category" element={<Collection />} />
        <Route path="/category/:category/product/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />}/>
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Order />} />
      </Routes>
      <Footer />

    </div>
  )
}

export default App


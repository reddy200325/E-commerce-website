import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Collection from "./pages/Collection/Collection";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer';
import { ToastContainer } from "react-toastify";
import Checkout from './pages/Checkout/Checkout';
import Order from './pages/Order/Order';
import PrivacyPolicy from './components/Footer/PrivacyPolicy.jsx';
import AboutUs from './components/Footer/AboutUs.jsx';
import Service from './components/Footer/Service.jsx';
import GoogleSuccess from "./pages/GoogleSuccess";
import Verify from './pages/Payment/Verify.jsx';
import Profile from './pages/Login/Profile.jsx';



export const backendurl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        {/* Category & product routes */}
        <Route path="/category/:category" element={<Collection />} />
        <Route path="/category/:category/product/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/service" element={<Service />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;


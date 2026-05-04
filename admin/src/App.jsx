import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar.jsx';
import Add from './Pages/Add/Add.jsx';
import List from './Pages/List/list.jsx';
import Order from './Pages/Order/Order.jsx';
import Login from './components/Login/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export const backendurl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />

      {/* Login Screen */}
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex min-h-screen">
          <Sidebar setToken={setToken} />

          {/* Page Content */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Routes>
              <Route path="/add" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/order" element={<Order token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
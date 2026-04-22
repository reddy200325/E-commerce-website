import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Sidebar from './components/sidebar/sidebar.jsx'
import Add from './Pages/Add/Add.jsx';
import List from './Pages/list/list.jsx';
import Order from './Pages/Order/Order.jsx';
import Login from './components/Login/Login.jsx';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import './index.css'

export const backendurl = import.meta.env.VITE_BACKEND_URL
export const currency = "$"
const App = () => {
  const [token,setToken] = useState(localStorage.getItem("token") || "");
  useEffect(()=>{
    if(token){
      localStorage.setItem("token",token)
    }},[token])
  return (
      <div className='app-container'>
        <ToastContainer />  
        {token === "" ? (
          <Login setToken={setToken} />
        ):(
           <div className="app-content">
         <Sidebar setToken={setToken} />
          <div className="page-content">
            
            <Routes>
              <Route path="/add" element={<Add token={token } />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/order" element={<Order token={token} />} />
            </Routes>
          </div>
        </div>
        )
      }

      </div>
      
  )
}

export default App

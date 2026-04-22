import React from 'react'
import './login.css'
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendurl } from '../../App.jsx';
const login = ({setToken}) => {

  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  const OnSubmitHandler = async (e) => {
    try{
      e.preventDefault();
      const response = await axios.post(backendurl+"/api/user/admin",{
        email,
        password
      });
      console.log(response);

      if(response.data.success){
        setToken(response.data.token);
      }
      else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error)
      toast.error(error.message);
    }
    
  }
  return (
    <div>
      <div className="admin-panel-container">
        <div className="admin-panel-box">
          <div className="login-title">Admin Panel</div>
          <form onSubmit={OnSubmitHandler}>
            <div className="form-group">
              <p className="form-label">Email Address</p>
              <input onChange={(e)=>setEmail(e.target.value)}
              value={email} type="email" className="form-input" placeholder="Enter Email" required />
            </div>
            <div className="form-group">
              <p className="form-label">Password</p>
              <input onChange={(e)=>setPassword(e.target.value)}
              value={password} type="password" className="form-input" placeholder="Enter password" required />
            </div>
            <button type="submit" className="form-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default login

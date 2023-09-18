import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import toast from 'react-hot-toast';
import { UserContext } from "../../assets/context/userContext";
import nouser from "./img/OIP.jpeg"

const LoginPage = () => {
  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = loginData;
    try {
      const {data} = await axios.post('user/login',{
        email,
        password
      });
      if (data.error) {
        toast.error(data.error)
      }
      else{
        setloginData({});
        toast.success("Login successful");
        setUser(data)

        navigate('/home')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="Login">
      <div className="d-flex justify-content-center align-items-center vh-100 Login-in">
        <div className="bg-white p-3 rounded Login-in-in">
          <form onSubmit={loginUser}>
            <div className="mb-3 d-flex justify-content-center">
                  <img src={nouser} alt="Avatar" className="w-50 h-50  nouser" />      
            </div>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded"
                value={loginData?.email}
                onChange={(e)=>{setloginData({...loginData,email: e.target.value})}}
                required
                autoComplete=""
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="form-control rounded"
                value={loginData?.password}
                onChange={(e)=>{setloginData({...loginData,password: e.target.value})}}
                required
                autoComplete=""
              />
            </div>
            <button className="btn btn-success w-100">
              <strong>Log in</strong>
            </button>
            {/* <Link to="/forgot">Forgot password</Link> */}
            <p>Do you haven't account?</p>
            <Link
              to="/register"
              className="btn btn-default border w-100 bg-light"
            >
              Create account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

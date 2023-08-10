import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import axios from "axios";
import toast from 'react-hot-toast';
import { UserContext } from "../../assets/context/userContext";

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
      const {data} = await axios.post('login',{
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white p-3 rounded w-25">
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                className="form-control rounded"
                value={loginData.email}
                onChange={(e)=>{setloginData({...loginData,email: e.target.value})}}
                required
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
                value={loginData.password}
                onChange={(e)=>{setloginData({...loginData,password: e.target.value})}}
                required
              />
            </div>
            <button className="btn btn-success w-100">
              <strong>Log in</strong>
            </button>
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

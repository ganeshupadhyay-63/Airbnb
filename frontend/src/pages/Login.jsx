import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { AuthDataContext } from "../Context/AuthContext";
import { UserDataContext } from '../Context/UserContext';
import axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { serverUrl, setLoading } = useContext(AuthDataContext); // ✅ destructure both here
  const { userData, setUserData } = useContext(UserDataContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingState, setLoadingState] = useState(false); // ✅ fallback if setLoading not from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading?.(true) || setLoadingState(true); // optional chaining

    try {
      const res = await axios.post(`${serverUrl}/api/auth/login`, {
        email,
        password
      }, { withCredentials: true });

      setUserData(res.data);
      localStorage.setItem("token", res.data.token);
      toast.success("Login Successfully")
      navigate("/");

    } catch (error) {
      setLoading(false)
      console.log(error)
      toast.success(error.response.data.message)
    } finally {
      setLoading?.(false) || setLoadingState(false);
    }
  };

  const effectiveLoading = loadingState; // fallback if loading not in context

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-300'>
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      <form
        onSubmit={handleLogin}
        className="max-w-[800px] w-[60%] h-[550px] bg-white shadow-md p-8 flex items-center justify-center flex-col md:items-start gap-[20px] rounded-lg"
      >
        <h1 className="text-[25px] text-black mb-4"><strong>Welcome to Airbnb</strong></h1>

        <div className='w-[70%] flex items-start justify-start flex-col gap-[8px]'>
          <label htmlFor='email' className='text-gray-700'><b>Email</b></label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border w-full p-2 rounded-lg text-[18px] px-[20px]'
            required
          />
        </div>

        <div className='w-[70%] flex items-start justify-start flex-col gap-[8px] relative'>
          <label htmlFor='password' className='text-gray-700 font-bold'>Password</label>
          <input
            type={show ? "text" : "password"}
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border w-full p-2 rounded-lg text-[18px] px-[20px]'
            required
          />
          {!show ? (
            <FaEye
              className='w-[20px] h-[20px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(true)}
            />
          ) : (
            <FaEyeSlash
              className='w-[20px] h-[20px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(false)}
            />
          )}
        </div>

        <button
          type="submit"
          className='px-[50px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700'
          disabled={effectiveLoading}
        >
          {effectiveLoading ? "Loading..." : "Login"}
        </button>

        <p className="text-[18px]">
          Don't have an account?{' '}
          <span
            className="text-[19px] text-red-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;

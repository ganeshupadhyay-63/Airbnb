import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { AuthDataContext } from '../Context/authContext'; 
import { UserDataContext } from '../Context/UserContext';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  let [show, setShow] = useState(false);
  const navigate = useNavigate();
  let { serverUrl, loading, setLoading } = useContext(AuthDataContext); 
let { userData, setUserData } = useContext(UserDataContext);


  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");


  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      let result = await axios.post(serverUrl + "/api/auth/signup", {
        name,       
        email,
        password
      }, { withCredentials: true })
      setLoading(false)
      setUserData(result.data)
       toast.success("SignUp Sucessfully")
      navigate("/")
      

      

      console.log(result);
    
      navigate("/login"); 
    } catch (error) {
      if (error.response) {
        console.error("Backend error:", error.response.data);
        alert(error.response.data.message || "Signup failed");
      } else {
        console.error("Error:", error.message);
          toast.error("Something went wrong")
        
      }
    }
  };

  return (
    <div className='w-[100vw] h-[100vh] flex items-center justify-center bg-gray-300'>
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      <form
        className="max-w-[800px] w-[60%] h-[550px] bg-white shadow-md p-8 flex items-center justify-center flex-col md:items-start gap-[20px] rounded-lg"
        onSubmit={handleSignup}
      >
        <h1 className="text-[25px] text-black mb-4"><strong>Welcome to Airbnb</strong></h1>

        <div className='w-[70%] flex items-start justify-start flex-col gap-[8px]'>
          <label htmlFor='name' className='text-gray-700 text-[15px] font-bold'>Name</label>
          <input
            type='text'
            id='name'
            className='border w-full p-2 rounded-lg text-[18px] px-[20px]'
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className='w-[70%] flex items-start justify-start flex-col gap-[8px]'>
          <label htmlFor='email' className='text-gray-700 font-bold'>Email</label>
          <input
            type='email'
            id='email'
            className='border w-full p-2 rounded-lg text-[18px] px-[20px]'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className='w-[70%] flex items-start justify-start flex-col gap-[8px] relative'>
          <label htmlFor='password' className='text-gray-700 font-bold'>Password</label>
          <input
            type={show ? "text" : "password"}
            id='password'
            className='border w-full p-2 rounded-lg text-[18px] px-[20px]'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {!show ? (
            <FaEye
              className='w-[20px] h-[20px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            />
          ) : (
            <FaEyeSlash
              className='w-[20px] h-[20px] absolute right-[12%] bottom-[10px] cursor-pointer'
              onClick={() => setShow(prev => !prev)}
            />
          )}
        </div>

        <button
          type="submit"
          className='px-[50px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700' disabled={loading}
        >
          {loading?"Loading...":"SignUp"}
        </button>

        <p className="text-[18px]">
          Already have an account?{' '}
          <span
            className="text-[19px] text-red-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default Signup;

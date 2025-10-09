import React, {useContext} from 'react';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContextProvider from './Context/AuthContext';
import ListingPage1 from './pages/ListingPage1';
import ListingPage2 from './pages/ListingPage2';
import ListingPage3 from './pages/ListingPage3';
import MyListing from './pages/MyListing';
import ViewCard from './pages/viewCard'
import MyBooking from './pages/MyBooking';
import Booked from './pages/Booked';

import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';
import UserContextProvider, { UserDataContext } from './Context/UserContext';




 function App() {
  let { userData } = useContext(UserDataContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/listingpage1'
         element={userData != null ? <ListingPage1 />:<Navigate to={"/"}/>} />
        <Route path='/listingpage2'
         element={userData != null ? <ListingPage2 />:<Navigate to={"/"}/>} />
        <Route path='/listingpage3'
         element={userData != null ? <ListingPage3 />:<Navigate to={"/"}/>} />
          <Route path='/mylisting'
         element={userData != null ? <MyListing />:<Navigate to={"/"}/>} />
         <Route path='/viewcard'
         element={userData != null ? <ViewCard />:<Navigate to={"/"}/>} />
          <Route path='/mybooking'
         element={userData != null ? <MyBooking />:<Navigate to={"/"}/>} />
          <Route path='/booked'
         element={userData != null ? <Booked />:<Navigate to={"/"}/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
export default App;

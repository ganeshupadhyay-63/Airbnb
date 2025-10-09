import React, { createContext, useState, useContext } from 'react';
import axios from "axios";
import { AuthDataContext } from './AuthContext.jsx';
import { UserDataContext } from "./UserContext";
import { listingDataContext } from "./ListingContext";
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export const bookingDataContext = createContext();

function BookingContextProvider({ children }) {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(AuthDataContext);
  let { getCurrentUser } = useContext(UserDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState(null);
  let [booking,setBooking] = useState(false);
  let navigate = useNavigate();


  const handleBooking = async (id) => {
    setBooking(true)
    if (!checkIn || !checkOut || total <= 0) {
      console.error("Invalid booking details");
      setBooking(false)
      return;
    }
    try {
      let result = await axios.post(
        `${serverUrl}/api/booking/create/${id}`,
        { checkIn, checkOut, totalRent: total },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      setBookingData(result.data);
      console.log( result.data);
      toast.success("Booking Successfully")
      setBooking(false)
      navigate("/booked", { state: { bookingData: result.data } });

    } catch (error) {
      console.log( error);
      toast.error(error.response.data.message)
      setBookingData(null);
      
    }
  };

 const cancelBooking = async (id) => {
  try {
    const result = await axios.delete(
      `${serverUrl}/api/booking/cancel/${id}`,
      { withCredentials: true } 
    );
    await getCurrentUser();
    await getListing();
    console.log( result.data);
    toast.success("Booking Cancel Successfully")
  } catch (error) {
    console.error( error);
    toast.error(error.response.data.message)
  }
};

  const value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking
  };

  return (
    <bookingDataContext.Provider value={value}>
      {children}
    </bookingDataContext.Provider>
  );
}

export default BookingContextProvider;

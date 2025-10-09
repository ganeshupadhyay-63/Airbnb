import React, { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserDataContext } from "../Context/UserContext";

import Card from "../Component/Card";

function MyBooking() {
  let navigate = useNavigate();
  let {userData} = useContext(UserDataContext)

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative">
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:-1[600px]">
        My Booking
      </div>
       <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {userData.booking.map((list) => (
          <Card
            key={list._id}
            title={list.title}
            landmark={list.landmark}
            city={list.city}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
            rent={list.rent}
            id={list._id}
            isBooked={list.isBooked}
            ratings={list.ratings}
            host={list.host}
          />
        ))}

        {(!userData.booking || userData.booking.length === 0) && (
  <div className="text-gray-500 text-xl mt-10 text-center w-full">
    You have no bookings yet.
  </div>
)}
      </div>
     
    </div>
  );
}

export default MyBooking;

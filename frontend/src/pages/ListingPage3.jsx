import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage3() {
  let navigate = useNavigate();
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backEndImage1,
    setBackEndImage1,
    backEndImage2,
    setBackEndImage2,
    backEndImage3,
    setBackEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    handleAddListing,
    adding,setAdding
  } = useContext(listingDataContext);

  return (
    <div className="w-[100%] h-[100vh] bg-white flex flex-col items-center justify-center relative overflow-auto">
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/listingpage2")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px] mx-auto">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[80px] md:px-[0px]">
          {`In ${landmark.toUpperCase()}, ${city.toUpperCase()}`}
        </h1>
      </div>

      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row mx-auto">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
          <img src={frontEndImage1} alt="" className="w-[100%]" />
        </div>

        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] ">
            <img src={frontEndImage2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] ">
            <img src={frontEndImage3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[20px]"><b>{`${title.toUpperCase()} ${category.toUpperCase()}, ${landmark.toUpperCase()}`}</b></div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[18px] text-gray-800">{`${description.toUpperCase()} `}</div>
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[18px]">Rs.{`${rent} /Day`}</div>

      <div className="w-[95%] h-[50px] flex items-center justify-start px-[100px]">
        <button
          type="submit"
          className='px-[30px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700 text--nowrap' onClick={handleAddListing} disabled={adding}
        >
          {adding? "adding...":"Add Listing"}
        </button>
      </div>
    </div>
  );
}
export default ListingPage3;

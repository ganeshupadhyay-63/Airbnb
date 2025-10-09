import React, {useContext} from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiVillage } from "react-icons/gi";
import { PiFarmDuotone } from "react-icons/pi";
import { MdBedroomChild } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { IoBedOutline } from "react-icons/io5";
import { GiWoodCabin } from "react-icons/gi";
import { FaShop } from "react-icons/fa6";
import {listingDataContext} from '../Context/ListingContext'

function ListingPage2() {
  let navigate = useNavigate();
  let {category, setCategory} = useContext(listingDataContext)
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto relative">
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-[190px] h-[45px] text-[18px] bg-red-600 cursor-pointer absolute top-[5%] right-[10px] rounded-[30px] flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300">
        set your Category
      </div>

      <div className="max-w-[800px] w-[100%] h-[550px] bg-white flex items-center justify-start flex-col gap-[40px] rounded-lg overflow-auto mt-[30px]">

      <h1 className="text-[20px] text-black md:text[30px] px-[10px]"><b>Which of these best describes your place?</b></h1>

      <div className="max-w-[800px] w-[100%] h-[100%] flex flex-wrap items-center justify-center gap-[15px] md:w-[70%]">

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="villa"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("villa")}>
          <GiVillage className="w-[40px] h-[40px] text-[black]" />
          <h3>Villa</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="farmHouse"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("farmHouse")} >
          <PiFarmDuotone className="w-[40px] h-[40px] text-[black]" />
          <h3>Farm House</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="rooms"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("rooms")}>
          <MdBedroomChild className="w-[40px] h-[40px] text-[black]" />
          <h3>Rooms</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="poolHouse"? "border-3 border-[#8b8b8b]":""} `} onClick={()=>setCategory("poolHouse")}>
          <MdOutlinePool className="w-[40px] h-[40px] text-[black]" />
          <h3>Pool House</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="flat"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("flat")}>
          <RiHotelLine className="w-[40px] h-[40px] text-[black]" />
          <h3>Flat</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="pg"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("pg")}>
          <IoBedOutline className="w-[40px] h-[40px] text-[black]" />
          <h3>PG</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="cabin"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("cabins")}>
          <GiWoodCabin className="w-[40px] h-[40px] text-[black]" />
          <h3>Cabins</h3>
        </div>

        <div className={`w-[180px] h-[100px] flex justify-center items-center flex-col cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg ${category=="shops"? "border-3 border-[#8b8b8b]":""}`} onClick={()=>setCategory("shops")}>
          <FaShop className="w-[40px] h-[40px] text-[black]" />
          <h3>Shops</h3>
        </div>

      </div>
       <button
          type="submit"
          className='px-[50px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700 absolute right-[10%] bottom-[1%] ' onClick={()=>navigate("/listingpage3")} disabled={!category}
        >
          Next
        </button>

      </div>
    </div>
  );
}
export default ListingPage2;

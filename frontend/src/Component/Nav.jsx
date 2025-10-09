import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthContext";
import { UserDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import ViewCard from "../pages/ViewCard"


import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot, MdBedroomChild, MdOutlinePool } from "react-icons/md";
import { GiVillage, GiWoodCabin } from "react-icons/gi";
import { PiFarmDuotone } from "react-icons/pi";
import { RiHotelLine } from "react-icons/ri";
import { IoBedOutline } from "react-icons/io5";
import { FaShop } from "react-icons/fa6";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Nav() {
  let [showpopup, setShowpopup] = useState(false);
  let { userData, setUserData } = useContext(UserDataContext);
  let { serverUrl } = useContext(AuthDataContext);
  let { listingData, setNewListData, searchData,handleSearch,handleViewCard } = useContext(listingDataContext);
  let [input, setInput] = useState("")
  let [cate, setCate] = useState("Trending"); // default category
  let navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUserData(null);
      console.log( result);
       toast.success("Logged out successfully");
        navigate("/login"); 
    } catch (error) {
      console.log(error);
       toast.success(error.response.data.message);
    }
  };

  const handleCategory = (category) => {
    setCate(category);

    if (category === "Trending") {
      // Show ALL listings when Trending is selected
      setNewListData(listingData);
      return;
    }

    // Filter listings with case-insensitive match on category
    const filtered = listingData.filter((list) => {
      if (!list.category) return false;
      return list.category.toLowerCase().trim() === category.toLowerCase().trim();
    });

    setNewListData(filtered);
  };

  React.useEffect(() => {
    handleCategory("Trending");
  }, [listingData]);


  const handleClick = (id) => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };

    useEffect(()=>{
      handleSearch(input)

    },[input]);

  return (
    <div className="fixed top-0 left-0 bg-[white] z-[20] w-full">
      <div className="w-full min-h-[60px] md:min-h-[80px] border-b border-[#dcdcdc] px-4 md:px-10 flex items-center justify-between">

        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-[130px] min-w-[130px] max-w-[130px] object-contain"
          />
        </div>

        <div className="w-[35%] relative hidden md:block">
          <input
            type="text"
            value={input}
            className="w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px] hover:shadow-lg transition"
            placeholder="Any Where | Any Location | Any City" onChange={(e)=>setInput(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-[3%] top-[5px] px-4 h-[39px] bg-[#f8f9fa] border border-[#dadce0] rounded-md hover:shadow transition"
          >
            <FaSearch className="w-[20px] h-[20px] text-gray-600" />
          </button>
        </div>

        <div className="relative flex items-center justify-center gap-[10px]">
          <span
            className="text-[18px] cursor-pointer rounded-full hover:bg-[#ded9d9] px-[18px] py-[5px] hidden md:block"
            onClick={() => navigate("/listingpage1")}
          >
            List your home
          </span>

          <button
            className="px-[19px] py-[10px] flex items-center justify-center gap-[10px] border border-[#8d8c8c] rounded-full hover:shadow-lg transition"
            onClick={() => setShowpopup((prev) => !prev)}
          >
            <RxHamburgerMenu className="w-[23px] h-[23px]" />
            {userData ? (
              <span className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center">
                {userData.name?.[0]}
              </span>
            ) : (
              <CgProfile className="w-[23px] h-[23px]" />
            )}
          </button>

          {showpopup && (
            <div className="absolute top-full mt-2 right-0 w-[220px] h-[250px] bg-slate-50 border border-[#aaa9a9] z-[50] rounded-lg shadow-lg md:right-[10%]">
              <ul className="w-full h-full text-[17px] flex flex-col items-start justify-around py-[10px]">
                {!userData && (
                  <li
                    className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={() => {
                      navigate("/login");
                      setShowpopup(false);
                    }}
                  >
                    Login
                  </li>
                )}

                {userData && (
                  <li
                    className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                    onClick={async () => {
                      await handleLogOut();
                      setShowpopup(false);
                    }}
                  >
                    Logout
                  </li>
                )}

                <div className="w-full h-[1px] bg-[#c1c0c0]"></div>

                <li
                  className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"
                  onClick={() => {
                    navigate("/listingpage1");
                    setShowpopup(false);
                  }}
                >
                  List your Home
                </li>

                <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer"  onClick={() => {
                    navigate("/mylisting");
                    setShowpopup(false);
                  }}>
                  My Listing
                </li>
                <li className="w-full px-[15px] py-[10px] hover:bg-[#f4f3f3] cursor-pointer" onClick={() => {
                    navigate("/mybooking");
                    setShowpopup(false);
                  }}>
                  My Booking
                </li>
              </ul>
            </div>
          )}
        </div>
       {searchData?.length>0 && <div className="w-[100vw] h-[400px] flex flex-col gap-[20px] absolute top-[50%] overflow-auto left-[0] justify-start items-center mt-[30px] md:mt-[5px]">
          <div className="max-w-[700px] w-[100vw] h-[300px] overflow-hidden flex flex-col bg-[#fefdfd] pp-[20px] rounded-lg border-[1px] border-[#a2a1a1] cursor-pointer">
            {
              searchData.map((search)=>(
                <div className="border-b border-[black] p-[10px]" onClick={()=>handleClick(search._id)}>
                  {search.title},{search.city}
                </div>
              ))
            }

          </div>
        </div>}

      </div>

      {/* Search Bar (Mobile) */}
      <div className="w-full h-[60%] flex items-center justify-center md:hidden">
        <div className="w-[80%] relative">
          <input
            type="text"
            value={input}
            className="w-full px-[30px] py-[10px] border-2 border-[#bdbaba] outline-none rounded-[30px] text-[17px] hover:shadow-lg transition"
            placeholder="Any Where | Any Location | Any City" onChange={(e)=>setInput(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-[3%] top-[5px] px-4 h-[39px] bg-[#f8f9fa] border border-[#dadce0] rounded-md hover:shadow transition"
          >
            <FaSearch className="w-[20px] h-[20px] text-gray-600" />
          </button>
        </div>
      </div>

      {/* Category Icons */}
      <div className="w-full h-[85px] bg-white flex items-center justify-start gap-[12px] overflow-x-auto md:justify-center px-[15px] scrollbar-thin border-b border-[#dcdcdc]">
        {[
          { icon: <MdWhatshot />, label: "Trending" },
          { icon: <GiVillage />, label: "Villa" },
          { icon: <PiFarmDuotone />, label: "Farm House" },
          { icon: <MdOutlinePool />, label: "Pool House" },
          { icon: <MdBedroomChild />, label: "Rooms" },
          { icon: <RiHotelLine />, label: "Flat" },
          { icon: <IoBedOutline />, label: "PG" },
          { icon: <GiWoodCabin />, label: "Cabins" },
          { icon: <FaShop />, label: "Shop" },
        ].map((item, idx) => {
          const isActive = cate === item.label;

          return (
            <div
              key={idx}
              className={`flex items-center justify-center flex-col cursor-pointer text-[13px] text-nowrap px-3 py-1 border-transparent border-b-2 transition ${
                isActive
                  ? "border-b-[2px] border-[#a6a5a5] font-semibold"
                  : "hover:border-b-[2px] hover:border-[#ccc]"
              }`}
              onClick={() => handleCategory(item.label)}
            >
              {React.cloneElement(item.icon, {
                className: "w-[30px] h-[30px] text-black",
              })}
              <h3>{item.label}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Nav;

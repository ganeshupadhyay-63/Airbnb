import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {listingDataContext} from '../Context/ListingContext'

function ListingPage1() {
  let navigate = useNavigate()
  let {
    title, setTitle,
    description, setDescription,
    frontEndImage1, setFrontEndImage1,
    frontEndImage2, setFrontEndImage2,
    frontEndImage3, setFrontEndImage3,
    backEndImage1, setBackEndImage1,
    backEndImage2, setBackEndImage2,
    backEndImage3, setBackEndImage3,
    rent, setRent,
    city, setCity,
    landmark, setLandmark,
    category, setCategory
  } = useContext(listingDataContext)

  const handleImage1 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage1(file)
    setFrontEndImage1(URL.createObjectURL(file))
  }
   const handleImage2 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage2(file)
    setFrontEndImage2(URL.createObjectURL(file))
  }
   const handleImage3 = (e)=>{
    let file = e.target.files[0]
    setBackEndImage3(file)
    setFrontEndImage3(URL.createObjectURL(file))
  }
  return (
    <div className="w-[100%] h-[100vh] bg-white flex items-center justify-center relative overflow-auto">
      <form
  className="max-w-[900px] w-[90%] h-[550px] bg-white shadow-md p-8 flex items-center justify-start flex-col md:items-start gap-[20px] rounded-lg overflow-auto mt-[70px]"
  onSubmit={(e) => {
    e.preventDefault();
    navigate("/listingpage2");
  }}
>

        <div
          className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
        </div>

        <div className="w-[190px] h-[45px] text-[18px] bg-red-600 cursor-pointer absolute top-[5%] right-[10px] rounded-[30px] flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300">
          setUp your Home
        </div>

        <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="title" className="text-gray-700">
            <b>Title</b>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]" required
          />
        </div>

        <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="description" className="text-gray-700">
            <b>Description</b>
          </label>
          <textarea
            name=""
            id="description"
            placeholder=""
             value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" w-full h-[80px] border-[2px] p-2 rounded-lg text-[18px] px-[20px]" required
          ></textarea>
        </div>

        <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="img1" className="text-gray-700">
            <b>Image1</b>
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[30px]">
          <input
            type="file"
            id="img1"
            onChange={handleImage1}
            className="w-[100%] text-[15px] px-[20px] rounded-[50px]" required
          />
          </div>
        </div>

         <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="img2" className="text-gray-700">
            <b>Image2</b>
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[30px]">
          <input
            type="file"
            id="img2"
            onChange={handleImage2}
            className="w-[100%] text-[15px] px-[20px] rounded-[50px] " required
          />
          </div>
        </div>


         <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="img3" className="text-gray-700">
            <b>Image3</b>
          </label>
          <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[30px]">
          <input
            type="file"
            id="img3"
            onChange={handleImage3}
            className="w-[100%] text-[15px] px-[20px] rounded-[50px]" required
          />
          </div>
        </div>

         <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="rent" className="text-gray-700">
            <b>Rent</b>
          </label>
          <input
            type="number"
            id="rent"
            placeholder="e.g Rs--/day"
            value={rent}
            onChange={(e) => setRent(e.target.value)}
            className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px] " required
          />
        </div>

         <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="city" className="text-gray-700">
            <b>City</b>
          </label>
          <input
            type="text"
            id="city"
            placeholder="city or country"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]" required
          />
        </div>

         <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
          <label htmlFor="landmark" className="text-gray-700">
            <b>LandMark</b>
          </label>
          <input
            type="text"
            id="landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]" required
          />
        </div>
        <button
          type="submit"
          className='px-[50px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700'
        >
          Next
        </button>

      </form>
    </div>
  );
}
export default ListingPage1;

import React, { useContext, useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { UserDataContext } from "../Context/UserContext";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { AuthDataContext } from "../Context/AuthContext";
import { RiStarSFill } from "react-icons/ri";
import { bookingDataContext } from "../Context/BookingContext.jsx";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function ViewCard() {
  let navigate = useNavigate();
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(UserDataContext);
  let { serverUrl } = useContext(AuthDataContext);

  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
  let [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  let [title, setTitle] = useState(cardDetails.title);
  let [description, setDescription] = useState(cardDetails.description);
  let [backEndImage1, setBackEndImage1] = useState(null);
  let [backEndImage2, setBackEndImage2] = useState(null);
  let [backEndImage3, setBackEndImage3] = useState(null);
  let [rent, setRent] = useState(
    cardDetails.rent ? cardDetails.rent.toString() : ""
  );
  let [city, setCity] = useState(cardDetails.city);
  let [landmark, setLandmark] = useState(cardDetails.landmark);

  let [updating, setUpdating] = useState(false);
  let [deleting, setDeleting] = useState(false);
  let [minDate, setMinDate] = useState("");
  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
    booking
  } = useContext(bookingDataContext);

  useEffect(() => {
    if (checkIn && checkOut) {
      let InDate = new Date(checkIn);
      let OutDate = new Date(checkOut);
      let n = (OutDate - InDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      let airBnbCharge = cardDetails.rent * (7 / 100);
      let tax = cardDetails.rent * (7 / 100);
      if (n > 0) {
        setTotal(cardDetails.rent * n + airBnbCharge + tax);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails.rent, total]);

  const handleUpdateListing = async () => {
    setUpdating(true);
    try {
      let formData = new FormData();
      formData.append("title", title);
      if (backEndImage1) formData.append("image1", backEndImage1);
      if (backEndImage2) formData.append("image2", backEndImage2);
      if (backEndImage3) formData.append("image3", backEndImage3);
      formData.append("description", description);
      formData.append("rent", Number(rent));
      formData.append("city", city);
      formData.append("landmark", landmark);

      let result = await axios.post(
        `${serverUrl}/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(result);
      toast.success("Listing Updated")

      // Reset fields (optional)
      setTitle("");
      setDescription("");
      setBackEndImage1(null);
      setBackEndImage2(null);
      setBackEndImage3(null);
      setRent("");
      setCity("");
      setLandmark("");

      navigate("/");
    } catch (error) {
      setUpdating(false);
      console.log(error);
      toast.error(error.response.data.message)
    }
  };

  const handleDeleteListing = async () => {
    setDeleting(true);

    try {
  let result = await axios.delete(
    `${serverUrl}/api/listing/delete/${cardDetails._id}`,
    {
      withCredentials: true,
    }
  );

  if (result.status === 200 || result.status === 201) {
    toast.success("List Deleted");
    navigate("/");
  } else {
    console.warn("Unexpected response status:", result.status);
  }

} catch (error) {
  console.error("Failed to delete listing:", error);
  toast.error(error?.response?.data?.message || "Failed to delete listing");
} finally {
  setDeleting(false);
  setShowDeleteConfirm(false);
}
  }

  const handleImage1 = (e) => setBackEndImage1(e.target.files[0]);
  const handleImage2 = (e) => setBackEndImage2(e.target.files[0]);
  const handleImage3 = (e) => setBackEndImage3(e.target.files[0]);

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <div className="w-[100%] h-[100vh] bg-white flex flex-col items-center justify-center relative overflow-auto">
      {/* Back button */}
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[5%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      {/* Location Title */}
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-[10px] mx-auto">
        <h1 className="text-[20px] text-[#272727] md:text-[30px] text-ellipsis text-nowrap overflow-hidden px-[80px] md:px-[0px]">
          {`In ${cardDetails.landmark.toUpperCase()}, ${cardDetails.city.toUpperCase()}`}
        </h1>
      </div>

      {/* Images */}
      <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row mx-auto">
        <div className="w-[100%] h-[65%] md:w-[70%] md:h-[100%] overflow-hidden flex items-center justify-center border-[2px]">
          <img src={cardDetails.image1} alt="" className="w-[100%]" />
        </div>

        <div className="w-[100%] h-[50%] flex items-center justify-center md:w-[30%] md:h-[100%] md:flex-col">
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] ">
            <img src={cardDetails.image2} alt="" className="w-[100%]" />
          </div>
          <div className="w-[100%] h-[100%] overflow-hidden flex items-center justify-center border-[2px] ">
            <img src={cardDetails.image3} alt="" className="w-[100%]" />
          </div>
        </div>
      </div>

      {/* Title and Category */}
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[20px]">
        <b>{`${cardDetails.title.toUpperCase()} ${cardDetails.category.toUpperCase()}, ${cardDetails.landmark.toUpperCase()}`}</b>
      </div>

      {/* Description */}
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[18px] text-gray-800">
        {cardDetails.description.toUpperCase()}
      </div>

      {/* Rent */}
      <div className="w-[95%] flex items-start justify-start text-[18px] md:w-[80%] md:text-[18px]">
        Rs.{`${cardDetails.rent} /Day`}
      </div>

      {/* Buttons */}
      <div className="w-[95%] h-[50px] flex items-center justify-start px-[110px]">
        {cardDetails.host === userData._id && (
          <>
            <button
              type="submit"
              className="px-[30px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700 text-nowrap mr-4"
              onClick={() => setUpdatePopUp((prev) => !prev)}
            >
              Edit Listing
            </button>

            <button
              type="button"
              className="px-[30px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700 text-nowrap"
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Listing"}
            </button>
          </>
        )}

        {cardDetails.host !== userData._id && (
          <button
            type="submit"
            className="px-[30px] py-[10px] text-white text-[18px] md:px-[100px] rounded-lg bg-red-600 hover:bg-red-700 text-nowrap"
            onClick={() => setBookingPopUp((prev) => !prev)}
          >
            Reserve
          </button>
        )}
      </div>

      {/* Custom Delete Confirmation Popup */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xs text-center shadow-lg">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this listing?
            </p>
            <div className="flex justify-around gap-4">
              <button
                onClick={handleDeleteListing}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Listing Popup */}
      {updatePopUp && (
        <div className="w-[100%] h-[100%] flex items-center justify-center bg-[#000000a9] absolute top-[0px] z-[100] backdrop-blur-sm">
          <RxCross2
            className="w-[30px] h-[30px] bg-red-600 cursor-pointer absolute top-[6%] left-[25px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
            onClick={() => setUpdatePopUp(false)}
          />

          <form
            className="max-w-[900px] w-[90%] h-[550px] shadow-md p-8 flex items-center justify-start flex-col  gap-[20px] rounded-lg overflow-auto mt-[70px] text-black bg-[aliceblue] p-[20px]"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="w-[190px] h-[45px] text-[18px] bg-red-600 cursor-pointer absolute top-[5%] right-[10px] rounded-[30px] flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300">
              Update your details
            </div>

            {/* Form Fields */}
            <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
              <label htmlFor="title" className="text-gray-700">
                <b>Title</b>
              </label>
              <input
                type="text"
                id="title"
                className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
              <label htmlFor="description" className="text-gray-700">
                <b>Description</b>
              </label>
              <textarea
                id="description"
                className=" w-full h-[80px] border-[2px] p-2 rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            {/* Image Inputs */}
            <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
              <label htmlFor="img1" className="text-gray-700">
                <b>Image1</b>
              </label>
              <div className="flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[30px]">
                <input
                  type="file"
                  id="img1"
                  className="w-[100%] text-[15px] px-[20px] rounded-[50px]"
                  onChange={handleImage1}
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
                  className="w-[100%] text-[15px] px-[20px] rounded-[50px]"
                  onChange={handleImage2}
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
                  className="w-[100%] text-[15px] px-[20px] rounded-[50px]"
                  onChange={handleImage3}
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
                className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setRent(Number(e.target.value))}
                value={rent}
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
                className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div className="w-[70%] flex items-start justify-start flex-col gap-[8px]">
              <label htmlFor="landmark" className="text-gray-700">
                <b>LandMark</b>
              </label>
              <input
                type="text"
                id="landmark"
                className="w-full p-2 border-[2px] rounded-lg text-[18px] px-[20px]"
                required
                onChange={(e) => setLandmark(e.target.value)}
                value={landmark}
              />
            </div>

            {/* Buttons */}
            <div className="w-[100%] flex items-center justify-center gap-[30px] mt-[20px]">
              <button
                type="submit"
                onClick={handleUpdateListing}
                disabled={updating}
                className="px-[5px] py-[10px] text-white text-[15px] md:px-[100px] md:text-[18px] rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-nowrap"
              >
                {updating ? "Updating..." : "Update Listing"}
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
                className="px-[5px] py-[10px] text-white text-[15px] md:px-[100px] md:text-[18px] rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-nowrap"
              >
                {deleting ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}
      {bookingPopUp && (
        <div className="w-full min-h-screen flex flex-col md:flex-row md:item-center justify-center gap-[50px] md:gap-[100px] bg-[#ffffffcd] absolute top-[20px] z-[100] p-5 backdrop-blur-sm overflow-auto border-[1px]">
          <RxCross2
            className="w-[30px] h-[30px] bg-red-600 cursor-pointer absolute top-[6px] left-[25px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300 "
            onClick={() => setBookingPopUp(false)}
          />

          <form className="max-w-[400px] w-[90%] h-[450px] overflow-auto bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#dedddd] top-[100px]" onSubmit={(e)=>{
            e.preventDefault();
            
          }}>
            <h1 className="w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]">
              Confirm & Book
            </h1>
            <div className="w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]">
              <h3 className="text-[19px] font-semibold flex items-center justify-center">
                Your Trip
              </h3>

              <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[40px] md:justify-center flex-col md:flex-row md:items-start">
                <label
                  htmlFor="checkIn"
                  className="text-gray-700 text-[16px] font-medium"
                >
                  CheckIn:
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkIn"
                  name="checkIn"
                  value={checkIn}
                  className="border-2 border-[#555656] w-full md:w-[250px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] outline-none"
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div className="w-[90%] flex items-center justify-start gap-[10px] mt-[40px] md:justify-center flex-col md:flex-row md:items-start">
                <label
                  htmlFor="checkOut"
                  className="text-gray-700 text-[16px] font-medium"
                >
                  CheckOut:
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkOut"
                  name="checkOut"
                  value={checkOut}
                  className="border-2 border-[#555656] w-full md:w-[250px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] outline-none"
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>

              <div className="w-[100%] flex items-center justify-center mt-[20px] md:mt-[40px]">
                <button
                  type="button"
                  className="w-full max-w-[300px] py-[5px] text-white text-[16px] md:text-[18px] rounded-lg bg-red-600 hover:bg-red-700" onClick={()=>handleBooking(cardDetails._id)} disabled={booking}
                >
                  {booking?"Booking...":"Book Now"}
                  
                </button>
              </div>
            </div>
          </form>
          <div className="max-w-[450px] w-[90%] h-[450px] bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px] border-[1px] border-[#e2e1e1]">
            <div className="w-[90%] h-[30%] border-[1px] border-[#dedddd] rounded-lg flex justify-center items-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70%] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  src={cardDetails.image1}
                  alt=""
                  className="w-[100%] h-[100%] rounded-lg"
                />
              </div>
              <div className="w-[80%] h-[100px] gap-[5px]">
                <h1 className="w-[90%] truncate">{`In ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()}`}</h1>
                <h1>{cardDetails.title.toUpperCase()}</h1>
                <h1>{cardDetails.category.toUpperCase()}</h1>
                <h1 className="flex items-center justify-start gap-[5px]">
                  <RiStarSFill className="text-[#eb6262]" />
                  {cardDetails.ratings}
                </h1>
              </div>
            </div>
            <div className="w-[95%] h-[60%] border-[1px] border-[#dedddd] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col">
              <h1 className="text-[22px] font-semibold">Booking Price</h1>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">
                  {`₹${cardDetails.rent} X ${night} nights`}
                </span>

                <span>{cardDetails.rent * night}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Tax</span>
                <span>{(cardDetails.rent * night * 7) / 100}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold">AirBnb Charge</span>
                <span>{(cardDetails.rent * night * 7) / 100}</span>
              </p>

              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Total Price</span>

                <span>{total}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;

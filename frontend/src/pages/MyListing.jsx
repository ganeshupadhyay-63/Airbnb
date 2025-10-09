import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserDataContext } from "../Context/UserContext";

import Card from "../Component/Card";

function MyListing() {
  let navigate = useNavigate();
  let { userData } = useContext(UserDataContext);
  // let [title, setTitle] = useState("");
  // let [description, setDescription] = useState("");
  // let [frontEndImage1, setFrontEndImage1] = useState(null);
  // let [frontEndImage2, setFrontEndImage2] = useState(null);
  // let [frontEndImage3, setFrontEndImage3] = useState(null);
  // let [backEndImage1, setBackEndImage1] = useState(null);
  // let [backEndImage2, setBackEndImage2] = useState(null);
  // let [backEndImage3, setBackEndImage3] = useState(null);
  // let [rent, setRent] = useState("");
  // let [city, setCity] = useState("");
  // let [landmark, setLandmark] = useState("");
  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] relative">
      <div
        className="w-[50px] h-[50px] bg-red-600 cursor-pointer absolute top-[10%] left-[20px] rounded-full flex items-center justify-center text-white shadow-md hover:bg-red-800 transition duration-300"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>

      <div className="w-[50%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[20px] md:-1[600px]">
        My Listing
      </div>

      <div className="w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]">
        {(userData.listing || []).map((list) => (
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

        {(userData.listing || []).length === 0 && (
          <div className="flex justify-center items-center w-full h-[200px] text-gray-500 text-xl text-center">
            You haven’t added any listings yet.
          </div>
        )}
      </div>
    </div>
  );
}
export default MyListing;

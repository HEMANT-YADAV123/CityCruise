import React from "react";
import Customer from "../assets/customer (2).png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FinishRide = (props) => {
  const navigate = useNavigate();
  async function endRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
      {
        rideId: props.ride._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
      navigate("/captain-home");
    }
  }

  return (
    <div className="bg-black text-white">
      <button
        onClick={() => props.setFinishRidePanel(false)}
        className="absolute top-10 right-5 transform -translate-x-1/2 z-20 p-2 bg-white text-black rounded-full shadow-md"
      >
        <i className="ri-arrow-down-wide-line text-xl"></i>
      </button>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>
      <div className="flex items-center justify-between p-4  bg-amber-500 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            className="h-16 w-16 rounded-full object-contain"
            src={Customer}
            alt=""
          />
          <h2 className="text-lg font-medium">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <div className="text-right">
          <h5 className="text-lg font-semibold">
            {props.distanceTime?.distance?.text ?? "Distance unavailable"}
          </h5>
          <p className="text-sm text-gray-200">
            {props.distanceTime?.duration?.text ?? ""}
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-fill "></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line "></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={endRide}
            className="w-full text-lg flex justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Finish Ride
          </button>
          <p className="mt-10 text-xs">
            click on finish ride if you have completed the ride
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;

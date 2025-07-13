/* eslint-disable no-unused-vars */
import React, { useRef, useState } from "react";
import map from "../assets/map.png.png";
import logo from "../assets/CityCruise (1).png";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
    const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        // Redirect to login or home page
        window.location.href = "/captain-login"; // or use navigate if you have it
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  return (
    <div className="h-screen w-screen relative bg-black text-white">
      <header className="h-12 bg-black shadow-md flex items-center justify-between px-6 flex-shrink-0">
        <Link to="/captain-home">
          <img className="w-32 h-10 bg-white" src={logo} alt="" />
        </Link>
        <button
          onClick={handleLogout}
          className="h-10 w-10 bg-black text-white flex items-center justify-center rounded-full hover:bg-white 
                  hover:text-black transition-colors"
        >
          <i className="text-lg font-bold ri-logout-box-r-line"></i>
        </button>
      </header>
      <div className="h-4/5">
        <LiveTracking />
      </div>
      <div
        onClick={() => {
          setFinishRidePanel(true);
        }}
        className="h-1/5 p-6 flex items-center justify-between relative bg-amber-500"
      >
        <h5
          onClick={() => {}}
          className="p-1 text-center w-[95%] absolute top-0"
        >
          <i className="text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-lg font-semibold">4KM away</h4>
        <button className="px-10 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full bg-black text-white z-10 translate-y-full bottom-0 px-3 py-10 pt-12"
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  );
};

export default CaptainRiding;

/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/CityCruise (1).png";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const [distanceTime, setDistanceTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const rideData = location.state?.ride;

  // Function to fetch live distance and time
  const fetchLiveDistanceTime = async () => {
    if (!rideData?.pickup || !rideData?.destination) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/captain/get-distance-time`,
        {
          params: {
            origin: rideData.pickup,
            destination: rideData.destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setDistanceTime(response.data);
      }
    } catch (error) {
      console.error("Error fetching live distance and time:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch distance and time every 30 seconds for live updates
  useEffect(() => {
    fetchLiveDistanceTime(); // Initial fetch

    const interval = setInterval(() => {
      fetchLiveDistanceTime();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [rideData]);

  // Function to format distance
  const formatDistance = (distance) => {
    if (!distance) return "N/A";
    const km = (distance.value / 1000).toFixed(1);
    return `${km}KM away`;
  };

  // Function to format duration
  const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const minutes = Math.round(duration.value / 60);
    return `${minutes} mins remaining`;
  };

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
        <div className="flex-1">
          <h4 className="text-lg font-semibold">
            {loading ? "Updating..." : formatDistance(distanceTime?.distance)}
          </h4>
          <p className="text-sm text-gray-700">
            {loading ? "" : formatDuration(distanceTime?.duration)}
          </p>

          {/* Refresh button for manual update */}
          <button
            onClick={fetchLiveDistanceTime}
            disabled={loading}
            className="mt-1 text-xs bg-gray-700 text-white px-2 py-1 rounded hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Refresh"}
          </button>
        </div>
        <button className="px-10 bg-green-600 text-white font-semibold p-3 rounded-lg">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full bg-black text-white z-10 translate-y-full bottom-0 px-3 py-10 pt-12"
      >
        {/* Close Icon */}
        

        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel}
          distanceTime={distanceTime}
        />
      </div>
    </div>
  );
};

export default CaptainRiding;

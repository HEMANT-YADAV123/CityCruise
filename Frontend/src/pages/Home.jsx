/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useState } from "react";
import logo from "../assets/CityCruise__3_-removebg-preview.png";
import { useGSAP } from "@gsap/react"; //gsap is an animation library and useGSAP is a hook used for gsap
import gsap from "gsap";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketContext } from "../context/SocketContext";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null); //ref is used to select any element like here we select the last div using ref={something}.
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const findTripSectionRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);
  // Check for active ride on component mount
  useEffect(() => {
    checkActiveRide();
  }, []);

  // Function to check if there's an active ride
  const checkActiveRide = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-active-ride`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      
      if (response.status === 200 && response.data) {
        setActiveRide(response.data);
      }
    } catch (error) {
      console.log("No active ride found");
    }
  };

  // Function to resume active ride
  const resumeRide = () => {
    if (activeRide) {
      navigate("/riding", { state: { ride: activeRide } });
    }
  };

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelOpen &&
        findTripSectionRef.current &&
        !findTripSectionRef.current.contains(event.target)
      ) {
        setPanelOpen(false);
        setActiveField(null);
        if (document.activeElement && document.activeElement.blur) {
          document.activeElement.blur();
        }
      }
    };

    if (panelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [panelOpen]);

  socket.on("ride-confirmed", (ride) => {
    setVehicleFound(false);
    setWaitingForDriver(true);
    setRide(ride);
  });

  socket.on("ride-started", (ride) => {
    console.log("ride");
    setWaitingForDriver(false);
    navigate("/riding", { state: { ride } });
  });

  const handlePanelClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPanelOpen(false);
    setActiveField(null);
    // Clear focus from input fields
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  };
//Logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            //Use axios.interceptors to automatically include token headers, so you don’t have to write Authorization manually everywhere.
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // pickup suggestions.
  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPickupSuggestions(response.data);
    } catch (error) {
      // handle error
    }
  };

  // destination suggestions
  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setDestinationSuggestions(response.data);
    } catch {
      // handle error
    }
  };
  //find trip function
  async function findTrip() {
    setVehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
      {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    setFare(response.data);
  }
  useEffect(() => {
  console.log('Fare state updated:', fare);
}, [fare]);

async function createRide() {
  // Also, in your Home component, add some debugging:
console.log('Selected vehicle type:', vehicleType); // Add this before createRide call
  // Add validation to ensure vehicleType is selected
  if (!vehicleType) {
    alert('Please select a vehicle type first');
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/create`,
      {
        pickup,
        destination,
        vehicleType, // This was missing - now correctly included
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log('Ride created successfully:', response.data);
    
    // Set the ride state and show looking for driver panel
    setRide(response.data);
    setVehicleFound(true);
    setConfirmRidePanel(false);
    
  } catch (error) {
    console.error('Error creating ride:', error);
    alert('Failed to create ride. Please try again.');
  }
}

  // Enhanced panel animation with smooth transitions
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          padding: 24,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
          duration: 0.4,
          delay: 0.2,
          ease: "power2.out",
        });
      } else {
        gsap.to(panelCloseRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.to(panelRef.current, {
          height: "-10%",
          padding: 0,
          duration: 0.5,
          ease: "power3.in",
          delay: 0.1,
        });
      }
    },
    [panelOpen]
  );

  // Enhanced vehicle panel animation
  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.in",
        });
      }
    },
    [vehiclePanel]
  );

  // Enhanced confirm ride panel animation
  useGSAP(
    function () {
      if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(0)",
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.to(confirmRidePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.in",
        });
      }
    },
    [confirmRidePanel]
  );

  // Enhanced vehicle found animation
  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(0)",
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.in",
        });
      }
    },
    [vehicleFound]
  );

  // Enhanced waiting for driver animation
  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(0)",
          duration: 0.7,
          ease: "power3.out",
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: "translateY(100%)",
          duration: 0.5,
          ease: "power3.in",
        });
      }
    },
    [waitingForDriver]
  );

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header Section - Black theme with logo and logout */}
      <header className="bg-black shadow-lg border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 py-3 flex-shrink-0">
        <div className="flex items-center">
          <img
            className="w-24 h-8 lg:w-32 lg:h-10 invert transition-all duration-300 hover:scale-105"
            src={logo}
            alt="CityCruise"
          />
        </div>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* User Info - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="text-white">
              <span className="text-sm font-medium transition-colors duration-200 hover:text-blue-400">
                Welcome, {user?.fullname?.firstname}
              </span>
            </div>
          </div>

          {/* User Status Indicator */}
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs lg:text-sm text-gray-300 hidden sm:block transition-colors duration-200">
              Active
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="h-8 w-8 lg:h-10 lg:w-10 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center rounded-full transition-all duration-300 border border-gray-600 hover:border-gray-500 hover:scale-110 hover:shadow-lg"
            title="Logout"
          >
            <svg
              className="w-4 h-4 lg:w-5 lg:h-5 transition-transform duration-200 hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </header>
      
      {/* Active Ride Alert - NEW */}
      {activeRide && (
        <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between border-b border-green-700">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
            <div>
              <h3 className="font-semibold">You have an active ride!</h3>
              <p className="text-sm opacity-90">
                {activeRide.status === 'accepted' ? 'Driver is on the way' : 'Trip in progress'}
              </p>
            </div>
          </div>
          <button
            onClick={resumeRide}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 hover:scale-105"
          >
            Resume Trip
          </button>
        </div>
      )}

      {/* Map Section - Takes remaining space above find trip section */}
      <div className="flex-1 relative overflow-hidden">
        <LiveTracking />

        {/* Floating User Stats Card */}
        <div className="absolute top-4 left-4 bg-black text-white rounded-lg shadow-lg p-4 min-w-48 lg:min-w-64 border border-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-105">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base lg:text-lg font-semibold">Trip History</h3>
            <div className="px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white transition-all duration-200 hover:bg-blue-700">
              USER
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center transition-transform duration-200 hover:scale-110">
              <div className="text-xl lg:text-2xl font-bold text-white">24</div>
              <div className="text-xs lg:text-sm text-gray-300">
                Total Rides
              </div>
            </div>
            <div className="text-center transition-transform duration-200 hover:scale-110">
              <div className="text-xl lg:text-2xl font-bold text-blue-500">
                4.8★
              </div>
              <div className="text-xs lg:text-sm text-gray-300">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Find Trip Section - Updated with black theme */}
      <div
        ref={findTripSectionRef}
        className="bg-black text-white border-t border-gray-800 shadow-lg flex-shrink-0 transition-all duration-300"
      >
        <div className="p-4 lg:p-6 relative">
          <h5
            ref={panelCloseRef}
            onClick={handlePanelClose}
            className="absolute right-6 top-6 text-2xl opacity-0 text-white hover:text-gray-300 cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-180"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl lg:text-3xl font-semibold mb-4 text-white transition-all duration-200 hover:text-blue-400">
            Find a trip
          </h4>

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-16 w-1 top-[46%] left-10 bg-blue-500 rounded-full transition-all duration-300 hover:bg-blue-400"></div>

            <input
              onClick={(e) => {
                e.stopPropagation();
                setPanelOpen(true);
                setActiveField("pickup");
              }}
              value={pickup}
              onChange={handlePickupChange}
              className="bg-gray-800 text-white placeholder-gray-400 px-12 py-3 text-lg rounded-lg w-full mt-3 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-600 focus:shadow-lg focus:shadow-blue-500/20 focus:scale-105"
              type="text"
              placeholder="Add a pick-up location"
            />

            <input
              onClick={(e) => {
                e.stopPropagation();
                setPanelOpen(true);
                setActiveField("destination");
              }}
              value={destination}
              onChange={handleDestinationChange}
              className="bg-gray-800 text-white placeholder-gray-400 px-12 py-3 text-lg rounded-lg w-full mt-3 border border-gray-700 focus:border-blue-500 focus:outline-none transition-all duration-300 hover:border-gray-600 focus:shadow-lg focus:shadow-blue-500/20 focus:scale-105"
              type="text"
              placeholder="Enter your destination"
            />
          </form>

          <button
            onClick={findTrip}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg mt-5 w-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:shadow-blue-500/30"
          >
            <h4 className="text-lg font-medium">Find Trip</h4>
          </button>
        </div>

        {/* Location Search Panel - Updated styling */}
        <div
          ref={panelRef}
          className="bg-black text-white h-0 border-t border-gray-800 overflow-hidden"
        >
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            }
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle panel - Updated with black theme and smooth animations */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-20 bottom-0 translate-y-full bg-black text-white px-4 py-6 pt-12 border-t border-gray-800 rounded-t-2xl shadow-2xl backdrop-blur-sm"
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 transition-all duration-200 hover:bg-gray-500"></div>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride panel - Updated with black theme and smooth animations */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full z-30 bottom-0 translate-y-full bg-black text-white px-4 py-6 pt-12 border-t border-gray-800 rounded-t-2xl shadow-2xl backdrop-blur-sm"
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 transition-all duration-200 hover:bg-gray-500"></div>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for driver panel - Updated with black theme and smooth animations */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-40 bottom-0 translate-y-full bg-black text-white px-4 py-6 pt-12 border-t border-gray-800 rounded-t-2xl shadow-2xl backdrop-blur-sm"
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 transition-all duration-200 hover:bg-gray-500"></div>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Waiting for driver panel - Updated with black theme and smooth animations */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full z-50 bottom-0 translate-y-full bg-black text-white px-4 py-6 pt-12 border-t border-gray-800 rounded-t-2xl shadow-2xl backdrop-blur-sm"
      >
        <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6 transition-all duration-200 hover:bg-gray-500"></div>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
          fare={fare[vehicleType]}
        />
      </div>
    </div>
  );
};

export default Home;

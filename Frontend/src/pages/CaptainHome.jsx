/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import axios from "axios";
import logo from "../assets/CityCruise (1).png";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CapatainContext";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const confirmRidePopUpPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const { socket } = useContext(SocketContext);
  const { captain, setCaptain } = useContext(CaptainDataContext);

// Initialize online status from captain's status
useEffect(() => {
    if (captain) {
      setIsOnline(captain.status === 'active');
    }
  }, [captain]);

// Function to update captain status
  const updateCaptainStatus = async (newStatus) => {
    if (isUpdatingStatus) return;
    
    setIsUpdatingStatus(true);
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/captains/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        // Update local state
        setIsOnline(newStatus === 'active');
        
        // Update captain context
        setCaptain(prev => ({
          ...prev,
          status: newStatus
        }));

        // Emit status change to socket
        socket.emit('captain-status-change', {
          captainId: captain._id,
          status: newStatus
        });
      }
    } catch (error) {
      console.error("Status update failed:", error);
      // Revert the UI state if API call fails
      setIsOnline(captain.status === 'active');
    } finally {
      setIsUpdatingStatus(false);
    }
  };  

  // Handle status toggle
  const handleStatusToggle = () => {
    const newStatus = isOnline ? 'inactive' : 'active';
    updateCaptainStatus(newStatus);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/logout`,
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
        window.location.href = "/captain-login";
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    socket.emit("join", {
      userId: captain._id,
      userType: "captain",
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
  }, []);

  // Only show ride popup if captain is online/active
useEffect(() => {
    const handleNewRide = (data) => {
        console.log('New ride received:', data);
        
        // Multiple checks to ensure captain should receive this ride
        if (captain && captain.status === 'active' && isOnline) {
            console.log('Captain is active, showing ride popup');
            setRide(data);//set the create ride data coming from user.
            setRidePopUpPanel(true);
        } else {
            console.log('Captain is offline or inactive, ride popup not shown');
            // Optionally, you can emit back to server that captain is not available
            socket.emit('captain-not-available', {
                rideId: data._id,
                captainId: captain._id,
                reason: 'Captain is offline'
            });
        }
    };

    // Add event listener
    socket.on("new-ride", handleNewRide);

    // Cleanup event listener on unmount
    return () => {
        socket.off("new-ride", handleNewRide);
    };
}, [captain, isOnline, socket]);

// Also add this effect to handle status changes
useEffect(() => {
    // When captain goes offline, close any open ride popups
    if (!isOnline) {
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(false);
    }
}, [isOnline]);

  async function confirmRide() {
    // Double check captain is still active before confirming
    if (captain.status !== 'active') {
      alert("You must be online to accept rides");
      return;
    }
    try{
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.status === 200) {
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(true);
      }
    } catch (error) {
      console.error("Ride confirmation failed:", error);
      alert("Failed to confirm ride. Please try again.");
    }
  }

  useGSAP(
    function () {
      if (ridePopUpPanel) {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(ridePopUpPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    [ridePopUpPanel]
  );

  useGSAP(
    function () {
      if (confirmRidePopUpPanel) {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(0)",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(confirmRidePopUpPanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    },
    [confirmRidePopUpPanel]
  );

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* Header Section - Black theme with mobile-first logo positioning */}
      <header className="bg-black shadow-lg border-b border-gray-800 flex items-center justify-between px-4 lg:px-6 py-3 flex-shrink-0 relative z-10">
        <Link to='/captain-home' className="flex items-center">
          <img className="w-24 h-8 lg:w-32 lg:h-10 invert" src={logo} alt="CityCruise" />
        </Link>

        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Online Status Toggle - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-sm font-medium text-white">
              {isOnline ? 'Online' : 'Offline'}
            </span>
            <button
              onClick={handleStatusToggle}
              disabled={isUpdatingStatus}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                isOnline ? 'bg-green-600' : 'bg-gray-600'
              }${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                  isOnline ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Status Indicator - Simplified for mobile */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs lg:text-sm text-gray-300 hidden sm:block">
              {isOnline ? 'Available' : 'Offline'}
            </span>
          </div>

          {/* Mobile Status Toggle */}
          <button
            onClick={handleStatusToggle}
            disabled={isUpdatingStatus}
            className={`lg:hidden relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
              isOnline ? 'bg-green-600' : 'bg-gray-600'
            }${isUpdatingStatus ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ${
                isOnline ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="h-8 w-8 lg:h-10 lg:w-10 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center rounded-full transition-all duration-200 border border-gray-600 hover:border-gray-500"
            title="Logout"
          >
            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Map Section - Takes remaining space above captain details */}
      <div className="flex-1 relative overflow-hidden">
        <LiveTracking />
        
        {/* Floating Stats Card */}
        <div className="absolute top-4 left-4 bg-black text-white rounded-lg shadow-lg p-4 min-w-48 lg:min-w-64 border border-gray-800 z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base lg:text-lg font-semibold">Today's Stats</h3>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              isOnline ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
            }`}>
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-white">12</div>
              <div className="text-xs lg:text-sm text-gray-300">Rides</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-green-500">₹2,340</div>
              <div className="text-xs lg:text-sm text-gray-300">Earnings</div>
            </div>
          </div>
        </div>

        {/* Quick Actions Floating Button - Only show when online */}
        {isOnline && (
          <div className="absolute bottom-4 right-4 z-10">
            <button className="bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200 border border-gray-800">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Captain Details Section - Black theme */}
      <div className="bg-black text-white border-t border-gray-800 shadow-lg flex-shrink-0 relative z-10">
        <div className="p-4 lg:p-6">
          <CaptainDetails />
        </div>
      </div>

      {/* Offline Overlay */}
        {!isOnline && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
            <div className="bg-black text-white p-6 rounded-lg shadow-lg border border-gray-800 text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">You're Offline</h3>
              <p className="text-gray-300 mb-4">Turn on your status to start receiving ride requests</p>
              <button
                onClick={handleStatusToggle}
                disabled={isUpdatingStatus}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {isUpdatingStatus ? 'Updating...' : 'Go Online'}
              </button>
            </div>
          </div>
        )}

      {/* Popup Overlay - Only show when popups are active */}
      {(ridePopUpPanel || confirmRidePopUpPanel) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      )}

      {/* Ride popup panel - Only show if captain is online */}
      {isOnline && (
        <div
          ref={ridePopUpPanelRef}
          className="fixed w-full z-50 translate-y-full bottom-0 bg-black text-white rounded-t-2xl shadow-2xl border-t border-gray-800"
          style={{ zIndex: 60 }}
        >
          <div className="p-4 lg:p-6">
            {/* Handle bar */}
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            
            <RidePopUp
              ride={ride}
              setRidePopUpPanel={setRidePopUpPanel}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              confirmRide={confirmRide}
            />
          </div>
        </div>
      )}

      {/* Confirm Ride PopUp - Only show if captain is online */}
      {isOnline && (
        <div
          ref={confirmRidePopUpPanelRef}
          className="fixed w-full h-screen z-50 translate-y-full bottom-0 bg-black text-white"
          style={{ zIndex: 70 }}
        >
          <div className="p-4 lg:p-6 h-full overflow-y-auto">
            {/* Handle bar */}
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-6"></div>
            
            <ConfirmRidePopUp
              ride={ride}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              setRidePopUpPanel={setRidePopUpPanel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaptainHome;
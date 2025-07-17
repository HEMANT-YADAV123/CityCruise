import React, { useEffect } from "react";
import Customer from "../assets/customer (2).png";
import axios from 'axios';

const RidePopUp = (props) => {
  const [distanceTime, setDistanceTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch distance and time
  const fetchDistanceTime = async () => {
    if (!props.ride?.pickup || !props.ride?.destination) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/captain/get-distance-time`,
        {
          params: {
            origin: props.ride.pickup,
            destination: props.ride.destination,
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
      console.error("Error fetching distance and time:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch distance and time when component mounts or ride changes
  useEffect(() => {
    fetchDistanceTime();
  }, [props.ride]);

  // Function to format distance
  const formatDistance = (distance) => {
    if (!distance) return "N/A";
    const km = (distance.value / 1000).toFixed(1);
    return `${km} KM`;
  };

  // Function to format duration
  const formatDuration = (duration) => {
    if (!duration) return "N/A";
    const minutes = Math.round(duration.value / 60);
    return `${minutes} mins`;
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setRidePopUpPanel(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-amber-500 rounded-lg mt-4">
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
            {loading ? "Loading..." : formatDistance(distanceTime?.distance)}
          </h5>
          <p className="text-sm text-gray-700">
            {loading ? "" : formatDuration(distanceTime?.duration)}
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
        <div className="flex w-full mt-5 items-center justify-between">
          <button
            onClick={() => {
              props.setRidePopUpPanel(false);
            }}
            className="px-10 bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg"
          >
            Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true);
              props.confirmRide();
            }}
            className=" px-10 bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;

/* eslint-disable react/prop-types */
import car from "../assets/car.png";

const WaitingForDriver = (props) => {
  // Add safety check for captain data
  if (!props.ride?.captain || typeof props.ride.captain === "string") {
    return (
      <div>
        <h5
          onClick={() => {
            props.setWaitingForDriver(false);
          }}
          className="p-1 text-center w-[93%] absolute top-0"
        >
          <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <div className="flex items-center justify-center p-8">
          <p className="text-lg text-gray-500">Loading driver details...</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriver(false);
        }}
        className="p-1 text-center w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex items-center justify-between">
        <div className="flex flex-col justify-between gap-5">
          <img className="h-16 " src={car} alt="" />
          <h1 className="text-slate-500 font-semibold">Waiting...</h1>
        </div>
        <div className="text-right flex flex-col justify-between">
          <h2 className="text-lg font-semibold capitalize">
            {props.ride?.captain.fullname.firstname +
              " " +
              props.ride?.captain.fullname.lastname}
          </h2>
          <h4 className="text-xl font-semibold -mt-1 -mb-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          <p className="text-lg font-sm text-slate-700">
            {props.ride?.captain?.vehicle?.vehicleType || "Vehicle"}
          </p>
          <h1 className="text-xl font-semibold"> OTP -{props.ride?.otp} </h1>
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
              <h3 className="text-lg font-medium text-white">
                ₹{props.fare || props.ride?.fare}
              </h3>{" "}
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;

import React from 'react'
import car from '../assets/car.png'
import bike from '../assets/bike.png'
import auto from '../assets/auto.png'

const VehiclePanel = ({ selectVehicle, fare, setConfirmRidePanel, setVehiclePanel }) => {
  const handleVehicleSelect = (vehicleType) => {
    // Set the selected vehicle type
    selectVehicle(vehicleType);
    
    // Close vehicle panel and open confirm ride panel
    setVehiclePanel(false);
    setConfirmRidePanel(true);
  };
  return (
    <div>
            <h5 onClick={()=>{setVehiclePanel(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>    
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

            <div onClick={()=>{
              setConfirmRidePanel(true)
              handleVehicleSelect('car')
              }}  
              className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={car} alt="" />
              <div className='w-1/2 ml-2'>
                <h4 className='font-medium text-base'>CruiserGo <span><i className="ri-user-3-fill">4</i></span></h4>
                <h5 className='font-medium text-sm'>2 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹{fare.car}</h2>
            </div>

            <div onClick={()=>{
              setConfirmRidePanel(true)
              handleVehicleSelect('motorcycle')
              }}  
              className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={bike} alt="" />
              <div className='w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill">1</i></span></h4>
                <h5 className='font-medium text-sm'>3 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, Motorcycle rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹{fare.moto}</h2>
            </div>
            
            <div onClick={()=>{
              setConfirmRidePanel(true)
              handleVehicleSelect('auto')
              }}  
              className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={auto} alt="" />
              <div className='w-1/2 ml-2'>
                <h4 className='font-medium text-base'>CruiserAuto <span><i className="ri-user-3-fill">3</i></span></h4>
                <h5 className='font-medium text-sm'>2 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹{props.fare.auto}</h2>
            </div>

    </div>
  )
}

export default VehiclePanel
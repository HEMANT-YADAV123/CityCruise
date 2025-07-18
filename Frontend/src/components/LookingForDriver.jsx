/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import car from '../assets/car.png'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5 
        onClick={() => {props.setVehicleFound(false)}} 
        className='p-1 text-center w-[93%] absolute top-0'
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      
      <h3 className='text-2xl font-semibold mb-5 text-white'>Looking For Drivers</h3>
      
      <div className='flex gap-2 flex-col justify-between items-center'>
        <img className='h-20' src={car} alt="" />
        
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'> 
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium text-white'>Pickup</h3>
              <p className='text-sm -mt-1 text-gray-400'>{props.pickup}</p>
            </div>
          </div>
          
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-fill "></i>
            <div>
              <h3 className='text-lg font-medium text-white'>Destination</h3>
              <p className='text-sm -mt-1 text-gray-400'>{props.destination}</p>
            </div>
          </div>
          
          <div className='flex items-center gap-5 p-3 '>
            <i className="text-lg ri-currency-line "></i>
            <div>
              <h3 className='text-lg font-medium text-white'>
                ₹{props?.fare[props.vehicleType] || 'Loading...'}
              </h3>
              <p className='text-sm -mt-1 text-gray-400'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LookingForDriver
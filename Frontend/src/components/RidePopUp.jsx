import React from 'react'
import Customer from '../assets/customer (2).png'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 onClick={()=>{props.setRidePopUpPanel(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-16 w-16 rounded-full object-cover'src={Customer} alt="" />
                    <h2 className='text-lg font-medium'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            
            <div className='flex gap-2 flex-col justify-between items-center'>
              <div className='w-full mt-5'>
                  <div className='flex items-center gap-5 p-3 border-b-2'> 
                  <i className="text-lg ri-map-pin-user-fill"></i>
                      <div>
                          <h3 className='text-lg font-medium'>Pickup</h3>
                          <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                      </div>
                  </div>
                  <div className='flex items-center gap-5 p-3 border-b-2'>
                      <i className="text-lg ri-map-pin-fill "></i>
                      <div>
                          <h3 className='text-lg font-medium'>Destination</h3>
                          <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                      </div>
                  </div>
                  <div className='flex items-center gap-5 p-3 '>
                      <i className="text-lg ri-currency-line "></i>
                      <div>
                          <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                          <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                      </div>
                  </div>
              </div>
              <div className='flex w-full mt-5 items-center justify-between'>
                <button onClick={()=>{props.setRidePopUpPanel(false)}} className='px-10 bg-gray-300 text-gray-700 font-semibold p-3 rounded-lg'>
                    Ignore
                </button>
                <button onClick={()=>{
                    props.setConfirmRidePopUpPanel(true)
                    props.confirmRide()
                    }} 
                    className=' px-10 bg-green-600 text-white font-semibold p-3 rounded-lg'>
                    Accept
                </button>
              </div>
            </div>
    </div>
  )
}

export default RidePopUp

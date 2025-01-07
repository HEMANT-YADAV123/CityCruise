import React from 'react'
import Customer from '../assets/customer (2).png'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
    const navigate = useNavigate();
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
            rideId: props.ride._id
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }) 
        if (response.status === 200) {
            navigate('/captain-home')
        }
    }

  return (
    <div>
          <h5 onClick={()=>{props.setFinishRidePanel(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>
                <div className='flex items-center justify-between p-4 border-2  bg-yellow-400 rounded-lg mt-4'>
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
                  <div className='mt-6 w-full'>
                        
                        <button 
                        onClick={endRide}
                        className='w-full text-lg flex justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>
                            Finish Ride
                        </button>
                        <p className='mt-10 text-xs'>click on finish ride if you have completed the ride</p>
                  </div>
                </div>
    </div>
  )
}

export default FinishRide

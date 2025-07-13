import React, { useState } from 'react'
import Customer from '../assets/customer (2).png'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConfirmRidePopUp = (props) => {
    const [otp,setOtp] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e)=>{
        e.preventDefault();
        
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`,{
        params: {
            rideId: props.ride._id,
            otp: otp
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false)
        navigate('/captain-riding',{state: {ride: props.ride } })
    }}

  return (
    <div>
          <h5 onClick={()=>{props.setConfirmRidePopUpPanel(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start!</h3>
                <div className='flex items-center justify-between p-3 bg-amber-500 rounded-lg mt-4'>
                    <div className='flex items-center gap-3 '>
                        <img className='h-16 w-16 rounded-full object-contain'src={Customer} alt="" />
                        <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
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
                    <form onSubmit={submitHandler}>
                        <input 
                        value={otp}
                        onChange={(e)=>{setOtp(e.target.value)}}
                        className='bg-[#eee] px-6 py-4 font-mono text-black text-lg rounded-lg w-full mt-3'
                        type="text" 
                        placeholder='Enter OTP'/>    
                        <button  className='w-full flex text-lg justify-center mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg'>
                            Confirm
                        </button>
                        <button onClick={()=>{props.setConfirmRidePopUpPanel(false);props.setRidePopUpPanel(false)}} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>
                            Cancel
                        </button>
                    </form>
                  </div>
                </div>
        </div>
  )
}

export default ConfirmRidePopUp

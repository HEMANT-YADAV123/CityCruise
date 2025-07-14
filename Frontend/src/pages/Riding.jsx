/* eslint-disable no-unused-vars */
import React from 'react'
import map from '../assets/map.png.png'
import car from '../assets/car.png'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation();
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    socket.on('ride-ended', () => {
        navigate('/home')
    })

    return (
        <div className='h-screen bg-black text-white flex flex-col'>
            {/* Header with Home Button */}
            <div className='relative p-4 bg-black border-b border-gray-800'>
                <Link 
                    to='/home' 
                    className='absolute right-4 top-4 h-10 w-10 bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-110 hover:shadow-lg'
                >
                    <i className='text-lg font-bold ri-home-5-line transition-transform duration-200 hover:rotate-12'></i>
                </Link>
                
                {/* Trip Status Header */}
                <div className='flex items-center justify-center'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
                        <h1 className='text-xl font-semibold text-white'>Trip in Progress</h1>
                        <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse'></div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className='h-1/2 relative'>
                <LiveTracking />
                
                {/* Floating Trip Info Card */}
                <div className='absolute top-4 left-4 bg-black bg-opacity-90 backdrop-blur-sm text-white rounded-lg shadow-lg p-4 border border-gray-800 transition-all duration-300 hover:shadow-xl'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-8 h-8 bg-green-600 rounded-full flex items-center justify-center'>
                            <i className='ri-car-line text-white text-sm'></i>
                        </div>
                        <div>
                            <p className='text-sm font-medium'>Current Trip</p>
                            <p className='text-xs text-gray-300'>ETA: 15 mins</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trip Details Section */}
            <div className='h-1/2 bg-black border-t border-gray-800 p-4 lg:p-6'>
                
                {/* Driver Info Card */}
                <div className='bg-gray-900 rounded-xl p-4 border border-gray-800 mb-6 transition-all duration-300 hover:shadow-lg hover:border-gray-700'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                            <div className='relative'>
                                <img 
                                    className='h-12 w-12 transition-transform duration-300 hover:scale-110' 
                                    src={car} 
                                    alt="Vehicle" 
                                />
                                <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse'></div>
                            </div>
                            <div>
                                <h2 className='text-lg font-semibold capitalize text-white transition-colors duration-200 hover:text-blue-400'>
                                    {ride?.captain.fullname.firstname + " " + ride?.captain.fullname.lastname}
                                </h2>
                                <p className='text-sm text-gray-400'>Your Driver</p>
                            </div>
                        </div>
                        
                        <div className='text-right'>
                            <h4 className='text-xl font-bold text-white mb-1'>
                                {ride?.captain.vehicle.plate}
                            </h4>
                            <p className='text-sm text-gray-400'>Maruti Suzuki Alto</p>
                            <div className='flex items-center justify-end mt-1'>
                                <div className='flex text-yellow-400'>
                                    <i className='ri-star-fill text-xs'></i>
                                    <i className='ri-star-fill text-xs'></i>
                                    <i className='ri-star-fill text-xs'></i>
                                    <i className='ri-star-fill text-xs'></i>
                                    <i className='ri-star-fill text-xs'></i>
                                </div>
                                <span className='text-xs text-gray-400 ml-1'>4.9</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trip Details */}
                <div className='space-y-4'>
                    
                    {/* Destination */}
                    <div className='flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800 transition-all duration-300 hover:border-gray-700 hover:shadow-lg'>
                        <div className='w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0'>
                            <i className="text-white ri-map-pin-fill"></i>
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-lg font-medium text-white'>Destination</h3>
                            <p className='text-sm text-gray-400 mt-1'>{ride?.destination}</p>
                        </div>
                        <div className='text-right'>
                            <p className='text-sm text-green-400 font-medium'>Arriving Soon</p>
                            <p className='text-xs text-gray-500'>~15 mins</p>
                        </div>
                    </div>

                    {/* Fare */}
                    <div className='flex items-center gap-4 p-4 bg-gray-900 rounded-lg border border-gray-800 transition-all duration-300 hover:border-gray-700 hover:shadow-lg'>
                        <div className='w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0'>
                            <i className="text-white ri-currency-line"></i>
                        </div>
                        <div className='flex-1'>
                            <h3 className='text-lg font-medium text-white'>₹{ride?.fare}</h3>
                            <p className='text-sm text-gray-400 mt-1'>Cash Payment</p>
                        </div>
                        <div className='text-right'>
                            <div className='px-3 py-1 bg-green-600 bg-opacity-20 rounded-full border border-green-600'>
                                <span className='text-xs text-green-400 font-medium'>CASH</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className='mt-6 space-y-3'>
                    <button className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 hover:shadow-green-500/30'>
                        <div className='flex items-center justify-center space-x-2'>
                            <i className='ri-wallet-line text-lg'></i>
                            <span>Make a Payment</span>
                        </div>
                    </button>
                    
                    {/* Contact Options */}
                    <div className='flex space-x-3'>
                        <button className='flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium p-3 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600'>
                            <div className='flex items-center justify-center space-x-2'>
                                <i className='ri-phone-line'></i>
                                <span>Call</span>
                            </div>
                        </button>
                        <button className='flex-1 bg-gray-800 hover:bg-gray-700 text-white font-medium p-3 rounded-lg transition-all duration-300 border border-gray-700 hover:border-gray-600'>
                            <div className='flex items-center justify-center space-x-2'>
                                <i className='ri-message-3-line'></i>
                                <span>Message</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Riding
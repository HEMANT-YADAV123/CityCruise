/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Captainsignup = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const CaptainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        }
        try {
            if (firstname.length < 3) {
                toast.error('First name must be at least 3 characters long')
                return;
            }
            if (lastname.length < 3) {
                toast.error('Last name must be at least 3 characters long')
                return;
            }
            if (email.length < 5) {
                toast.error('Email must be at least 5 characters long')
                return;
            }
            if (vehicleColor.length < 3) {
                toast.error('Vehicle color must be at least 3 characters long')
                return;
            }
            if (parseInt(vehicleCapacity) < 1 || isNaN(vehicleCapacity)) {
                toast.error('Vehicle capacity must be at least 1')
                return;
            }
            if (vehiclePlate.length < 3) {
                toast.error('Vehicle plate number must be at least 3 characters long')
                return;
            }
            if (!vehicleType) {
                toast.error('Please select a vehicle type')
                return;
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, CaptainData)
            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token', data.token);
                toast.success('Captain registered successfully!');
                setTimeout(() => {
                    navigate('/captain-home');
                }, 1000);
            }
        }
        catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error('Something went wrong! Please try again.');
            }
        }

        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-green-50 to-green-100'>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="mt-16"
            />

            {/* Main Container */}
            <div className='flex min-h-screen'>
                {/* Left Side - Hidden on mobile, shown on desktop */}
                <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-800 to-green-900 items-center justify-center p-12'>
                    <div className='text-center text-white max-w-md'>
                        <img className='w-48 h-16 mb-8 mx-auto filter brightness-0 invert' src={loginlogo} alt="CityCruise" />
                        <h1 className='text-4xl font-bold mb-6'>Become a Captain</h1>
                        <p className='text-xl text-green-200 mb-8'>Start earning with your vehicle today</p>
                        <div className='space-y-4 text-left'>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <span className='text-green-200'>Quick registration process</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <span className='text-green-200'>Start earning immediately</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <span className='text-green-200'>Flexible schedule</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-white rounded-full'></div>
                                <span className='text-green-200'>Professional support</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12'>
                    <div className='w-full max-w-md'>
                        {/* Mobile Logo */}
                        <div className='lg:hidden mb-8 text-center'>
                            <img className='w-32 h-10 mx-auto' src={loginlogo} alt="CityCruise" />
                        </div>

                        {/* Desktop Header */}
                        <div className='hidden lg:block mb-8'>
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Join Our Fleet</h1>
                            <p className='text-gray-600'>Register as a Captain and start earning</p>
                        </div>

                        {/* Captain Badge */}
                        <div className='bg-green-100 border border-green-300 rounded-lg p-4 mb-6 flex items-center'>
                            <div className='bg-green-600 rounded-full p-2 mr-3'>
                                <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z' />
                                    <path d='M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z' />
                                </svg>
                            </div>
                            <div>
                                <h3 className='text-sm font-semibold text-green-800'>Captain Registration</h3>
                                <p className='text-xs text-green-600'>Join our driver community</p>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Captain's Name
                                </label>
                                <div className='flex gap-4'>
                                    <input
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                        className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                        type="text"
                                        placeholder='First name'
                                    />
                                    <input
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                        className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                        type="text"
                                        placeholder='Last name'
                                    />
                                </div>
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                    type="email"
                                    placeholder='Enter your email'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Password
                                </label>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                    required
                                    type="password"
                                    placeholder='Create a password'
                                />
                            </div>

                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Vehicle Information
                                </label>
                                <div className='space-y-4'>
                                    <div className='flex gap-4'>
                                        <input
                                            required
                                            className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                            type="text"
                                            placeholder='Vehicle Color'
                                            value={vehicleColor}
                                            onChange={(e) => setVehicleColor(e.target.value)}
                                        />
                                        <input
                                            required
                                            className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                            type="text"
                                            placeholder='Vehicle Plate'
                                            value={vehiclePlate}
                                            onChange={(e) => setVehiclePlate(e.target.value)}
                                        />
                                    </div>
                                    <div className='flex gap-4'>
                                        <input
                                            required
                                            className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                            type="number"
                                            placeholder='Vehicle Capacity'
                                            value={vehicleCapacity}
                                            onChange={(e) => setVehicleCapacity(e.target.value)}
                                        />
                                        <select
                                            required
                                            className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                                            value={vehicleType}
                                            onChange={(e) => setVehicleType(e.target.value)}
                                        >
                                            <option value="" disabled>Select Vehicle Type</option>
                                            <option value="car">Car</option>
                                            <option value="auto">Auto</option>
                                            <option value="moto">Moto</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    required
                                    className='rounded border-gray-300 text-green-600 focus:ring-green-600'
                                />
                                <span className='ml-2 text-sm text-gray-600'>
                                    I agree to the{' '}
                                    <Link to='/captain-terms' className='text-green-600 hover:text-green-700 font-medium'>
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to='/captain-privacy' className='text-green-600 hover:text-green-700 font-medium'>
                                        Privacy Policy
                                    </Link>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className='w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-base'
                            >
                                Create Captain Account
                            </button>
                        </form>

                        {/* Sign in link */}
                        <p className='text-center mt-6 text-gray-600'>
                            Already have an account?{' '}
                            <Link to='/captain-login' className='text-green-600 hover:text-green-700 font-medium'>
                                Sign in here
                            </Link>
                        </p>

                        {/* Divider */}
                        <div className='my-8 flex items-center'>
                            <div className='flex-1 border-t border-gray-300'></div>
                            <span className='px-4 text-sm text-gray-500 bg-white'>or</span>
                            <div className='flex-1 border-t border-gray-300'></div>
                        </div>

                        {/* User Signup */}
                        <Link
                            to='/signup'
                            className='w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base flex items-center justify-center'
                        >
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd' />
                            </svg>
                            Join as User
                        </Link>
                    </div>

                    {/* Footer - Only on desktop */}
                    <div className='hidden lg:block mt-12 text-center text-sm text-gray-500'>
                        <p>© 2024 CityCruise. All rights reserved.</p>
                        <p className='mt-2 max-w-md mx-auto'>
                            This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Captainsignup
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState, useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Captainlogin = () => {
  const [email, setEmail] = useState('harsh@gmail.com');
  const [password, setPassword] = useState('Harsh@1');

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)

      if (response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token)
        toast.success('Login successful!');
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
            <h1 className='text-4xl font-bold mb-6'>Drive with CityCruise</h1>
            <p className='text-xl text-green-200 mb-8'>Earn money on your schedule</p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-green-200'>Flexible working hours</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-green-200'>Competitive earnings</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-green-200'>Driver support 24/7</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-white rounded-full'></div>
                <span className='text-green-200'>Weekly payouts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12'>
          <div className='w-full max-w-md'>
            {/* Mobile Logo */}
            <div className='lg:hidden mb-8 text-center'>
              <img className='w-32 h-10 mx-auto' src={loginlogo} alt="CityCruise" />
            </div>

            {/* Desktop Header */}
            <div className='hidden lg:block mb-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Captain Sign In</h1>
              <p className='text-gray-600'>Welcome back, Captain!</p>
            </div>

            {/* Captain Badge */}
            <div className='bg-green-100 border border-green-300 rounded-lg p-4 mb-6 flex items-center'>
              <div className='bg-green-600 rounded-full p-2 mr-3'>
                <svg className='w-5 h-5 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                </svg>
              </div>
              <div>
                <h3 className='text-sm font-semibold text-green-800'>Captain Portal</h3>
                <p className='text-xs text-green-600'>Access your driver dashboard</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submitHandler} className='space-y-6'>
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
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent outline-none transition-all duration-200 text-base'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder='Enter your password'
                />
              </div>

              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input type="checkbox" className='rounded border-gray-300 text-green-600 focus:ring-green-600' />
                  <span className='ml-2 text-sm text-gray-600'>Remember me</span>
                </label>
                <Link to='/captain-forgot-password' className='text-sm text-green-600 hover:text-green-700 font-medium'>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className='w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-base'
              >
                Sign in as Captain
              </button>
            </form>

            {/* Sign up link */}
            <p className='text-center mt-6 text-gray-600'>
              Want to join our fleet?{' '}
              <Link to='/captain-signup' className='text-green-600 hover:text-green-700 font-medium'>
                Register as a Captain
              </Link>
            </p>

            {/* Divider */}
            <div className='my-8 flex items-center'>
              <div className='flex-1 border-t border-gray-300'></div>
              <span className='px-4 text-sm text-gray-500 bg-white'>or</span>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            {/* User Login */}
            <Link
              to='/login'
              className='w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base flex items-center justify-center'
            >
              <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd' />
              </svg>
              Sign in as User
            </Link>
          </div>

          {/* Footer - Only on desktop */}
          <div className='hidden lg:block mt-12 text-center text-sm text-gray-500'>
            <p>© 2024 CityCruise. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin
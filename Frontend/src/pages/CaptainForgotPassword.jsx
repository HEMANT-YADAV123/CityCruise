import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png';

const CaptainForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/forgot-password`, {
        email: email
      });

      if (response.status === 200) {
        setIsEmailSent(true);
        toast.success('Password reset email sent! Check your inbox.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Something went wrong! Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-brfrom-green-50 to-green-100'>
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
      
      <div className='flex min-h-screen'>
        {/* Left Side - Hidden on mobile */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-800 to-green-900 items-center justify-center p-12'>
          <div className='text-center text-white max-w-md'>
            <img className='w-48 h-16 mb-8 mx-auto filter brightness-0 invert' src={loginlogo} alt="CityCruise" />
            <h1 className='text-4xl font-bold mb-6'>Forgot Password?</h1>
            <p className='text-xl text-gray-300 mb-8'>No worries, we'll help you reset it</p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-black rounded-full'></div>
                <span className='text-gray-300'>Enter your email address</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-black rounded-full'></div>
                <span className='text-gray-300'>Check your inbox for reset link</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-black rounded-full'></div>
                <span className='text-gray-300'>Create your new password</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-6 lg:p-12'>
          <div className='w-full max-w-md'>
            {/* Mobile Logo */}
            <div className='lg:hidden mb-8 text-center'>
              <img className='w-32 h-10 mx-auto' src={loginlogo} alt="CityCruise" />
            </div>

            {/* Header */}
            <div className='mb-8 text-center lg:text-left'>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                {isEmailSent ? 'Check your email' : 'Reset your password'}
              </h1>
              <p className='text-gray-600'>
                {isEmailSent 
                  ? `We've sent a password reset link to ${email}`
                  : 'Enter your email address and we\'ll send you a link to reset your password'
                }
              </p>
            </div>

            {!isEmailSent ? (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                    placeholder='Enter your email address'
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            ) : (
              <div className='space-y-6'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <svg className='w-5 h-5 text-green-600 mr-3' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                    </svg>
                    <span className='text-green-800 font-medium'>Email sent successfully!</span>
                  </div>
                </div>

                <div className='text-center space-y-4'>
                  <p className='text-gray-600'>
                    Didn't receive the email? Check your spam folder or
                  </p>
                  <button
                    onClick={() => setIsEmailSent(false)}
                    className='text-black hover:text-gray-700 font-medium'
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {/* Back to login */}
            <div className='mt-8 text-center'>
              <Link to='/captain-login' className='text-black hover:text-gray-700 font-medium flex items-center justify-center'>
                <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z' clipRule='evenodd' />
                </svg>
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainForgotPassword;
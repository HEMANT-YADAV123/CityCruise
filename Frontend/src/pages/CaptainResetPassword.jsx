import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png';

const CaptainResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Verify token validity on component mount
    const verifyToken = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/verify-reset-token/${token}`);
      } catch (err) {
        setIsTokenValid(false);
        toast.error('Invalid or expired reset token');
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/reset-password`, {
        token: token,
        password: password
      });

      if (response.status === 200) {
        setIsPasswordReset(true);
        toast.success('Password reset successful!');
        setTimeout(() => {
          navigate('/captain-login');
        }, 3000);
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

  if (!isTokenValid) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6'>
        <div className='max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center'>
          <div className='mb-6'>
            <svg className='w-16 h-16 text-red-500 mx-auto mb-4' fill='currentColor' viewBox='0 0 20 20'>
              <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
            </svg>
            <h2 className='text-2xl font-bold text-gray-900 mb-2'>Invalid Reset Link</h2>
            <p className='text-gray-600'>This password reset link is invalid or has expired.</p>
          </div>
          <Link
            to='/forgot-password'
            className='bg-black text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200'
          >
            Request New Reset Link
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
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
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black to-gray-900 items-center justify-center p-12'>
          <div className='text-center text-white max-w-md'>
            <img className='w-48 h-16 mb-8 mx-auto filter brightness-0 invert' src={loginlogo} alt="CityCruise" />
            <h1 className='text-4xl font-bold mb-6'>Create New Password</h1>
            <p className='text-xl text-gray-300 mb-8'>Choose a strong password for your account</p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-gray-300'>At least 8 characters long</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-gray-300'>Include letters and numbers</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                <span className='text-gray-300'>Avoid common passwords</span>
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
                {isPasswordReset ? 'Password Reset Complete' : 'Create New Password'}
              </h1>
              <p className='text-gray-600'>
                {isPasswordReset 
                  ? 'Your password has been successfully reset. You can now sign in with your new password.'
                  : 'Your new password must be different from previously used passwords.'
                }
              </p>
            </div>

            {!isPasswordReset ? (
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    New Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                    placeholder='Enter your new password'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Confirm New Password
                  </label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    type="password"
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                    placeholder='Confirm your new password'
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            ) : (
              <div className='space-y-6'>
                <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
                  <div className='flex items-center'>
                    <svg className='w-5 h-5 text-green-600 mr-3' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                    </svg>
                    <span className='text-green-800 font-medium'>Password reset successful!</span>
                  </div>
                </div>

                <Link
                  to='/captain-login'
                  className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base flex items-center justify-center'
                >
                  Continue to Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainResetPassword;
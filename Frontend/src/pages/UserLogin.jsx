/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserLogin = () => {
  const [email, setEmail] = useState('hemant@gmail.com');
  const [password, setPassword] = useState('Hemant@1');

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/home');
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
      
      {/* Main Container */}
      <div className='flex min-h-screen'>
        {/* Left Side - Hidden on mobile, shown on desktop */}
        <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black to-gray-900 items-center justify-center p-12'>
          <div className='text-center text-white max-w-md'>
            <img className='w-48 h-16 mb-8 mx-auto filter brightness-0 invert' src={loginlogo} alt="CityCruise" />
            <h1 className='text-4xl font-bold mb-6'>Welcome back</h1>
            <p className='text-xl text-gray-300 mb-8'>Your ride is just a click away</p>
            <div className='space-y-4 text-left'>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-gray-300'>Safe and reliable rides</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-gray-300'>Affordable pricing</span>
              </div>
              <div className='flex items-center space-x-3'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                <span className='text-gray-300'>24/7 customer support</span>
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
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>Sign in</h1>
              <p className='text-gray-600'>Welcome back to CityCruise</p>
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
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                  type="email"
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <input
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type="password"
                  placeholder='Enter your password'
                />
              </div>

              <div className='flex items-center justify-between'>
                <label className='flex items-center'>
                  <input type="checkbox" className='rounded border-gray-300 text-black focus:ring-black' />
                  <span className='ml-2 text-sm text-gray-600'>Remember me</span>
                </label>
                <Link to='/forgot-password' className='text-sm text-black hover:text-gray-700 font-medium'>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base'
              >
                Sign in
              </button>
            </form>

            {/* Sign up link */}
            <p className='text-center mt-6 text-gray-600'>
              New to CityCruise?{' '}
              <Link to='/signup' className='text-black hover:text-gray-700 font-medium'>
                Create an account
              </Link>
            </p>

            {/* Divider */}
            <div className='my-8 flex items-center'>
              <div className='flex-1 border-t border-gray-300'></div>
              <span className='px-4 text-sm text-gray-500 bg-white'>or</span>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            {/* Captain Login */}
            <Link
              to='/captain-login'
              className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base flex items-center justify-center'
            >
              <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
              </svg>
              Sign in as Captain
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

export default UserLogin
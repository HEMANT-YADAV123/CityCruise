/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
        }
        try {
            if (firstname.length < 3) {
                toast.error('First name must be at least 3 characters long')
                return;
            }
            if (lastname.length < 3) {
                toast.error('Last name must be at least 3 characters long')
                return
            }
            if (email.length < 5) {
                toast.error('Email must be at least 5 characters long')
                return
            }
            if (!email.includes('@') || !email.includes('.')) {
                toast.error('Please enter a valid email address');
                return;
            }
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

            if (response.status === 201) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('token', data.token);
                toast.success('Account created successfully!');
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
        setFirstname('')
        setLastname('')
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
                <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-black to-gray-900 items-start justify-center p-12'>
                    <div className='text-center text-white max-w-md mt-20'>
                        <img className='w-48 h-16 mb-8 mx-auto filter brightness-0 invert' src={loginlogo} alt="CityCruise" />
                        <h1 className='text-4xl font-bold mb-6'>Join CityCruise</h1>
                        <p className='text-xl text-gray-300 mb-8'>Start your journey with us today</p>
                        <div className='space-y-4 text-left'>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-gray-300'>Quick and easy registration</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-gray-300'>Instant access to rides</span>
                            </div>
                            <div className='flex items-center space-x-3'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <span className='text-gray-300'>Secure and trusted platform</span>
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
                            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Create account</h1>
                            <p className='text-gray-600'>Join the CityCruise community</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submitHandler} className='space-y-6'>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>
                                    Full Name
                                </label>
                                <div className='flex gap-4'>
                                    <input
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                        className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                                        type="text"
                                        placeholder='First name'
                                    />
                                    <input
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                        className='w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all duration-200 text-base'
                                    required
                                    type="password"
                                    placeholder='Create a password'
                                />
                            </div>

                            <div className='flex items-center'>
                                <input
                                    type="checkbox"
                                    required
                                    className='rounded border-gray-300 text-black focus:ring-black'
                                />
                                <span className='ml-2 text-sm text-gray-600'>
                                    I agree to the{' '}
                                    <Link to='/terms' className='text-black hover:text-gray-700 font-medium'>
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to='/privacy' className='text-black hover:text-gray-700 font-medium'>
                                        Privacy Policy
                                    </Link>
                                </span>
                            </div>

                            <button
                                type="submit"
                                className='w-full bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-base'
                            >
                                Create Account
                            </button>
                        </form>

                        {/* Sign in link */}
                        <p className='text-center mt-6 text-gray-600'>
                            Already have an account?{' '}
                            <Link to='/login' className='text-black hover:text-gray-700 font-medium'>
                                Sign in here
                            </Link>
                        </p>

                        {/* Divider */}
                        <div className='my-8 flex items-center'>
                            <div className='flex-1 border-t border-gray-300'></div>
                            <span className='px-4 text-sm text-gray-500 bg-white'>or</span>
                            <div className='flex-1 border-t border-gray-300'></div>
                        </div>

                        {/* Captain Signup */}
                        <Link
                            to='/captain-signup'
                            className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base flex items-center justify-center'
                        >
                            <svg className='w-5 h-5 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                                <path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
                            </svg>
                            Join as Captain
                        </Link>

                        {/* Terms Notice - Mobile */}
                        <div className='lg:hidden mt-8'>
                            <p className='text-xs text-gray-500 leading-tight text-center'>
                                By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from CityCruise and its affiliates to the number provided
                            </p>
                        </div>
                    </div>

                    {/* Footer - Only on desktop */}
                    <div className='hidden lg:block mt-12 text-center text-sm text-gray-500'>
                        <p>© 2024 CityCruise. All rights reserved.</p>
                        <p className='mt-2 max-w-md mx-auto'>
                            By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from CityCruise and its affiliates to the number provided
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
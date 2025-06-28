/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState,useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

const Captainlogin = () => {
    const [email,setEmail] = useState('harsh@gmail.com');  
    const [password,setPassword] = useState('Harsh@1'); 

    const {captain,setCaptain} = useContext(CaptainDataContext);
    const navigate = useNavigate();

    const submitHandler = async(e)=>{
        e.preventDefault();
        const captain = {
            email:email,
            password:password
        }
        try{

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)

        if( response.status === 200)
        {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token)
            navigate('/captain-home')
        }
    }
    catch(err)
    {
        if (err.response && err.response.data && err.response.data.message) {
                    toast.error(err.response.data.message); // Show backend error message
                } else {
                    toast.error('Something went wrong! Please try again.'); // General error
                }
            }    
        setEmail('')
        setPassword('')
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-32 h-10 mb-8 -ml-2'src={loginlogo} alt="img" />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                <input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email" 
                placeholder='email@example.com'
                />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                type="password" 
                placeholder='password'
                />
                <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            </form>

            <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'> Register as a captain </Link></p>
        </div>

        <div>
            <Link 
            to='/login'
            className='bg-[#d5622d] flex items-center justify-center text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                Sign in as User
            </Link>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Captainlogin

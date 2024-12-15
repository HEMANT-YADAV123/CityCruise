import React from 'react'
import logo from '../assets/CityCruise__2_-removebg-preview.png'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://store.yeelight.com/cdn/shop/articles/The_Accidental_Invention_How_the_Traffic_Light_Came_to_Be_1280x1100_crop_center.png?v=1700395912)] h-screen w-full flex justify-between flex-col'>
            <img className='w-32' src={logo} alt="" />
            <div className='bg-white pb-7 py-4 px-4'>
                <h2 className='text-2xl font-bold'>Get Started With CityCruise</h2>
                <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home
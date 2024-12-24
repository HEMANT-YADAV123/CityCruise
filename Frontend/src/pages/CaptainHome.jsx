import React from 'react'
import map from '../assets/map.png.png'
import logo from '../assets/CityCruise__3_-removebg-preview.png'

import { Link } from 'react-router-dom'
import CaptainDetails from './CaptainDetails'

const CaptainHome = () => {
  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 w-screen flex items-center justify-between'>
          <img className='w-32 h-10' src={logo} alt="" />
          <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-bold ri-logout-box-r-line'></i>
          </Link>
        </div>
      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src={map} alt="" />
      </div>
      <div className='h-2/5 p-6'>
          <CaptainDetails/>
      </div>
    </div>
  )
}

export default CaptainHome

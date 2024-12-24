import React, { useRef, useState } from 'react'
import map from '../assets/map.png.png'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'//gsap is an animation library and useGSAP ias a hook used for gsap
import gsap from 'gsap'
import CaptainDetails from './CaptainDetails'
import RidePopUp from '../components/RidePopUp'


const CaptainHome = () => {

const [ridePopUpPanel,setRidePopUpPanel] = useState(true);
const ridePopUpPanelRef = useRef(null);

useGSAP(function(){
  if(ridePopUpPanel)
  {
    gsap.to(ridePopUpPanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else
  {
    gsap.to(ridePopUpPanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[ridePopUpPanel])
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
      {/* Ride popup panel */}
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
           <RidePopUp setRidePopUpPanel={setRidePopUpPanel}/>
      </div>
    </div>
  )
}

export default CaptainHome

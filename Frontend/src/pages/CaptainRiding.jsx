import React, { useRef, useState } from 'react'
import map from '../assets/map.png.png'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const CaptainRiding = () => {
    const [finishRidePanel,setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    useGSAP(function(){
        if(finishRidePanel)
        {
          gsap.to(finishRidePanelRef.current,{
            transform: 'translateY(0)'
          })
        }
        else
        {
          gsap.to(finishRidePanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      },[finishRidePanel])

  return (
    <div className='h-screen relative'>
        <div className='fixed p-6 top-0 w-screen flex items-center justify-between'>
          <img className='w-32 h-10' src={logo} alt="" />
          <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-bold ri-logout-box-r-line'></i>
          </Link>
        </div>
        <div className='h-4/5'>
            <img className='h-full w-full object-cover' src={map} alt="" />
        </div>
        <div onClick={()=>{setFinishRidePanel(true)}} className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400'>
            <h5 onClick={()=>{}} className='p-1 text-center w-[95%] absolute top-0'><i className="text-3xl text-gray-600 ri-arrow-up-wide-line"></i></h5>
            <h4 className='text-lg font-semibold'>4KM away</h4>
            <button className='px-10 bg-green-600 text-white font-semibold p-3 rounded-lg'>Complete Ride</button>
        </div>
        <div ref={finishRidePanelRef} className='fixed w-full h-[93%] z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
           <FinishRide setFinishRidePanel={setFinishRidePanel}/>
      </div>
    </div>
  )
}

export default CaptainRiding

import React, { useRef, useState } from 'react'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import map from '../assets/map.png.png'
import {useGSAP} from '@gsap/react'//gsap is an animation library and useGSAP ias a hook used for gsap
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const Home = () => {
  const [pickup,setPickup] = useState('');
  const [destination,setDestination] = useState('');
  const [panelOpen,setPanelOpen] = useState(false);
  const panelRef = useRef(null);//ref is used to select any element like here we select the last div using ref={something}.
  const panelCloseRef = useRef(null);
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null);
  const [confirmRidePanel,setConfirmRidePanel] = useState(false)
  const confirmRidePanelRef = useRef(null);
  const [vehicleFound,setVehicleFound] = useState(false)
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [waitingForDriver,setWaitingForDriver] = useState(false)

  const submitHandler = (e)=>{
    e.preventDefault();

  } 
  useGSAP(function(){
    if(panelOpen)
    {
      gsap.to(panelRef.current,{ 
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current,{
        opacity: 1
      })
    }
    else
    {
      gsap.to(panelRef.current,{
        height: '0%',
        // opacity: 0
      })
      gsap.to(panelCloseRef.current,{
        opacity: 0
      })
    }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel)
    {
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else
    {
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel)
    {
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else
    {
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound)
    {
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    }
    else
    {
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[vehicleFound])

  useGSAP(function(){
    if(waitingForDriver)
    {
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }
    else
    {
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[waitingForDriver])

  return (
    
    <div className='h-screen relative overflow-hidden'>
      <img className='w-32 h-10 absolute left-3 top-4' src={logo} alt="" />

      {/* temperorary image */}
      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src={map} alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 
          ref={panelCloseRef} 
          onClick={()=>{setPanelOpen(false)}} 
          className='absolute right-6 top-6 text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }}>
              <div className="line absolute h-16 w-1 top-[46%] left-10 bg-gray-900 rounded-full"></div>
              <input 
              onClick={()=>{setPanelOpen(true)}}
              value={pickup}
              onChange={(e)=>{setPickup(e.target.value)}}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
              type="text" 
              placeholder='Add a pick-up location'
              />
              <input 
              onClick={()=>{setPanelOpen(true)}}
              value={destination}
              onChange={(e)=>{setDestination(e.target.value)}}
              className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
              type="text" 
              placeholder='Enter your destination'
              />
            </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
              <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen}/>
        </div>
      </div>
      {/* vehicle panel */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      {/* confirmRide panel */}
      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>  
        <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      {/* Looking for driver panel */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>  
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>
      {/* Waiting for driver panel */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>  
        <WaitingForDriver waitingForDriver={waitingForDriver}/>
      </div>
    </div>
  )
}

export default Home

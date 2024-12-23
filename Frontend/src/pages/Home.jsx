import React, { useRef, useState } from 'react'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import map from '../assets/map.png.png'
import {useGSAP} from '@gsap/react'//gsap is an animation library and useGSAP ias a hook used for gsap
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'

const Home = () => {
  const [pickup,setPickup] = useState('');
  const [destination,setDestination] = useState('');
  const [panelOpen,setPanelOpen] = useState(false);
  const panelRef = useRef(null);//ref is used to select any element like here we select the last div using ref={something}.
  const panelCloseRef = useRef(null);
  const [vehiclePanel,setVehiclePanel] = useState(false)
  const vehiclePanelRef = useRef(null);


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
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-14'>
            <VehiclePanel setVehiclePanel={setVehiclePanel}/>
      </div>
    </div>
  )
}

export default Home

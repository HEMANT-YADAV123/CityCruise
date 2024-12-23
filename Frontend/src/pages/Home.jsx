import React, { useRef, useState } from 'react'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import map from '../assets/map.png.png'
import car from '../assets/car.png'
import bike from '../assets/bike.png'
import auto from '../assets/auto.png'
import {useGSAP} from '@gsap/react'//gsap is an animation library and useGSAP ias a hook used for gsap
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

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
        <h5 onClick={()=>{setVehiclePanel(false)}} className='p-1 text-center w-[93%] absolute top-0'><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>    
          <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
            <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={car} alt="" />
              <div className='w-1/2 ml-2'>
                <h4 className='font-medium text-base'>CruiserGo <span><i className="ri-user-3-fill">4</i></span></h4>
                <h5 className='font-medium text-sm'>2 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, compact rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹193.20</h2>
            </div>
            <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={bike} alt="" />
              <div className='w-1/2'>
                <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill">1</i></span></h4>
                <h5 className='font-medium text-sm'>3 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, Motorcycle rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹65.3</h2>
            </div>
            <div className='flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between'>
              <img className='h-12' src={auto} alt="" />
              <div className='w-1/2 ml-2'>
                <h4 className='font-medium text-base'>CruiserAuto <span><i className="ri-user-3-fill">3</i></span></h4>
                <h5 className='font-medium text-sm'>2 min away</h5>
                <p className='font-normal text-xs text-gray-600'>Affordable, auto rides</p>
              </div>
              <h2 className='text-lg font-semibold'>₹110.4</h2>
            </div>
      </div>
    </div>
  )
}

export default Home

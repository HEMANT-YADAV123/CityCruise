/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import axios from 'axios'
import logo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import {useGSAP} from '@gsap/react'//gsap is an animation library and useGSAP ias a hook used for gsap
import gsap from 'gsap'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect,useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import LiveTracking from '../components/LiveTracking'


const CaptainHome = () => {

const [ridePopUpPanel,setRidePopUpPanel] = useState(false);
const ridePopUpPanelRef = useRef(null);
const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = useState(false);
const confirmRidePopUpPanelRef = useRef(null);
const [ride,setRide] = useState(null);

const {socket} = useContext(SocketContext);
const {captain} = useContext(CaptainDataContext);

useEffect(()=>{
  socket.emit('join', 
    { 
      userId: captain._id, 
      userType: 'captain' 
    })


const updateLocation = () => {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        
          socket.emit('update-location-captain', {
              userId: captain._id,
              location: {
                  ltd: position.coords.latitude,
                  lng: position.coords.longitude
              }
            })
        })
        }
      }

      const locationInterval = setInterval(updateLocation, 10000)
      updateLocation()
    }, [])

    socket.on('new-ride', (data)=>{
      console.log(data);
      setRide(data)
      setRidePopUpPanel(true)
    })

    async function confirmRide(){
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
          rideId: ride._id,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
        })

        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)
    }

      
  

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

useGSAP(function(){
  if(confirmRidePopUpPanel)
  {
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform: 'translateY(0)'
    })
  }
  else
  {
    gsap.to(confirmRidePopUpPanelRef.current,{
      transform: 'translateY(100%)'
    })
  }
},[confirmRidePopUpPanel])

  return (
    <div className='h-screen'>
        <div className='fixed p-6 top-0 w-screen flex items-center justify-between'>
          <img className='w-32 h-10' src={logo} alt="" />
          <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full'>
            <i className='text-lg font-bold ri-logout-box-r-line'></i>
          </Link>
        </div>
      <div className='h-3/5'>
        <LiveTracking/>
      </div>
      <div className='h-2/5 p-6'>
          <CaptainDetails/>
      </div>
      {/* Ride popup panel */}
      <div ref={ridePopUpPanelRef} className='fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
           <RidePopUp 
           ride={ride}
          //  passenger={passenger}
           setRidePopUpPanel={setRidePopUpPanel} 
           setConfirmRidePopUpPanel= {setConfirmRidePopUpPanel}
           confirmRide={confirmRide}
           />
      </div>
      {/*Confirm Ride PopUp  */}
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 translate-y-full bottom-0 bg-white px-3 py-10 pt-12'>
           <ConfirmRidePopUp 
           ride={ride}
           setConfirmRidePopUpPanel= {setConfirmRidePopUpPanel} 
           setRidePopUpPanel={setRidePopUpPanel}
           />
      </div>
    </div>
  )
}

export default CaptainHome

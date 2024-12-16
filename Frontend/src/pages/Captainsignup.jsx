import React, { useState,useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import {CaptainDataContext} from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Captainsignup = () => {
        const navigate = useNavigate();

        const [email,setEmail] = useState('');  
        const [password,setPassword] = useState(''); 
        const [firstname,setFirstname] = useState('');  
        const [lastname,setLastname] = useState(''); 
        
        const [ vehicleColor, setVehicleColor ] = useState('')
        const [ vehiclePlate, setVehiclePlate ] = useState('')
        const [ vehicleCapacity, setVehicleCapacity ] = useState('')
        const [ vehicleType, setVehicleType ] = useState('')

        const { captain,setCaptain } = useContext(CaptainDataContext);
    
    const submitHandler = async(e)=>{
        e.preventDefault();
        const CaptainData = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
              }
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData)
        if(response.status === 201)
        {
            const data = response.data;
            setCaptain(data.captain); 
            localStorage.setItem('token',data.token);
            navigate('/captain-home')
        }
    
        setEmail('')
        setPassword('')
        setFirstname('')
        setLastname('')
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('')
    }
  return (
    <div>
    <div className='py-2 px-5 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-32 h-10 mb-4 -ml-2'src={loginlogo} alt="img" />
            <form onSubmit={(e)=>{submitHandler(e)}}>

                <h3 className='text-lg w-full font-medium mb-2'>What's our Captain's name</h3>
                <div className='flex gap-4 mb-4'>
                    <input 
                    value={firstname}
                    onChange={(e)=>{setFirstname(e.target.value)}}
                    required 
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text" 
                    placeholder='First name'
                    />
                    <input 
                    value={lastname}
                    onChange={(e)=>{setLastname(e.target.value)}}
                    required 
                    className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
                    type="text" 
                    placeholder='Last name'
                    />
                </div>

                <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
                <input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required 
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email" 
                placeholder='email@example.com'
                />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input 
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                required
                type="password" 
                placeholder='password'
                />

                {/* //VEHICLE INFORMATION */}
                <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-4'>
                        <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Color'
                        value={vehicleColor}
                        onChange={(e) => {
                            setVehicleColor(e.target.value)
                        }}
                        />
                        <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        type="text"
                        placeholder='Vehicle Plate'
                        value={vehiclePlate}
                        onChange={(e) => {
                            setVehiclePlate(e.target.value)
                        }}
                        />
                    </div>
                    <div className='flex gap-4 mb-4'>
                        <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        type="number"
                        placeholder='Vehicle Capacity'
                        value={vehicleCapacity}
                        onChange={(e) => {
                            setVehicleCapacity(e.target.value)
                        }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-base placeholder:text-base'
                            value={vehicleType}
                            onChange={(e) => {
                                setVehicleType(e.target.value)
                            }}
                            >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Captain Account</button>
            </form>

            <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'> Login here </Link></p>
        </div>

        <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
    </div>
    </div>
  )
}

export default Captainsignup

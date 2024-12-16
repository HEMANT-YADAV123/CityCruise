import React, { useState ,useContext} from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link ,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
    const [email,setEmail] = useState('');  
    const [password,setPassword] = useState(''); 
    const [firstname,setFirstname] = useState('');  
    const [lastname,setLastname] = useState(''); 
    const [ userData, setUserData ] = useState({});
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserDataContext); 

const submitHandler = async(e)=>{
    e.preventDefault();
    const newUser = {
            fullname: {
                firstname: firstname,
                lastname: lastname
            },
            email: email,
            password: password,
        }
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser);

    if(response.status === 201)
    {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token',data.token);
        navigate('/home')
    }
    setEmail('')
    setPassword('')
    setFirstname('')
    setLastname('')
}
  return (
    <div>
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-32 h-10 mb-8 -ml-2'src={loginlogo} alt="img" />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <h3 className='text-lg font-medium mb-2'>Enter your name</h3>
                <div className='flex gap-4 mb-6'>
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
                <h3 className='text-lg font-medium mb-2'>Enter your email</h3>
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
                <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Create Account</button>
            </form>

            <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'> Login here </Link></p>
        </div>

        <div>
            <p className='text-xs leading-tight'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from CityCruise and it affilates to the number provided</p>
        </div>
    </div>
    </div>
  )
}

export default UserSignup

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState,useContext } from 'react'
import loginlogo from '../assets/CityCruise__3_-removebg-preview.png'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserLogin = () => {
const [email,setEmail] = useState('');  
const [password,setPassword] = useState(''); 
 

const {user , setUser}  = useContext(UserDataContext)
const navigate = useNavigate();



const submitHandler = async(e)=>{
    e.preventDefault();
    const userData = {
        email: email,
        password: password
    }
    try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)

            if(response.status === 200)
            {
                const data = response.data;
                setUser(data.user);//set the user with the fields we have provided.
                //and also store the token.
                localStorage.setItem('token',data.token);//take the token from data.token and set it into 'token' 
                toast.success('Login successfull!'); // Show success toast
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
    }
    catch(err){
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message); // Show backend error message
        } else {
            toast.error('Something went wrong! Please try again.'); // General error
        }
    }
    setEmail('')
    setPassword('')    
  }
  return (

    <div className='p-7 h-screen flex flex-col justify-between'>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
        <div>
            <img className='w-32 h-10 mb-8 -ml-2'src={loginlogo} alt="img" />
            <form onSubmit={(e)=>{submitHandler(e)}}>
                <h3 className='text-lg font-medium mb-2'>What's your email?</h3>
                <input 
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                required 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="email" 
                placeholder='email@example.com'
                />

                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input 
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                required
                type="password" 
                placeholder='password'
                />
                <button className='bg-[#111] text-[#fff] font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
            </form>

            <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'> Create new Account </Link></p>
        </div>

        <div>
            <Link 
            to='/captain-login'
            className='bg-[#10b461] flex items-center justify-center text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                Sign in as Captain
            </Link>
        </div>
        
    </div>
  )
}

export default UserLogin

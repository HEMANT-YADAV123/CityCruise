import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProtectWrapper = ({children}) => {

  // const {user} = useContext(UserDataContext); //it take the user now we have set the value of user using setUser so if we have logged in then it will give us the value of the user with its email,fullname etc.
  //but there is problem with this user if the person reload the home page after login then user info dissappear and it will not be able to login so instead of this it would be great if we depend on token instead.
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext)
  const [ isLoading, setIsLoading ] = useState(true)
  

  // if(!user.email)//if user email dont't exists means user is not logged in so we will redirect him/her to login page. 
  // {
  //   navigate('login');
  // }

    useEffect(()=>{  //The useEffect ensures that this token check happens reactively whenever the token state changes.
      if(!token)
        {
          navigate('/login');
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
          headers: {
              Authorization: `Bearer ${token}`
          }
        }).then((response) =>{
            if(response.status === 200)
            {
                setUser(response.data)
                setIsLoading(false);
            }
        })
        .catch(err =>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/login')
            
        },[token])
        
    },[token])

    
    
    if(isLoading)
    {
        return(
            <div>
                Loading...
            </div>
        )
    }
  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper

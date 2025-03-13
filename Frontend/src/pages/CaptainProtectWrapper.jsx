/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { captain,setCaptain } = useContext(CaptainDataContext);
    const [isLoading,setisLoading] = useState(true);

    useEffect(()=>{  //The useEffect ensures that this token check happens reactively whenever the token state changes.
          if(!token)
            {
              navigate('/captain-login');
            }

            //we dont only need token to verify the captain because when a normal user also login then also token is generated so, we have to validate that token also
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) =>{
            if(response.status === 200)
            {
                const data = response.data
                setCaptain(data.captain)
                setisLoading(false);
            }
        })
        .catch(err =>{
            console.log(err);
            localStorage.removeItem('token')
            navigate('/captain-login')
            
        })
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
    
    export default CaptainProtectWrapper;
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Route,Routes } from 'react-router-dom'
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import Captainlogin from './pages/Captainlogin';
import Captainsignup from './pages/Captainsignup';
import { UserDataContext } from './context/UserContext';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CaptainForgotPassword from './pages/CaptainForgotPassword';
import CaptainResetPassword from './pages/CaptainResetPassword';

const App = () => {

  
  return (
    <div>
      <Routes>
        <Route path="/" element= {<Start/>} />
        <Route path='/login' element= {<UserLogin/>}/>
        <Route path='/riding' element= {<Riding/>}/>
        <Route path='/captain-riding' element= {<CaptainRiding/>}/>
        <Route path='/signup' element= {<UserSignup/>}/>
        <Route path='/captain-login' element= {<Captainlogin/>}/>
        <Route path='/captain-signup' element= {<Captainsignup/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/captain-forgot-password" element={<CaptainForgotPassword />} />
        <Route path="/captain-reset-password/:token" element={<CaptainResetPassword />} />
        <Route path='/home' 
          element= {
            <UserProtectWrapper>
              <Home/>
            </UserProtectWrapper>
          }
        />
        <Route path='/user/logout' 
          element= {
            <UserProtectWrapper>
              <UserLogout/>
            </UserProtectWrapper>
          }
        />

        <Route path='/captain-home' 
        element= {
          <CaptainProtectWrapper>    
            <CaptainHome/>
          </CaptainProtectWrapper>
          }/>

        <Route path='/captain/logout' 
        element= {
          <CaptainProtectWrapper>    
            <CaptainLogout/>
          </CaptainProtectWrapper>
          }/> 

      </Routes>
    </div>
  )
}

export default App

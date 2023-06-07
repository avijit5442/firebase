import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import PhoneSignup from './PhoneSignup'
import SignUp from './SignUp'
import WelcomeScreen from './WelcomeScreen'

const FirebaseRouteTable = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<SignUp/>}/>
        <Route path="/dashboard" element={<WelcomeScreen/>}/>
        <Route path="/phoneSignup" element={<PhoneSignup/>}/>
       </Routes>
    </BrowserRouter>
  )
}

export default FirebaseRouteTable
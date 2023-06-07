import React from 'react'
import { Button } from 'react-bootstrap'
import { useUserAuth } from './UserAuthContext'
import { signOut } from 'firebase/auth'
import { auth } from "./firebase";
import { useNavigate } from 'react-router-dom';
const WelcomeScreen = () => {
  const navigate=useNavigate()
  const {user}=useUserAuth()
  const handleSignout=()=>{
    signOut(auth)
    navigate("/")
  }
  return (
    <div className='container my-4' style={{display:'flex',justifyContent:"space-between"}}>
      Welcome<strong>{user && user.email ? user.email.split("@",1):user.phoneNumber}</strong>
      <Button onClick={handleSignout}>Logout</Button>
    </div>
  )
}

export default WelcomeScreen
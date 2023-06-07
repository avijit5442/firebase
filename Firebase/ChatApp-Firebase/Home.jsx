import React, { useEffect, useState } from 'react'
import { GoogleLoginButton } from 'react-social-login-buttons';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { auth } from './FirebaseConfig';
import { useNavigate } from 'react-router-dom';
const Home = ({setUser,setUserDetails}) => {
    useEffect(() => {
        const unsubscribe=onAuthStateChanged(auth,(currentuser)=>{
            setUserDetails(currentuser)
        })
      return () => {
        unsubscribe()
      }
    }, [])
    const navigate=useNavigate();
    const handleGoogleLogin=async (e)=>{
        e.preventDefault();
        try{
                const googleAuthProvider = new GoogleAuthProvider();
                await signInWithPopup(auth,googleAuthProvider);
                setUser(true);
                navigate("/chat");
        }
        catch(err){
              console.log(err.message);
              setUser(false);
          }
    }
  return (
    <div>
        <GoogleLoginButton onClick={handleGoogleLogin}/>
    </div>
  )
}
export default Home
import React, { useState } from 'react'
import {Form,Alert, Button} from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
const PhoneSignup = () => {
    const [phone, setPhone] = useState()
    const [error, setError] = useState()
    const [flag, setFlag] = useState(false)
    const [otp, setOtp] = useState("")
    const [confirmObj, setConfirmObj] = useState("")
    const {verifyCaptcha}=useUserAuth()
    const navigate=useNavigate()
    const getOtp=async (e)=>{
           e.preventDefault()
           setError("")
           if(phone==="" || phone===undefined){
           return setError("please enter valid number")
           }
           try{
            const response=await verifyCaptcha(phone)
            setFlag(true)
            console.log("response",response)
            setConfirmObj(response)
        }
        catch(err){
            setError(err.message)
        }
    }
    const verifyOtp=async (e)=>{
         e.preventDefault();
         console.log(otp);
         setError("")
         if(otp===undefined || otp==="") {return;}
         try{
            await confirmObj.confirm(otp);
            navigate("/dashboard")
         }
         catch(err){
            setError(err.message)
         }

    }
  return (
    <div>
        <div className='container my-4'>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={getOtp} style={{display: !flag?"block":"none"}}>
          <Form.Group className="mb-3 w-25" controlId="formBasicEmail">
          <PhoneInput
           placeholder="Enter phone number"
           value={phone}
           defaultCountry="IN"
           onChange={setPhone}/>
          </Form.Group>
          <div id='recaptcha-container'/>
          <Button>Cancel</Button>
          <Button className="mx-4"variant="info" type="submit">Get Otp</Button>
        </Form>
        </div>
        <div className='container my-4'>
        <Form onSubmit={verifyOtp}style={{display: flag?"block":"none"}}>
          <Form.Group className="mb-3 w-25" controlId="formBasicEmail">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control type="text"  onChange={(e)=>setOtp(e.target.value)}/>
          </Form.Group>
          <Button className="mx-4"variant="success" type="submit">Verify Otp</Button>
        </Form>
        </div>
    </div>
  )
}

export default PhoneSignup
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { GithubLoginButton } from "react-social-login-buttons";
import { auth } from './firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
function Login() {
  const {googleSignIn}=useUserAuth()
  const {facebookSignIn}=useUserAuth()
  const {githubSignIn}=useUserAuth()
  const {logIn}=useUserAuth()
    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState()
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError("")
        try{
            await logIn(email,password)
            navigate("/dashboard")
        }
        catch(err){
            console.log(err.message)
            setError(err.message)
        }
    }
    const handleGoogleLogin = async (e)=>{
        e.preventDefault();
        try{
          await googleSignIn()
          navigate("/dashboard")
        }
        catch (err){
          setError(err.message)
        }
    }
    const handleFacebookLogin=async(e)=>{
           e.preventDefault();
           try{
            await facebookSignIn()
            navigate("/dashboard")
           }
           catch (err){
            setError(err.message)
          }
    }
    const handleGithubLogin=async(e)=>{
      e.preventDefault();
      try{
        await githubSignIn()
        navigate("/dashboard")
      }
      catch (err){
        setError(err.message)
      }
    }
    const handlePasswordReset=async(e)=>{
      // e.preventDefault();

      try{
        await sendPasswordResetEmail(auth, email)
        alert("Password reset email sent")
      }

      catch (err){
        setError(err.message)
      }
    }
  return (
    <div className='container'>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
<Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email address</Form.Label>
  <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}} />
  <Form.Text className="text-muted">
    We'll never share your email with anyone else.
  </Form.Text>
</Form.Group>
<Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>Password</Form.Label>
  <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
  <br/>
  <hr/>
  <br/>
  <GoogleLoginButton onClick={handleGoogleLogin} />
  <FacebookLoginButton onClick={handleFacebookLogin} />
  <GithubLoginButton onClick={handleGithubLogin} />
</Form.Group>
<div style={{display:"flex",justifyContent:"center"}}>
<Button variant="success" type="submit">
  Submit
</Button>
</div>
</Form>
<br/>
<div>
<div style={{display:"flex",justifyContent:"space-between"}}>
   <Link to="/register"><h3 className='text-warning'>SignUp</h3></Link>
   <Link to="/phoneSignup"style={{fontStyle:"italic"}}><h2>SignIn with PhoneNumber</h2></Link>
   <h5 className='text-info' onClick={handlePasswordReset}>Forgot password ? </h5>
</div>
</div>
    </div>

  );
}

export default Login;
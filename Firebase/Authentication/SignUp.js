import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Form,Alert} from 'react-bootstrap';
import { useUserAuth } from './UserAuthContext';
import { useNavigate } from 'react-router-dom';
function SignUp() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const {signUp}=useUserAuth()
    const navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError("")
        try{
            await signUp(email,password)
            navigate("/")
        }
        catch(err){
            console.log(err.message)
            setError(err.message)
        }
    }

  return (
    <div className='container'>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
      </Form.Group>
        <Button variant="primary" type="submit">
        Submit
        </Button>
    </Form>
    </div>

  );
}

export default SignUp
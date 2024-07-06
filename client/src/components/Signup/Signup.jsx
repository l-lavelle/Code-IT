import React, { useState } from "react";
import '../../Variables.css'
import '../Login/Login.css'
import Form from 'react-bootstrap/Form';


const Signup = () => {
  const [signupData, setSignupData] = useState({ username: '', password: '' , confirmPassword:''});
  const [errorMessage, setErrorMessage] = useState('');

  const updateSignup= async (event)=>{
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };


  const handleSignup = async (event) => {
    event.preventDefault();
//    Update to signup
    try {
      let domain = window.location.origin;
      var url = new URL(domain);
      url.port = '3001';  
      let url2 = `${url}signup/`;
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ username: signupData.username,password:signupData.password }),
        headers: { "Content-Type": "application/json" },
       });
       if (response.ok) {
           const data = await response.json();
           console.log(data);
       } else {
           alert('Failed to edit the quantity');
       }

    } catch (error) {
      // setMesage({message:'Username or password incorrect', status:'error'})
      console.log(error);
    }
  };
   
  return (
    <>
      <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3 text-left signup-login-text" >
            <Form.Label>Username</Form.Label>
            <Form.Control 
            type="text"
            name="username"
            value={signupData.username}
            onChange={updateSignup} 
            />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            name="password"
            value={signupData.password}
            onChange={updateSignup} 
            />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
              type="password" 
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={updateSignup} 
              />
          </Form.Group>
        <button className="button-ct" variant="primary" type="submit">
        Submit
        </button>
        </Form>
        </>
  );
};

export default Signup;
//Sapce for error message
//Input validation
import React, { useState } from "react";
import '../../Variables.css'
import './Login.css'
import Form from 'react-bootstrap/Form';


const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' , confirmPassword:''});
  const [errorMessage, setErrorMessage] = useState('');

  const updateLogin= async (event)=>{
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
   
    try {
      let domain = window.location.origin;
      var url = new URL(domain);
      url.port = '3001';  
      let url2 = `${url}login/`;
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ username: loginData.username,password:loginData.password }),
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
    <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3 text-left signup-login-text">
      <Form.Label>Username</Form.Label>
      <Form.Control 
      type="text" 
      name="username"
      value={loginData.username}
      onChange={updateLogin}
      />
    </Form.Group>

    <Form.Group className="mb-3 text-left signup-login-text">
      <Form.Label>Password</Form.Label>
      <Form.Control 
       type="password" 
       name="password"
       value={loginData.password}
       onChange={updateLogin}/>
    </Form.Group>
   <button className="button-ct" variant="primary" type="submit">
        Submit
   </button>
  </Form>
  </>
  );
};

export default Login;
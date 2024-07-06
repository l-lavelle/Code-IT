import React, { useState } from "react";
import '../../Variables.css';
import './Login.css';
import Form from 'react-bootstrap/Form';
import AuthService from '../../utils/auth';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [message, setMessage]=useState({message:'', status:''});

  const updateLogin= async (event)=>{
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (loginData.username ==="" || loginData.password === ""){
      setMessage({message:'Must enter username and password', status:'error'});
    } else {
    try {
      let url2
      let domain = window.location.origin;
      var url = new URL(domain);
      url.port = '3001';  
      url2 = `${url}login/`;
      if (process.env.NODE_ENV === "production") {
         url2 = `${domain}login/`;
      }
      
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ username: loginData.username,password:loginData.password }),
        headers: { "Content-Type": "application/json" },
       });
       if (response.ok) {
           const data = await response.json();
           AuthService.login(data.token);
       }else{
        setMessage({message:'Username or password incorrect', status:'error'});
       }

    } catch (error) {
      setMessage({message:'Username or password incorrect', status:'error'});
      console.log(error);
    }
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
      className={message.status==='error'?"input-error":null}
      />
    </Form.Group>

    <Form.Group className="mb-3 text-left signup-login-text">
      <Form.Label>Password</Form.Label>
      <Form.Control 
       type="password" 
       name="password"
       value={loginData.password}
       onChange={updateLogin}
       className={message.status==='error'?"input-error":null}
       />
    </Form.Group>
   <button className="button-ct" variant="primary" type="submit">
        Submit
   </button>
   {message.status==='error'?<p className='text-center mt-3' style={{color:"red"}}>{message.message}</p>:<p></p>}
  </Form>
  </>
  );
};

export default Login;
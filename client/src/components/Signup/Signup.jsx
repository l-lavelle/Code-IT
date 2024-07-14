import React, { useState } from "react";
import '../../Variables.css';
import '../Login/Login.css';
import Form from 'react-bootstrap/Form';
import AuthService from '../../utils/auth';
import {findURL} from '../../utils/general';

const Signup = () => {
  const [signupData, setSignupData] = useState({ username: '', password: '' , confirmPassword:''});
  const [message, setMessage]=useState({message:'', status:'', type:''});

  const updateSignup= async (event)=>{
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  function isAllCharPresent(str) {
    let pattern = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    if (pattern.test(str))
        return true;
    else
        return false;
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (signupData.username===""|| signupData.password===""|| signupData.confirmPassword===""){
        setMessage({message:'Fill out all fields to create an account', status:'error', type:"all"});
    }
    else if(signupData.username.length<5 || signupData.username.length>40){
        setMessage({message:'Username must be between 5-40 characters', status:'error',type:'username'});
    } else if((isAllCharPresent(signupData.password)===false)){
        setMessage({message:'Password needs lowercase, uppercase, number and special character', status:'error',type:'password'});
    } else if(signupData.password!==signupData.confirmPassword){
        setMessage({message:'Passwords do not match', status:'error',type:'password'});
    } else{
    try {
      const url2 = findURL("signup")
      const response = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify({ username: signupData.username,password:signupData.password }),
        headers: { "Content-Type": "application/json" },
       });       
       if (response.ok) {
           const data = await response.json();
           AuthService.login(data.token);
       };
       if (!response.ok) {
        const data = await response.json();
        if(data.name==="SequelizeUniqueConstraintError"){
            setMessage({message:'Username already exists', status:'error', type:'username'})
        }
      }
    } catch (error) {    
      console.log(error);
    }
   }
  };
   
  return (
    <>
    <h1 className="mb-4">Signup</h1>
      <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3 text-left signup-login-text" >
            <Form.Label>Username</Form.Label>
            <Form.Control 
            type="text"
            name="username"
            value={signupData.username}
            onChange={updateSignup} 
            className={message.type==='username'|| message.type ==='all'?"input-error":null}
            />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text">
            <Form.Label>Password</Form.Label>
            <Form.Control 
            type="password" 
            name="password"
            value={signupData.password}
            onChange={updateSignup} 
            className={message.type==='password'|| message.type ==='all'?"input-error":null}
            />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
              type="password" 
              name="confirmPassword"
              value={signupData.confirmPassword}
              onChange={updateSignup} 
              className={message.type==='password'|| message.type ==='all'?"input-error":null}
              />
          </Form.Group>
        <button className="button-ct" variant="primary" type="submit">
        Submit
        </button>
        </Form>
        {message.status==='error'?<p className='text-center mt-3 sl-error' style={{color:"red"}}>{message.message}</p>:<p className='mt-3 sl-error'>&#8203;</p>}
        </>
  );
};

export default Signup;
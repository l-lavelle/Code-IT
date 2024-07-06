import React, { useState } from "react";
import '../../Variables.css'
import './Login.css'
import Form from 'react-bootstrap/Form';
import CodeCat from '../CodeCat/CodeCat';
import Signup from '../Signup/Signup';
import Login from './Login';

const LoginSignup = () => {
  const [switched, setSwitched] = useState(false);
  const [signupData, setSignupData] = useState({ username: '', password: '' });
  const [loginData, setLoginData] = useState({ username: '', password: '' , confirmPassword:''});
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const updateSignup= async (event)=>{
  //   const { name, value } = event.target;
  //   setSignupData({ ...signupData, [name]: value });
  // };

  // const updateLogin= async (event)=>{
  //   const { name, value } = event.target;
  //   setLoginData({ ...loginData, [name]: value });
  // };

  // const handleLogin = async (event) => {
  //   event.preventDefault();
   
  //   try {
  //     let domain = window.location.origin;
  //     var url = new URL(domain);
  //     url.port = '3001';  
  //     let url2 = `${url}login/`;
  //     const response = await fetch(url2, {
  //       method: 'POST',
  //       body: JSON.stringify({ username: loginData.username,password:loginData.password }),
  //       headers: { "Content-Type": "application/json" },
  //      });
  //      if (response.ok) {
  //          const data = await response.json();
  //          console.log(data);
  //      } else {
  //          alert('Failed to edit the quantity');
  //      }

  //   } catch (error) {
  //     // setMesage({message:'Username or password incorrect', status:'error'})
  //     console.log(error);
  //   }
  // };
   
  return (
<main className="SL-wrapper">
{ switched===true? <h2 className="pt-5">SignUp</h2>:<h2 className="pt-5">Login</h2> }
  <div className="p-3 signup-login-container">
    <div className={switched===true? "hidden ":"visible login-container"}>
      <Login/>
     {/* <Form onSubmit={handleLogin}>
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
    </Form> */}
    </div>
    <div className={switched===true? "hidden":"visible signup-switch-container"}>
     <p>
            Don't have an account yet? <span className="SL-switch-text" onClick={()=>setSwitched(true)}>Signup</span>
     </p>
    <CodeCat />
    </div>


  <div className={switched===true? "visible signup-container":"hidden"}>
        <Signup/>
         {/* <Form>
          <Form.Group className="mb-3 text-left signup-login-text" >
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text" >
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
          </Form.Group>
        </Form>
        <button className="button-ct" variant="primary" type="submit">
             Submit
        </button>*/}
        </div>
        <div className={switched===true? "visible login-switch-container":"hidden"}>
        <p> Already have an account? <span className="SL-switch-text" onClick={()=>setSwitched(false)}>Login</span>
         </p>
        <CodeCat /> 
      </div>
   </div>
</main>
  );
};

export default LoginSignup;
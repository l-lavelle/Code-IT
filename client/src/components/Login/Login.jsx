//Sapce for error message
//Input validation

import React, { useState } from "react";
import '../../Variables.css'
import './Login.css'
import Form from 'react-bootstrap/Form';
import CodeCat from '../CodeCat/CodeCat';

const Login = () => {
  const [switched, setSwitched] = useState(false);

  const fadeOut=()=>{
    setSwitched(true)
  }

  return (
<main className="SL-wrapper">
{ switched===true? <h2 className="pt-5">SignUp</h2>:<h2 className="pt-5">Login</h2> }
  <div className="p-3 signup-login-container">
    <div className={switched===true? "hidden ":"visible login-container"}>
     <Form>
      <Form.Group className="mb-3 text-left signup-login-text" controlId="formBasic">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="text" />
      </Form.Group>

      <Form.Group className="mb-3 text-left signup-login-text" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" />
      </Form.Group>
     <button className="button-ct" variant="primary" type="submit">
          Submit
     </button>
    </Form>
    </div>
    <div className={switched===true? "hidden":"visible signup-switch-container"}>
     <p>
            Don't have an account yet? <span className="SL-switch-text" onClick={()=>setSwitched(true)}>Signup</span>
     </p>
    <CodeCat />
    </div>


  <div className={switched===true? "visible signup-container":"hidden"}>

         <Form>
          <Form.Group className="mb-3 text-left signup-login-text" controlId="formBasic">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="text" />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

          <Form.Group className="mb-3 text-left signup-login-text" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" />
          </Form.Group>
        </Form>
        <button className="button-ct" variant="primary" type="submit">
             Submit
        </button>
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

export default Login;
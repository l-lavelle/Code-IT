import React, { useState } from "react";
import '../../Variables.css';
import './Login.css';
import Logo from '../../assets/logo.png';
import Signup from '../Signup/Signup';
import Login from './Login';

const LoginSignup = () => {
  const [switched, setSwitched] = useState(false);
   
  return (
  <main className="SL-wrapper">
    <div className="p-3 signup-login-container">
      <div className={switched===true? "hidden ":"visible login-container"}>
        <Login/>
      </div>
      <div className={switched===true? "hidden":"visible signup-switch-container"}>
        <p>Don't have an account yet? <span className="SL-switch-text" onClick={()=>setSwitched(true)}>Signup</span></p>
        <img className="ls-logo" src={Logo} />
      </div>


      <div className={switched===true? "visible signup-container":"hidden"}>
        <Signup/>
      </div>
      <div className={switched===true? "visible login-switch-container":"hidden"}>
        <p> Already have an account? <span className="SL-switch-text" onClick={()=>setSwitched(false)}>Login</span></p>
        <img className="ls-logo" src={Logo} />
      </div>
    </div>
  </main>
  );
};

export default LoginSignup;
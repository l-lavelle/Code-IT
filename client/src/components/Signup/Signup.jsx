import React, { useState } from "react";
import '../../Variables.css'
import '../Login/Login.css'
import Form from 'react-bootstrap/Form';
import CodeCat from '../CodeCat/CodeCat';
import Login from '../Login/Login';

const Signup = () => {
  const [switched, setSwitched] = useState(false);
  const [signupData, setSignupData] = useState({ username: '', password: '' });
//   const [loginData, setLoginData] = useState({ username: '', password: '' , confirmPassword:''});
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const updateSignup= async (event)=>{
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

//   const updateLogin= async (event)=>{
//     const { name, value } = event.target;
//     setLoginData({ ...loginData, [name]: value });
//   };

  const handleLogin = async (event) => {
    event.preventDefault();
   
    try {
      let domain = window.location.origin;
      var url = new URL(domain);
      url.port = '3001';  
      let url2 = `${url}login/`;
      const response = await fetch(url2, {
        method: 'POST',
        // body: JSON.stringify({ username: loginData.username,password:loginData.password }),
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
      <Form>
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
        </button>
        </>
//     <>
//    <div className={switched===false? "visible signup-container":"hidden"}>
//         <Login/>
//     </div>
//   <div className={switched===true? "visible signup-container":"hidden"}>

//          <Form>
//           <Form.Group className="mb-3 text-left signup-login-text" >
//             <Form.Label>Email Address</Form.Label>
//             <Form.Control type="text" />
//           </Form.Group>

//           <Form.Group className="mb-3 text-left signup-login-text">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" />
//           </Form.Group>

//           <Form.Group className="mb-3 text-left signup-login-text" >
//               <Form.Label>Confirm Password</Form.Label>
//               <Form.Control type="password" />
//           </Form.Group>
//         </Form>
//         <button className="button-ct" variant="primary" type="submit">
//              Submit
//         </button>
//         {/* </div> */}
//         {/* <div className={switched===true? "visible login-switch-container":"hidden"}> */}
//         <p> Already have an account? <span className="SL-switch-text" onClick={()=>setSwitched(false)}>Login</span>
//          </p>
//         <CodeCat />
//       </div>
//       </>
  );
};

export default Signup;
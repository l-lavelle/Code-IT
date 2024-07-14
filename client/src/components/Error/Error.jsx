import React from "react";
import '../../Variables.css';
import './Error.css'
import { Link } from 'react-router-dom';
import ParticleBackground from '../Homepage/ParticleBackground';

const Error = () => {
  return (
    <>
    <div className="error-wrapper"><ParticleBackground fullScreen={true}/></div>
    <div className="error-content">
        <h1 className="error-404">404</h1>
        <div className="error-text">
            <h2>Page Not Found</h2>
            <h3>Possible Reasons:</h3>
              <ul>
                <li>The address may be typed incorrectly</li>
                <li>Outdated or broken link</li>
              </ul>
            <h4>Please return to the <Link to="/" > Homepage </Link> to access content</h4>
        </div>
   </div>
   </>
  );
};

export default Error;
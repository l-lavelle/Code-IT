import React from "react";
import '../../Variables.css';
import './About.css';
import laurenPic from '../../assets/lauren.JPG';
import Logo from '../../assets/logo.png';
import {Row, Col} from 'react-bootstrap';

const About = () => {
  return (
    <div className="about-container ps-3 pe-3 pt-3">
    <div className="d-flex justify-content-center about-wrapper">
        <div className="about-info mx-3 px-2 pb-2 pt-2 mb-3">
            <div className="about-title pt-2">
                <h2 md={6} lg={4}>About CodeIT</h2>
                <img className="mb-2 about-logo" src={Logo} alt="CodeIt logo"/>
            </div>
            <div md={6} lg={7} >
                <p>Welcome to CodeIT, the ultimate platform for honing your coding skills and preparing for real-world programming challenges. Whether you’re a beginner looking to learn the basics or an experienced developer aiming to sharpen your skills, our website offers a wide range of coding problems and languages to suit all levels.</p>
                <p>At CodeIT, our mission is to empower developers by providing a comprehensive and engaging platform for coding practice. We believe that solving coding challenges is one of the best ways to improve problem-solving skills, enhance coding proficiency, and prepare for technical interviews.</p>
                <p>Join CodeIT today and take the next step in your coding journey. Whether you’re preparing for a job interview, looking to improve your coding skills, or simply love solving problems, we have something for everyone.</p>
            </div>
        </div>
    </div>
   
    <Row className="lo-info-container mx-3">
        <Col md={12} lg={5} xl={4}>
            <img id="lo-pic" src={laurenPic} alt="Site Creator"/>
        </Col>
        <Col md={12} lg={7} className="lo-info pt-2 pb-2">
            <h4>Meet the Dev</h4>
            <p>Hello! I’m Lauren, a passionate and dedicated software developer. My journey in coding began with a fascination for problem-solving and a desire to create innovative solutions that make a difference. I continue to hone my skills in various programming languages, and have developed a deep understanding of software development principles.</p>
        </Col>
    </Row>
    </div>
  );
};

export default About;
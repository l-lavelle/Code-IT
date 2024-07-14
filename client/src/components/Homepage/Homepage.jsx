import './Homepage.css';
import '../../Variables.css';
import React from "react";
import homePic from '../../assets/homePic.jpg';
import Java from '../../assets/e-java.png';
import JavaScript from '../../assets/e-JS.png';
import Python from '../../assets/e-python.png';
import SQL from '../../assets/e-SQL.png';
import {Row, Col, Container} from 'react-bootstrap';
import { ArrayPlusDelay } from './HomeFunction.js';
import ParticleBackground from './ParticleBackground.jsx';

const Homepage = () => {

ArrayPlusDelay(['Gain Confidence','Expand Your Skills'], function(obj) {document.getElementById("RotatingKeywords").textContent=(obj)},5000);

  return (
    <div className="overlay overflow-hidden w-full h-full shadow-4xl mt-3">
    <h1 id="RotatingKeywords" >Build Expertise</h1>
    <h4 className="mb-3">Test And Expand Your Coding Knowledge To Master Web Development </h4>
    <div id='canvas-container'>
    <ParticleBackground fullScreen={false}/>
    <img id="above-img"  className="mt-3" src={homePic} alt="Programmer Working" />

    </div>

    <div className="tech-border mx-3 mb-3">
        <div className=" home-tech-container">
        <Container>
            <Row> <h2 className="mt-2 mb-2">Tech Stack</h2> </Row>

            <Row className="mx-1">
               <Col xs={6} md={3} className="mb-3 tech-name">
               <img className="tech-img" src={Java}/>
               <div className="overlay-tech-lang px-1">
                   <p>Object-Oriented Programming Language</p>
               </div>
               Java
               </Col>
               <Col xs={6} md={3} className="mb-3 tech-name">
               <img className="tech-img" src={JavaScript}/>
               <div className="overlay-tech-lang px-1">
                   <p>Scripting Language for Creating Dynamic Web Page Content</p>
               </div>
               JavaScript
               </Col>
               <Col xs={6} md={3} className="mb-3 tech-name">
               <img className="tech-img" src={Python}/>
               <div className="overlay-tech-lang px-1">
                  <p>General Purpose Language for Web Applications and Software</p>
               </div>
               Python
               </Col>
               <Col xs={6} md={3} className="mb-3 tech-name">
               <img className="tech-img" src={SQL}/>
               <div className="overlay-tech-lang px-1">
                   <p>Standard Language for Database Creation and Manipulation</p>
               </div>
               SQL
               </Col>
            </Row>
            </Container>
        </div>
    </div>


{/*  Insert Content  */}
  <div className="home-info-container pt-3 pb-3">
        <div className="mt-3 mx-3 p-2 home-language-container">
            <Row className="language-reverse">
               <Col xs={12} md={6}>
                  <h2>Picture</h2>
               </Col>
               <Col xs={12} md={6}>
               <Row>
               <h2 className="text-center">Learn New Languages</h2>
               </Row>
               <Row className="language-list-container">
                <ul className="language-list">
                    <li>sdf</li>
                    <li>asdf</li>
                </ul>
               </Row>
               </Col>
            </Row>
        </div>
         <div className="mt-3 mx-3 p-2 mb-3 home-skills-container">
            <Row>
             <Col xs={12} md={6}>
               <Row className="skills-list-container">
               <h2 className="text-center">Challenge Skills</h2>
               </Row>
               <Row ><ul className="language-list"><li>sdf</li><li>asdf</li></ul></Row>
               </Col>
               <Col xs={12} md={6}>
                 <h2>Picture</h2>
               </Col>
            </Row>
         </div>
      </div>
    </div>
  );
};

export default Homepage;
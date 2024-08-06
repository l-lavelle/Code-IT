import './Homepage.css';
import '../../Variables.css';
import React from "react";
import homePic from '../../assets/homePic.jpg';
import hpLang from '../../assets/hp-lanugages.jpg';
import hpSkills from '../../assets/hp-skills.png';
import hpBlocks from '../../assets/hp-blocks.png';
import Java from '../../assets/e-java.png';
import JavaScript from '../../assets/e-JS.png';
import Python from '../../assets/e-python.png';
import Typescript from '../../assets/typescript.png';
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
            <Col s={12} sm ={6} md={3} className="mb-3 tech-name">
              <img className="tech-img" src={Java} alt="Java Logo"/>
              <div className="overlay-tech-lang px-1">
                  <p>Object-Oriented Programming Language</p>
              </div>
              Java
            </Col>
            <Col s={12} sm ={6} md={3} className="mb-3 tech-name">
              <img className="tech-img" src={JavaScript} alt="JavaScript Logo"/>
              <div className="overlay-tech-lang px-1">
                  <p>Scripting Language for Creating Dynamic Web Page Content</p>
              </div>
              JavaScript
            </Col>
            <Col s={12} sm ={6} md={3} className="mb-3 tech-name">
              <img className="tech-img" src={Python} alt="Python Logo"/>
              <div className="overlay-tech-lang px-1">
                <p>General Purpose Language for Web Applications and Software</p>
              </div>
              Python
            </Col>
            <Col xs={12} sm ={6} md={3} className="mb-3 tech-name">
              <img className="tech-img" src={Typescript} alt="SQL Logo"/>
              <div className="overlay-tech-lang px-1">
                  <p>Adds Additional Syntax to JavaScript</p>
              </div>
              Typescript
            </Col>
          </Row>
        </Container>
      </div>
    </div>

    <div className="home-info-container pt-3 pb-3">
      <div className="mt-3 mx-3 p-2 home-language-container">
        <Row className="language-reverse">
          <Col xs={12} md={6} lg={12}>
          <img className="hp-pic" src={hpLang} />
          </Col>
          <Col xs={12} md={6} lg={12}className='d-flex flex-column justify-content-center algin-items-center'>
          <Row>
          <h2 className="text-center">Learn New Languages</h2>
          </Row>
          <Row >
          <p>Want to expand your knowledge and try coding in a new language? Work though the code challenges or just open the editor in order to practice. The free code editor allows you to choose from over 40 languages.  </p>
          </Row>
          </Col>
        </Row>
      </div>
         <div className="mt-3 mx-3 p-2 home-skills-container">
            <Row className='skills-row'>
             <Col xs={12} md={6} lg={12} className='d-flex flex-column justify-content-center algin-items-center'>
               <Row className="skills-list-container">
               <h2 className="text-center">Challenge Skills</h2>
               </Row>
               <Row ><p>Try our code challenges to practice and learn new skills. Ranging from simple to spicy, CodeIt has challenge levels for programmers of all skill levels to help you reach your next level. If you need help with a problem, check out the hints or possible solutions for assistance.</p></Row>
               </Col>
               <Col xs={12} md={6} lg={12}>
               <img className="hp-pic" src={hpSkills} />
               </Col>
            </Row>
         </div>
         <div className="mt-3 mx-3 p-2 mb-3 home-language-container">
            <Row className="language-reverse">
               <Col xs={12} md={6} lg={12}>
               <img className="hp-pic" src={hpBlocks} />
               </Col>
               <Col xs={12} md={6} lg={12} className='d-flex flex-column justify-content-center algin-items-center'>
               <Row>
               <h2 className="text-center">Create Code Blocks</h2>
               </Row>
               <Row className="language-list-container">
               <p>Have an idea or need to try out a quick piece of code to implement into a project later? Choose from over 40 languages and create your own code snippets to run and compile in the code editor. Signup for an account and you can save your code snippets to your dashboard to access later. </p>
               </Row>
               </Col>
            </Row>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
import React from "react";
import '../../Variables.css';
import './About.css';
import laurenPic from '../../assets/lauren.JPG';
import CodeCat from '../CodeCat/CodeCat';
import {Row, Col} from 'react-bootstrap';

const About = () => {
  return (
    <div className="about-container ps-3 pe-3 pt-3">
    <div className="d-flex justify-content-center  about-wrapper">
        <div className="about-info mx-3 px-2 pb-2 pt-2 mb-3">
            <div className="about-title">
            <h2 md={6} lg={4}><span id="spaceBreak">About </span><span >CodeIT</span></h2>
            <CodeCat/>
            </div>
            <div md={6} lg={7} className="text-left">
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
        </div>
    </div>
   
    <Row className="lo-info-container mx-3">
        <Col md={12} lg={5} xl={4}>
            <img id="lo-pic" src={laurenPic} alt="Site Creator"/>
        </Col>
        <Col md={12} lg={7} className="lo-info pt-2 pb-2">
            <h4 >Meet the Dev</h4>
            <p>Hi, Nice to Meet You! orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
        </Col>
    </Row>
    </div>
  );
};

export default About;
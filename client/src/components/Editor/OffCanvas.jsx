// Add Code cat here for assistance if needed
import React, { useState } from "react";
import './Landing.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import Editor from "@monaco-editor/react";
import info from "../../assets/info.svg";
import Logo from '../../assets/logo.png';

const OffCanvas = ({solution, hint, theme, language }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const options = {
    readOnly: true,
    lineNumbers:false,
    minimap:{
      enabled: false,
    },
    folding:false,
  };
  
  return (
    <>
      <img className="icon-image" src={info} onClick={handleShow} alt="info icon open offcanvas additional info"></img>
      <Offcanvas show={show} onHide={handleClose} className="offcanvas-styles">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Coding Challenge Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Accordion >
        <Accordion.Item eventKey="1">
            <Accordion.Header>Directions</Accordion.Header>
            <Accordion.Body>
            The editor is setup up to run the code you enter. You can change the theme to your perference. When you think you have the correct answer hit the compile button. It will run the code in the language idenified at the top of the screen and let you know if you are correct or not.
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
            <Accordion.Header>Hint</Accordion.Header>
            <Accordion.Body>
            {hint}
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
            <Accordion.Header>Possible Solution</Accordion.Header>
            <Accordion.Body className="oc-editor-styles">
            <Editor 
                width={`100%`}
                height='350px'
                value={solution}
                options={options}
                theme={theme.value}  
                language={language}
            />
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        <img className="mt-3 oc-logo" src={Logo}/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default OffCanvas;
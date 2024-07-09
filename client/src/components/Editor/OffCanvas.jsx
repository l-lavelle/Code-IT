// Add Code cat here for assistance if needed
// Add theme change to offcanvas take out of busy front page??
import React, { useState } from "react";
import './Landing.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import Editor from "@monaco-editor/react";
import info from "../../assets/info.svg"
const OffCanvas = ({solution, hint, theme }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <img className="icon-image" src={info} onClick={handleShow} alt="info icon open offcanvas additional info"></img>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Coding Challenge Info</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Accordion >
        <Accordion.Item eventKey="1">
            <Accordion.Header>Directions</Accordion.Header>
            <Accordion.Body>
            The editor is setup up to run the code you enter. You can change the theme to your perference. When you think you have the correct answer hit the compile button. It will run the code in the lnguage idenified at the top of the screen and let you know if you are correct or not.
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
            <Accordion.Body>
            <Editor 
                width={`100%`}
                height="125px"
                value={solution}
                theme={theme.value}
            />
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default OffCanvas;
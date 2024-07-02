//  Add icon to name, set up page link and chaning based on if logged in
import React from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../../Variables.css'
import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <>
     <Navbar collapseOnSelect  expand="lg">
          <Container>
            <Navbar.Brand  href="/">CodeIT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="ml-auto">
                <Nav.Link href="/Login">Login</Nav.Link>
                <Nav.Link href="/QuestionsHomepage">Signup</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
};

export default NavigationBar;
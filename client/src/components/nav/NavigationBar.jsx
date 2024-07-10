// TODO: Add icon to name
import React from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import '../../Variables.css';
import './NavigationBar.css';
import AuthService from '../../utils/auth';

const NavigationBar = () => {
  return (
    <>
     <Navbar collapseOnSelect  expand="lg">
          <Container>
            <Navbar.Brand  href="/">CodeIT</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="ms-auto">
                {/* <Nav.Link href="/QuestionsHomepage">Questions Homepage</Nav.Link> */}
                <NavDropdown title=" Start Coding" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/QuestionsHomepage">Code Challenges</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                </NavDropdown>
                {AuthService.loggedIn()?(<Nav.Link onClick={AuthService.logout}>Logout</Nav.Link>):(<Nav.Link href="/Login">Login</Nav.Link>)}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>
  );
};

export default NavigationBar;
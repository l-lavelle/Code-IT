import React from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import navLogo from '../../assets/logo-small.png';
import '../../Variables.css';
import './NavigationBar.css';
import AuthService from '../../utils/auth';

const NavigationBar = () => {
  return (
    <>
     <Navbar collapseOnSelect  expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                alt=""
                src={navLogo}
                // width="75px"
                height="75px"
                className="d-inline-block align-top"
              />{' '}
              CodeIT
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-white"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="ms-auto">
                <NavDropdown title=" Start Coding" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/QuestionsHomepage">Code Challenges</NavDropdown.Item>
                  <NavDropdown.Item href="/freeCode">Free Code</NavDropdown.Item>
                  {AuthService.loggedIn()?(<NavDropdown.Item href="/codeBlockDash">CodeBlock Dashboard</NavDropdown.Item>):null}
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
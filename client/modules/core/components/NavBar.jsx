import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = ({ }) => (
  <Navbar inverse fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="#">Sharing Hub</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="#">Join</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default NavBar;

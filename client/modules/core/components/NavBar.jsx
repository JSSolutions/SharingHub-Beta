import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const NavBar = ({ toggleIcon }) => (
  <Navbar className="main-nav-bar" inverse fixedTop>
    {toggleIcon}
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Sharing Hub</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <NavItem eventKey={1} href="/sign-up">Sign Up</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  toggleIcon: React.PropTypes.node,
};

export default NavBar;

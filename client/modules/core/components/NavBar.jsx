import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import authContainer from '../../accounts/containers/auth';

const NavBar = ({ toggleIcon, user, logout }) => (
  <Navbar className="main-nav-bar" inverse fixedTop>
    {toggleIcon}
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Sharing Hub</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      {user ?
        <Nav pullRight>
          <NavItem eventKey={1} href="/profile">Profile</NavItem>
          <NavItem eventKey={2} onClick={() => logout()}>Log Out</NavItem>
        </Nav>
        :
        <Nav pullRight>
          <NavItem eventKey={1} href="/sign-up">Sign Up</NavItem>
        </Nav>
      }
    </Navbar.Collapse>
  </Navbar>
);

NavBar.propTypes = {
  toggleIcon: React.PropTypes.node,
  user: React.PropTypes.object,
  logout: React.PropTypes.func,
};

export default authContainer(NavBar);

import React from 'react';
import NavBar from './NavBar.jsx';
import { Row } from 'react-bootstrap';

const AppLayout = ({ content, isFluid }) => (
  <div>
    <NavBar />
    <div className={isFluid ? 'container-fluid' : 'container'}>
      <Row>
        {content()}
      </Row>
    </div>
  </div>
);

AppLayout.propTypes = {
  content: React.PropTypes.func,
  isFluid: React.PropTypes.bool,
};

export default AppLayout;

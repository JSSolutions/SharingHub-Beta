import React from 'react';
import { Col } from 'react-bootstrap';
import authContainer from '../../accounts/containers/auth';

class Profile extends React.Component {

  render() {
    return (
      <div>
        <h3>{this.props.menu}</h3>
      </div>
    );
  }
}

Profile.propTypes = {
  menu: React.PropTypes.string,
};

export default authContainer(Profile);

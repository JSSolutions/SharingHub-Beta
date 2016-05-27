import React from 'react';
import { Col } from 'react-bootstrap';
import authContainer from '../../accounts/containers/auth';
import ProfileSettings from './ProfileSettings.jsx';
import ServicePage from './ServicePage.jsx';

class Profile extends React.Component {
  renderMenu() {
    const { menu } = this.props;
    if (menu === 'settings') {
      return <ProfileSettings {...this.props} />;
    }
    return <ServicePage {...this.props} service={menu} />;
  }

  render() {
    if (!this.props.user) {
      return (<h2>You Are not authorized, please login</h2>);
    }

    return (
      <Col lg={12}>
        {this.renderMenu()}
      </Col>
    );
  }
}

Profile.propTypes = {
  menu: React.PropTypes.string,
  user: React.PropTypes.object,
  context: React.PropTypes.func,
};

export default authContainer(Profile);

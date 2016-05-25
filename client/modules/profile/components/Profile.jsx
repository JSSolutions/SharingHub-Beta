import React from 'react';
import { Col } from 'react-bootstrap';
import authContainer from '../../accounts/containers/auth';
import ProfileSettings from './ProfileSettings.jsx';
import ServicePage from './ServicePage.jsx';

class Profile extends React.Component {

  renderMenu() {
    const { FlowRouter } = this.props.context();
    const menu = FlowRouter.getParam('menu') || 'basic';

    switch (menu) {
      case 'settings':
        return <ProfileSettings {...this.props} />;
      default:
        return <ServicePage {...this.props} menu={menu} />;
    }
  }

  render() {
    if (!this.props.user) {
      return (<h2>Pishow Naher z vidsu</h2>);
    }

    return (
      <Col lg={12}>
        {this.renderMenu()}
      </Col>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.object,
  context: React.PropTypes.func,
};

export default authContainer(Profile);

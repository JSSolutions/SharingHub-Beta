import React from 'react';
import Constants from '../../core/libs/constants';
import { Col, Row } from 'react-bootstrap';

class ProfileSettings extends React.Component {
  toggleService(serviceName, selected) {
    const { loginWithService, removeService } = this.props;
    if (selected) {
      removeService(serviceName);
    } else {
      loginWithService(serviceName);
    }
  }

  renderServiceItem(key, i) {
    const mergedServices = this.props.user.mergedServices;
    const selected = mergedServices.indexOf(key) !== -1;

    return (
      <Col xs={12} sm={6} lg={4} key={key + i}>
        <div className={`service-item ${selected ? 'selected' : ''}`}>
          <div className="service-item-content">
            <i className={Constants.services[key].icon} aria-hidden="true"></i>
            <span className="service-title ">{Constants.services[key].title}</span>
          </div>
          <div
            className="service-icon icon-right"
            onClick={() => this.toggleService(key, selected)}
          >
            <i className={`fa fa-${selected ? 'times' : 'plus'}`} aria-hidden="true"></i>
          </div>
        </div>
      </Col>
    );
  }

  renderServicesList() {
    const keys = Object.keys(Constants.services);

    return (
      <Row className="service-list">
        {keys.map((key, i) => this.renderServiceItem(key, i))}
      </Row>
    );
  }

  render() {
    return (
      <div>
        <h3>Settings</h3>
        <hr />
        {this.renderServicesList()}
      </div>
    );
  }
}

ProfileSettings.propTypes = {
  user: React.PropTypes.object.isRequired,
  context: React.PropTypes.func,
  loginWithService: React.PropTypes.func,
  removeService: React.PropTypes.func,
};

export default ProfileSettings;

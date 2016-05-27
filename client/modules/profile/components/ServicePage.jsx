import React from 'react';
import { Nav, NavItem, Button } from 'react-bootstrap';
import Constants from '../../core/libs/constants';
import SubjectList from '../../subjects/containers/subjects_list';
import MembersList from '../../members/containers/members_list';

class ServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 1 };
    this.handleSelectTab = this.handleSelectTab.bind(this);
    this.handleSync = this.handleSync.bind(this);
  }

  handleSync() {
    const service = this.props.service;
    this.props.syncService(service);
  }

  handleSelectTab(selectedTab) {
    this.setState({ selectedTab });
  }

  renderTabContent() {
    switch (this.state.selectedTab) {
      case 1:
        return <SubjectList service={this.props.service} />;
      case 2:
        return <MembersList service={this.props.service} />;
      default: return <div>Not Found</div>;
    }
  }

  render() {
    const service = this.props.service;
    return (
      <div>
        <div className="service-header">
          <h3>{Constants.services[service].title}</h3>
          <Button
            bsStyle="success"
            className="sync-button icon-button"
            onClick={this.handleSync}
          >
            <i className="fa fa-refresh" aria-hidden="true"></i>
            Sync
          </Button>
        </div>
        <hr />
        <Nav
          bsStyle="tabs"
          className="service-tabs"
          activeKey={this.state.selectedTab}
          onSelect={this.handleSelectTab}
        >
          <NavItem eventKey={1}>Subjects</NavItem>
          <NavItem eventKey={2}>Members</NavItem>
        </Nav>
        <div>
          {this.renderTabContent()}
        </div>
      </div>
    );
  }
}

ServicePage.propTypes = {
  service: React.PropTypes.string.isRequired,
  syncService: React.PropTypes.func.isRequired,
};

export default ServicePage;

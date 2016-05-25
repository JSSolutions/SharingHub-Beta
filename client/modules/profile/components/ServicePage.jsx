import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import Constants from '../../core/libs/constants';
import SubjectList from '../../subjects/components/SubjectList.jsx';
import MembersList from '../../members/components/MembersList.jsx';

class ServicePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedTab: 1 };
    this.handleSelectTab = this.handleSelectTab.bind(this);
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
        <h3>{Constants.services[service].title}</h3>
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
  service: React.PropTypes.string,
};

export default ServicePage;

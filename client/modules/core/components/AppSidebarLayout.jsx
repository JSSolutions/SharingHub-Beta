import React from 'react';
import NavBar from './NavBar.jsx';
import Sidebar from 'react-sidebar';
import { Row } from 'react-bootstrap';

class SidebarLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      sidebarDocked: false,
    };

    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentWillMount() {
    const mql = window.matchMedia('(min-width: 992px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: this.state.mql.matches });
  }

  renderToggleIcon() {
    const sidebarOpen = this.state.sidebarOpen;
    const sidebarDocked = this.state.sidebarDocked;

    if (sidebarDocked) {
      return null;
    }

    return (
      <div className="sidebar-toggle">
        <i className="material-icons" onClick={() => this.onSetSidebarOpen(!sidebarOpen)}>
          menu
        </i>
      </div>
    );
  }

  render() {
    return (
      <Sidebar
        sidebarClassName="sidebar"
        sidebar={this.props.sidebar()}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        touch
      >
        <div className="app-wrap">
          <NavBar toggleIcon={this.renderToggleIcon()} />
          <div className="container-fluid">
            <Row>
              {this.props.content()}
            </Row>
          </div>
        </div>
      </Sidebar>
    );
  }
}

SidebarLayout.propTypes = {
  content: React.PropTypes.func,
  sidebar: React.PropTypes.func,
};

export default SidebarLayout;

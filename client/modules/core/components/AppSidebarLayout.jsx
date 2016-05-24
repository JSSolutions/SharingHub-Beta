import React from 'react';
import NavBar from './NavBar.jsx';
import Sidebar from 'react-sidebar';

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
    const sidebarContent = <b>Sidebar content</b>;
    const toggleIcon = this.renderToggleIcon();

    return (
      <Sidebar
        sidebarClassName="sidebar"
        sidebar={sidebarContent}
        open={this.state.sidebarOpen}
        docked={this.state.sidebarDocked}
        onSetOpen={this.onSetSidebarOpen}
        touch
      >
        <div>
          <NavBar toggleIcon={toggleIcon} />
          <b>Main content</b>
        </div>
      </Sidebar>
    );
  }
}

export default SidebarLayout;

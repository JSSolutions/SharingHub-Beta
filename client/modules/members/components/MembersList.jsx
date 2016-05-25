import React from 'react';

class MembersList extends React.Component {
  render() {
    return (
      <div>
        {this.props.service} Members
      </div>
    );
  }
}

MembersList.propTypes = {
  service: React.PropTypes.string.isRequired,
};

export default MembersList;

import React from 'react';

class SubjectsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.service} Subjects
      </div>
    );
  }
}

SubjectsList.propTypes = {
  service: React.PropTypes.string.isRequired,
};

export default SubjectsList;

import React from 'react';
import { Col, Row } from 'react-bootstrap';

class TrelloSubjectDetail extends React.Component {
  render() {
    const { subject } = this.props;
    const additionalData = subject.additionalData || {};
    return (
      <div>
        <div className="subject-data">
          <p>Name: {subject.name}</p>
          <p>Service: {subject.service}</p>
          <p>Board Id: {subject.subjectKey}</p>
          <p>
            Url: <a href={additionalData.url} target="_blank">{additionalData.url}</a>
          </p>
          <p>Description: {additionalData.desc}</p>
        </div>
      </div>
    );
  }
}

TrelloSubjectDetail.propTypes = {
  service: React.PropTypes.string,
  subject: React.PropTypes.object,
  members: React.PropTypes.array,
};

export default TrelloSubjectDetail;

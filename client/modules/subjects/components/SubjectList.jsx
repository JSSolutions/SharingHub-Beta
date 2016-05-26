import React from 'react';
import { Col, Row } from 'react-bootstrap';

class SubjectsList extends React.Component {
  render() {
    const { subjects, service } = this.props;
    return (
      <Row className="list">
        {subjects && subjects.map((subject) => (
          <Col xs={12} sm={6} lg={4} key={subject._id}>
            <a
              className="list-item link-non-stiled"
              href={`/profile/${service}/subject/${subject._id}`}
            >
              <div className="list-item-content">
                <span className="list-item-title">{subject.name}</span>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    );
  }
}

SubjectsList.propTypes = {
  service: React.PropTypes.string.isRequired,
  subjects: React.PropTypes.array,
};

export default SubjectsList;

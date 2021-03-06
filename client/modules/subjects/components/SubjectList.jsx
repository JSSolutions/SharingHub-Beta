import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MaterialSpinner } from '../../core/libs/spinners.jsx';

class SubjectsList extends React.Component {
  handleUnshare(subjectKey) {
    const { service, member, unshareSubjectFromMember } = this.props;
    unshareSubjectFromMember(service, subjectKey, member.memberKey);
  }

  render() {
    const { subjects, service, member, loading } = this.props;
    if (loading) {
      return <MaterialSpinner className="spinner-center" noFadeIn />;
    }

    return (
      <Row className="list">
        {subjects && subjects.map((subject) => (
          <Col xs={12} sm={6} lg={4} key={subject._id}>
            <div className="list-item">
              <a
                className="list-item-content link-non-stiled"
                href={`/profile/${service}/subject/${subject._id}`}
              >
                <span className="list-item-title">{subject.name}</span>
              </a>
              {member ?
                <div className="list-icon">
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => this.handleUnshare(subject.subjectKey)}
                  > </i>
                </div>
              : null}
            </div>
          </Col>
        ))}
      </Row>
    );
  }
}

SubjectsList.propTypes = {
  member: React.PropTypes.object,
  service: React.PropTypes.string.isRequired,
  subjects: React.PropTypes.array,
  unshareSubjectFromMember: React.PropTypes.func,
  loading: React.PropTypes.bool,
};

export default SubjectsList;

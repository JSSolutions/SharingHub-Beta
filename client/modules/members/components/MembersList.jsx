import React from 'react';
import { Col, Row } from 'react-bootstrap';

class MembersList extends React.Component {
  handleUnshare(memberKey) {
    const { service, subject, unshareSubjectFromMember } = this.props;
    unshareSubjectFromMember(service, subject.subjectKey, memberKey);
  }

  render() {
    const { members, service, subject } = this.props;
    return (
      <Row className="list">
        {members && members.map((member) => (
          <Col xs={12} sm={6} lg={4} key={member._id}>
            <a
              className="list-item link-non-stiled"
            >
              <div className="list-item-content">
                <span className="list-item-title">
                  {member.name}
                </span>
              </div>
              <div className="list-icon">
                {subject ?
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => this.handleUnshare(member.memberKey)}
                  > </i>
                  : null}
              </div>
            </a>
          </Col>
        ))}
      </Row>
    );
  }
}

MembersList.propTypes = {
  service: React.PropTypes.string.isRequired,
  members: React.PropTypes.array,
  subjectDetail: React.PropTypes.bool,
  subject: React.PropTypes.object,
  unshareSubjectFromMember: React.PropTypes.func,
};

export default MembersList;

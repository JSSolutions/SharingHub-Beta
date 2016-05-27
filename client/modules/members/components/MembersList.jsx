import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { MaterialSpinner } from '../../core/libs/spinners.jsx';

class MembersList extends React.Component {
  handleUnshare(memberKey) {
    const { service, subject, unshareSubjectFromMember } = this.props;
    unshareSubjectFromMember(service, subject.subjectKey, memberKey);
  }

  renderMemberAvatar(member) {
    const avatar = member.$getAvatar();
    if (avatar) {
      return (
        <div className="image image-sm image-circle">
          <img src={avatar} role="presentation" />
        </div>
      );
    }
    return null;
  }

  render() {
    const { members, service, subject, loading } = this.props;
    if (loading) {
      return <MaterialSpinner className="spinner-center" />;
    }

    return (
      <Row className="list">
        {members && members.map((member) => (
          <Col xs={12} sm={6} lg={4} key={member._id}>
            <div className="list-item">
              <a
                className={`list-item-content link-non-stiled ${subject ? 'detail-page' : ''}`}
                href={`/profile/${service}/member/${member._id}`}
              >
                {this.renderMemberAvatar(member)}
                <span className="list-item-title">
                  {member.name}
                </span>
              </a>
              {subject ?
                <div className="list-icon">
                  <i
                    className="fa fa-times"
                    aria-hidden="true"
                    onClick={() => this.handleUnshare(member.memberKey)}
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

MembersList.propTypes = {
  service: React.PropTypes.string.isRequired,
  members: React.PropTypes.array,
  subjectDetail: React.PropTypes.bool,
  subject: React.PropTypes.object,
  unshareSubjectFromMember: React.PropTypes.func,
  context: React.PropTypes.func,
  loading: React.PropTypes.bool,
};

export default MembersList;

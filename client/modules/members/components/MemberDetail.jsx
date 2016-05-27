import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TrelloMember from './TrelloMemberDetail.jsx';
import SubjectList from '../../subjects/components/SubjectList.jsx';
import ShareModal from '../../subjects/components/ShareModal.jsx';
import { MaterialSpinner } from '../../core/libs/spinners.jsx';

class MemberDetail extends React.Component {
  renderServiceMember() {
    switch (this.props.service) {
      case 'trello':
        return <TrelloMember {...this.props} />;
      default:
        return <h3>Invalid Service</h3>;
    }
  }

  render() {
    const { member, loading, subjects, service, loadingAction,
      unshareSubjectFromMember, findSubject, shareSubjectToMember } = this.props;

    if (loading) {
      return <MaterialSpinner className="spinner-center" />;
    }
    if (!member) {
      return <h3>Not Found</h3>;
    }

    return (
      <Col lg={12}>
        <div>
          <h4>{member.name}</h4>
          <hr />
          <div>
            <h5>Member Data</h5>
            {this.renderServiceMember()}
          </div>
          <div>
            <h5>Subjects List</h5>
            <hr />
            <ShareModal
              service={service}
              findSubject={findSubject}
              member={member}
              shareSubjectToMember={shareSubjectToMember}
            />
            <SubjectList
              member={member}
              service={service}
              subjects={subjects}
              unshareSubjectFromMember={unshareSubjectFromMember}
              loading={loadingAction}
            />
          </div>
        </div>
      </Col>
    );
  }
}

MemberDetail.propTypes = {
  service: React.PropTypes.string,
  member: React.PropTypes.object,
  subjects: React.PropTypes.array,
  loadingAction: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  shareSubjectToMember: React.PropTypes.func,
  unshareSubjectFromMember: React.PropTypes.func,
  findSubject: React.PropTypes.func,
  context: React.PropTypes.func,
};

export default MemberDetail;

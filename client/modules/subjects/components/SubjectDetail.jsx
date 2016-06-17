import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TrelloSubject from './TrelloSubjectDetail.jsx';
import MembersList from '../../members/components/MembersList.jsx';
import ShareModal from './ShareModal.jsx';
import { MaterialSpinner } from '../../core/libs/spinners.jsx';

class SubjectDetail extends React.Component {
  renderServiceSubject() {
    switch (this.props.service) {
      case 'trello':
        return <TrelloSubject {...this.props} />;
      default:
        return <h3>Not Found</h3>;
    }
  }

  render() {
    const { subject, loading, members, service, loadingAction,
      findMember, shareSubjectToMember, unshareSubjectFromMember } = this.props;

    if (loading) {
      return <MaterialSpinner className="spinner-center" />;
    }
    if (!subject) {
      return <h3>Not Found</h3>;
    }

    return (
      <Col lg={12}>
        <div>
          <h4>{subject.name}</h4>
          <hr />
          <div>
            <h5>Subject Data</h5>
            {this.renderServiceSubject()}
          </div>
          <div>
            <h5>Members List</h5>
            <hr />
            <ShareModal
              service={service}
              findMember={findMember}
              subject={subject}
              shareSubjectToMember={shareSubjectToMember}
            />
            <MembersList
              members={members}
              service={service}
              subject={subject}
              unshareSubjectFromMember={unshareSubjectFromMember}
              loading={loadingAction}
            />
          </div>
        </div>
      </Col>
    );
  }
}

SubjectDetail.propTypes = {
  service: React.PropTypes.string,
  subject: React.PropTypes.object,
  members: React.PropTypes.array,
  loadingAction: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  shareSubjectToMember: React.PropTypes.func,
  unshareSubjectFromMember: React.PropTypes.func,
  findMember: React.PropTypes.func,
};

export default SubjectDetail;

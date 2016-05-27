import React from 'react';
import { Col, Row } from 'react-bootstrap';

class TrelloMemberDetail extends React.Component {
  render() {
    const { member } = this.props;
    const additionalData = member.additionalData || {};
    const avatar = member.$getAvatar();
    return (
      <div>
        <div className="detail-data">
          {avatar ?
            <div className="image image-lg">
              <img src={avatar} role="presentation" />
            </div>
          : null}
          <p>Name: {member.name}</p>
          <p>Service: {member.service}</p>
          <p>Username: {additionalData.username}</p>
          <p>Board Id: {member.memberKey}</p>
          <p>
            Url: <a href={additionalData.url} target="_blank">{additionalData.url}</a>
          </p>
        </div>
      </div>
    );
  }
}

TrelloMemberDetail.propTypes = {
  service: React.PropTypes.string,
  member: React.PropTypes.object,
};

export default TrelloMemberDetail;

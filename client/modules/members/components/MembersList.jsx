import React from 'react';
import { Table } from 'react-bootstrap';
import memberContainer from '../containers/members_list';

class MembersList extends React.Component {
  render() {
    return (
      <div>
        {this.props.members ?
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Id</th>
                <th>Tags</th>
              </tr>
            </thead>
            <tbody>
            {this.props.members.map((member, i) => (
              <tr key={member._id}>
                <td>{i + 1}</td>
                <td>{member.name}</td>
                <td>{member.memberKey}</td>
                <td>{member.tags}</td>
              </tr>
            ))}
            </tbody>
          </Table>
          :
          <div>{this.props.service} Subjects</div>
        }
      </div>
    );
  }
}

MembersList.propTypes = {
  service: React.PropTypes.string.isRequired,
  members: React.PropTypes.array,
};

export default memberContainer(MembersList);

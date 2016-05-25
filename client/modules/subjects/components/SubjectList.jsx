import React from 'react';
import { Table } from 'react-bootstrap';
import subjectContainer from '../containers/subjects_list';

class SubjectsList extends React.Component {
  render() {
    return (
      <div>
        {this.props.subjects ?
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
            {this.props.subjects.map((subject, i) => (
              <tr key={subject._id}>
                <td>{i + 1}</td>
                <td>{subject.name}</td>
                <td>{subject._id}</td>
                <td>{subject.tags}</td>
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

SubjectsList.propTypes = {
  service: React.PropTypes.string.isRequired,
  subjects: React.PropTypes.array,
};

export default subjectContainer(SubjectsList);

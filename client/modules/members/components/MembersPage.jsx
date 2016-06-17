import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import MemberList from './MembersList.jsx';

class MembersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false,
      modalValue: '',
    };

    this.close = this.close.bind(this);
    this.openCreateModal = this.openCreateModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
  }

  close() {
    this.setState({
      showCreateModal: false,
      modalValue: '',
    });
  }

  openCreateModal() {
    this.setState({ showCreateModal: true });
  }

  submitModal() {
    const value = this.state.modalValue;
    const { createServiceMember, service } = this.props;
    createServiceMember(service, value);
    this.close();
  }

  render() {
    const { members, service, subject, loading } = this.props;
    return (
      <div style={{ marginTop: '15px' }}>
        <div>
          <Button
            className="icon-button"
            onClick={this.openCreateModal}
            disabled={loading}
          >
            <i className="fa fa-plus" aria-hidden="true"></i>
            Create Member
          </Button>
        </div>
        <MemberList
          members={members}
          service={service}
          subject={subject}
          loading={loading}
        />

        <Modal show={this.state.showCreateModal} onHide={this.close} className="modal-center-mobile">
          <Modal.Header closeButton>
            <Modal.Title>{`Create ${service} member`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label>Member Key</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Type member key"
                  value={this.state.modalValue}
                  onChange={(e) => { this.setState({ modalValue: e.target.value }); }}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.submitModal}>Add To Subject</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

MembersList.propTypes = {
  service: React.PropTypes.string.isRequired,
  members: React.PropTypes.array,
  subjectDetail: React.PropTypes.bool,
  subject: React.PropTypes.object,
  createServiceMember: React.PropTypes.func,
  loading: React.PropTypes.bool,
};

export default MembersList;

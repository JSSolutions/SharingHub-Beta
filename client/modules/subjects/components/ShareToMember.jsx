import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';

class ShareToMember extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFindModal: false,
      options: [],
      modalValue: [],
    };

    this.close = this.close.bind(this);
    this.openFindModal = this.openFindModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitFindModal = this.submitFindModal.bind(this);
  }

  close() {
    this.setState({
      showFindModal: false,
      modalValue: [],
    });
  }

  openFindModal() {
    this.setState({ showFindModal: true });
  }

  handleSelect(modalValue) {
    this.setState({ modalValue });
  }

  onInputChange(input) {
    const { service, subject } = this.props;
    this.props.findMember(service, subject.subjectKey, input, (err, options) => {
      if (err) {
        console.log('err: ', err);
      } else {
        this.setState({ options });
      }
    });
  }

  submitFindModal() {
    const modalValue = this.state.modalValue && this.state.modalValue[0].memberKey;
    const { service, subject } = this.props;
    this.props.shareSubjectToMember(service, subject.subjectKey, modalValue);
    this.close();
  }

  render() {
    return (
      <div className="control-button">
        <Button
          className="icon-button"
          onClick={this.openFindModal}
        >
          <i className="fa fa-search-plus" aria-hidden="true"></i>
          Find Member
        </Button>
        <Modal show={this.state.showFindModal} onHide={this.close} className="modal-center-mobile">
          <Modal.Header closeButton>
            <Modal.Title>Find Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="typeahead">Find Member</label>
                <Typeahead
                  labelKey="name"
                  onChange={this.handleSelect}
                  onInputChange={this.onInputChange}
                  options={this.state.options}
                  id="typeahead"
                  placeholder="Member key"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
            <Button bsStyle="primary" onClick={this.submitFindModal}>Add To Subject</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ShareToMember.propTypes = {
  subject: React.PropTypes.object.isRequired,
  service: React.PropTypes.string.isRequired,
  findMember: React.PropTypes.func.isRequired,
  shareSubjectToMember: React.PropTypes.func,
};

export default ShareToMember;

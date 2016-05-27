import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    let type, subjectKey, memberKey, getOptions;

    if (this.props.subject) {
      type = 'subject';
      subjectKey = props.subject.subjectKey;
      getOptions = props.findMember;
    } else if (this.props.member) {
      type = 'member';
      getOptions = this.props.findSubject;
      memberKey = props.member.memberKey;
    }

    this.state = {
      type,
      getOptions,
      subjectKey,
      memberKey,
      showModal: false,
      options: [],
      modalValue: [],
    };

    this.close = this.close.bind(this);
    this.openFindModal = this.openFindModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitFindModal = this.submitFindModal.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleSelect(modalValue) {
    const value = modalValue[0];
    if (this.state.type === 'subject') {
      this.setState({ modalValue, memberKey: value && value.memberKey });
    } else {
      this.setState({ modalValue, subjectKey: value && value.subjectKey });
    }
  }

  onInputChange(input) {
    const { type, getOptions, subjectKey, memberKey } = this.state;
    const target = type === 'subject' ? subjectKey : memberKey;
    const service = this.props.service;

    getOptions(service, target, input, (err, options) => {
      if (err) {
        console.log('err: ', err);
      } else {
        this.setState({ options });
      }
    });
  }

  openFindModal() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({
      showModal: false,
      modalValue: [],
    });
  }

  isValid() {
    return this.state.memberKey && this.state.subjectKey;
  }

  submitFindModal() {
    const { shareSubjectToMember, service } = this.props;
    shareSubjectToMember(service, this.state.subjectKey, this.state.memberKey);
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
        <Modal show={this.state.showModal} onHide={this.close} className="modal-center-mobile">
          <Modal.Header closeButton>
            <Modal.Title>Share with member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="form-group">
                <label htmlFor="typeahead">Find Subject</label>
                <Typeahead
                  name="typeahead"
                  labelKey="name"
                  onChange={this.handleSelect}
                  onInputChange={this.onInputChange}
                  options={this.state.options}
                  selected={this.state.modalValue}
                  placeholder="Subject key"
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button
              bsStyle="primary"
              onClick={this.submitFindModal}
              disabled={!this.isValid()}
            >
              Share With Member
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ShareModal.propTypes = {
  member: React.PropTypes.object,
  subject: React.PropTypes.object,
  service: React.PropTypes.string,
  findSubject: React.PropTypes.func,
  findMember: React.PropTypes.func,
  shareSubjectToMember: React.PropTypes.func,
};

export default ShareModal;


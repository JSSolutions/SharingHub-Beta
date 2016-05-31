import React from 'react';
import { Button, Modal, Checkbox, Radio, FormGroup } from 'react-bootstrap';
import Typeahead from 'react-bootstrap-typeahead';
import Constants from '../../core/libs/constants';

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    let type;
    let subjectKey;
    let memberKey;
    let getOptions;

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
      permissions: [],
    };

    this.close = this.close.bind(this);
    this.openFindModal = this.openFindModal.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submitFindModal = this.submitFindModal.bind(this);
    this.isValid = this.isValid.bind(this);
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

  handleSelect(modalValue) {
    const value = modalValue[0];
    if (this.state.type === 'subject') {
      this.setState({ modalValue, memberKey: value && value.memberKey });
    } else {
      this.setState({ modalValue, subjectKey: value && value.subjectKey });
    }
  }

  openFindModal() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({
      showModal: false,
      modalValue: [],
      permissions: [],
      options: [],
    });
  }

  isValid() {
    return this.state.memberKey && this.state.subjectKey && this.state.permissions.length >= 1;
  }

  submitFindModal() {
    const { shareSubjectToMember, service } = this.props;
    const { subjectKey, memberKey, permissions } = this.state;
    shareSubjectToMember(service, subjectKey, memberKey, permissions);
    this.close();
  }

  handlePermissionCheck(p) {
    const permissions = this.state.permissions;
    const permissionIndex = permissions.indexOf(p);
    if (permissionIndex === -1) {
      permissions.push(p);
    } else {
      permissions.splice(permissionIndex, 1);
    }
    this.setState({ permissions });
  }

  handlePermissionRadio(p) {
    const permissions = [p];
    this.setState({ permissions });
  }

  renderServicesPermissions(serviceConstants) {
    const permissions = serviceConstants.permissions;
    if (permissions) {
      return (
        <FormGroup>
          <span>Permissions</span>
          {permissions.multi ?
            <div>
              {permissions.list.map((p, i) => (
                <Checkbox
                  key={i}
                  name={p.value}
                  checked={this.state.permissions.indexOf(p.value) !== -1}
                  onChange={() => this.handlePermissionCheck(p.value)}
                >
                  {p.label}
                </Checkbox>
              ))}
            </div>
            :
            <div>
              {permissions.list.map((p, i) => (
                <Radio
                  key={i}
                  name={p.value}
                  checked={this.state.permissions.indexOf(p.value) !== -1}
                  onChange={() => this.handlePermissionRadio(p.value)}
                >
                  {p.label}
                </Radio>
              ))}
            </div>
          }
        </FormGroup>
      );
    }
    return null;
  }

  render() {
    const { service } = this.props;
    const { type } = this.state;
    const serviceConstants = Constants.services[service] || {};
    return (
      <div className="control-button">
        <Button
          className="icon-button"
          onClick={this.openFindModal}
        >
          <i className="fa fa-search-plus" aria-hidden="true"></i>
          {type === 'member' ? 'Find Subject' : 'Find Member'}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close} className="modal-center-mobile">
          <Modal.Header closeButton>
            <Modal.Title>{`Share with ${serviceConstants.title} members`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form ref="shareFrom">
              <div className="form-group">
                <label htmlFor="typeahead">
                  Find by name
                </label>
                <Typeahead
                  name="typeahead"
                  labelKey="name"
                  onChange={this.handleSelect}
                  onInputChange={this.onInputChange}
                  options={this.state.options}
                  selected={this.state.modalValue}
                  placeholder="Find by name"
                />
              </div>
              {this.renderServicesPermissions(serviceConstants)}
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


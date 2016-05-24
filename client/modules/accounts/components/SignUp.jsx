import React from 'react';
import { Col, Well, Button } from 'react-bootstrap';

class SignUp extends React.Component {
  handleLogin(service) {
    this.props.loginWithService(service);
  }

  render() {
    return (
      <div>
        <Col sm={10} md={8} lg={6} smOffset={1} mdOffset={2} lgOffset={3}>
          <Well bsSize="large" className="material-well">
            <h4 className="well-title">Sign Up</h4>
            <div className="sign-up-buttons">
              <Button block onClick={this.handleLogin.bind(this, 'trello')}>Login With Trello</Button>
              <Button block onClick={this.handleLogin.bind(this, 'google')}>Login With Google</Button>
              <Button block onClick={this.handleLogin.bind(this, 'github')}>Login With GitHub</Button>
            </div>
          </Well>
        </Col>
      </div>
    );
  }
}

SignUp.propTypes = {
  loginWithService: React.PropTypes.func.isRequired,
};

export default SignUp;

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';
import { PENDING } from 'constants/Status';

import { Button, TextField } from 'components/base';

class SignUpView extends Component {
  state = {
    email: '',
    password: ''
  };

  handleEmailInputChange = email => this.setState({ email });
  handlePasswordInputChange = password => this.setState({ password });

  SignUp = event => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.actions.signUpCustomer({ email, password });
  };

  render() {
    const { model, customer, customerSigningUp } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (get(customer, 'id', '')) return <Redirect to="/profile" />;

    return (
      <div className="SignUp text-container-width mx-auto p3">
        <h1 className="block-headline">Sign Up</h1>
        <div className="my3">
          <form onSubmit={e => this.SignUp(e)}>
            <TextField
              id="email"
              color="light-gray"
              placeholder="Email"
              onChange={this.handleEmailInputChange}
            />
            <TextField
              id="password"
              color="light-gray"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordInputChange}
            />
            <Button
              disabled={customerSigningUp === PENDING}
              className="mt2"
              type="submit"
              variant="primary"
              color="madison-blue"
              label="Sign Up"
            />
          </form>
        </div>
        <Button
          className="mt2 inline-block"
          to="/sign-in"
          variant="primary"
          color="white-madison-blue-outline"
          label="Already have an account? Sign in &rarr;"
        />
      </div>
    );
  }
}

export default SignUpView;

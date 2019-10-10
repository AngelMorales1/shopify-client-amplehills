import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';
import { PENDING } from 'constants/Status';

import { Button, TextField } from 'components/base';
import ErrorPage from 'components/ErrorPage';

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
    if (model.isError) return <ErrorPage />;

    if (get(customer, 'id')) return <Redirect to="/profile" />;

    return (
      <div className="SignUp text-container-width transition-slide-up mt3 mx-auto p3">
        <h1 className="block-headline">Sign Up</h1>
        <div className="my3">
          <form onSubmit={e => this.SignUp(e)}>
            <TextField
              ariaLabel="Enter your email"
              className="mb2"
              id="email"
              color="light-gray"
              placeholder="Email"
              onChange={this.handleEmailInputChange}
            />
            <TextField
              ariaLabel="Enter a password"
              className="mb2"
              id="password"
              color="light-gray"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordInputChange}
            />
            <Button
              ariaLabel="Sign up"
              disabled={customerSigningUp === PENDING}
              className="mt2"
              type="submit"
              variant="primary"
              color="madison-blue"
              shadow={true}
              label="Sign Up"
            />
          </form>
        </div>
        <Button
          className="mt2 inline-block"
          to="/sign-in"
          variant="primary"
          color="white-madison-blue-border"
          shadow={true}
          label="Already have an account? Sign in &rarr;"
        />
      </div>
    );
  }
}

export default SignUpView;

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';
import { PENDING, REJECTED } from 'constants/Status';

import { Button, TextField, FormFlash } from 'components/base';
import getUrlParam from 'utils/getUrlParam';

class SignInView extends Component {
  state = {
    email: '',
    password: ''
  };

  handleEmailInputChange = email => this.setState({ email });
  handlePasswordInputChange = password => this.setState({ password });

  signIn = event => {
    event.preventDefault();
    const { checkout } = this.props;
    const { email, password } = this.state;
    this.props.actions.signInCustomer({ email, password }, checkout.id);
  };

  render() {
    const { model, customer, customerSigningIn } = this.props;

    if (model.isError) return <h1>Error</h1>;

    if (get(customer, 'id')) return <Redirect to="/profile" />;

    return (
      <div className="SignIn text-container-width transition-slide-up mt3 mx-auto p3">
        <h1 className="block-headline">Sign In</h1>
        {getUrlParam('new-account') === 'true' ? (
          <FormFlash
            message="Almost there! Sign in to your new account below"
            success={true}
          />
        ) : null}
        {customerSigningIn === REJECTED ? (
          <FormFlash
            message="Your email or password was incorrect!"
            error={true}
          />
        ) : null}
        <div className="my3">
          <form onSubmit={e => this.signIn(e)}>
            <TextField
              className="mb2"
              id="email"
              color="light-gray"
              placeholder="Email"
              onChange={this.handleEmailInputChange}
            />
            <TextField
              className="mb2"
              id="password"
              color="light-gray"
              type="password"
              placeholder="Password"
              onChange={this.handlePasswordInputChange}
            />
            <Button
              disabled={customerSigningIn === PENDING}
              className="mt2"
              type="submit"
              variant="primary"
              color="madison-blue"
              shadow={true}
              label="Sign In"
            />
          </form>
        </div>
        <Button
          className="mt2 inline-block"
          to="/sign-up"
          variant="primary"
          color="white-madison-blue-border"
          shadow={true}
          label="Don't have an account? Sign up &rarr;"
        />
      </div>
    );
  }
}

export default SignInView;

import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';

import { Button, TextField } from 'components/base';

class SignInView extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailInputChange = email => this.setState({ email });
  handlePasswordInputChange = password => this.setState({ password });

  signIn = () => this.props.actions.signInCustomer(this.state);

  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (get(customer, 'id', '')) return <Redirect to="/profile" />;

    return (
      <div className="SignIn text-container-width mx-auto p3">
        <h1 className="block-headline">Sign In</h1>
        <div className="my3">
          <form>
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
              className="mt2"
              type="button"
              variant="primary"
              color="madison-blue"
              onClick={this.signIn}
              label="Sign In"
            />
          </form>
        </div>
        <Button
          className="mt2 inline-block"
          to="/sign-up"
          variant="primary"
          color="white-madison-blue-outline"
          label="Don't have an account? Sign up &rarr;"
        />
      </div>
    );
  }
}

export default SignInView;

import React, { Component } from 'react';
import { Button } from 'components/base';

class SignInView extends Component {
  render() {
    const { model, user } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="SignIn">
        <p>Sign In</p>
        <Button to="/sign-up" label="Don't have an account? Sign up &rarr;" />
      </div>
    );
  }
}

export default SignInView;

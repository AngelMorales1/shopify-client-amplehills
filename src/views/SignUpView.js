import React, { Component } from 'react';
import { Button } from 'components/base';

class SignUpView extends Component {
  render() {
    const { model, user } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="SignUp">
        <p>Sign Up</p>
        <Button to="/sign-in" label="Already have an account? Sign in &rarr;" />
      </div>
    );
  }
}

export default SignUpView;

import React, { Component } from 'react';
import { Button } from 'components/base';

class UserForm extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      userIsNew: false
    };
  }

  toggleUserForm = () => {
    const { userIsNew } = this.state;
    this.setState({ userIsNew: !userIsNew });
  };

  renderSignUp() {
    return <div>Sign Up</div>;
  }

  renderSignIn() {
    return <div>Sign In</div>;
  }

  render() {
    const { userIsNew } = this.state;
    return (
      <div className="p3">
        {userIsNew ? this.renderSignUp() : this.renderSignIn()}
        <Button
          className="mt2"
          onClick={this.toggleUserForm}
          variant="primary-small"
          color="madison-blue"
          label={
            userIsNew
              ? 'Already have an account? Sign in \u2192'
              : "Don't have an account? Sign up \u2192"
          }
        />
      </div>
    );
  }
}

export default UserForm;

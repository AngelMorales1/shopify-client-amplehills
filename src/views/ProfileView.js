import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';

class ProfileView extends Component {
  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (!get(customer, 'id', 0)) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <p>Welcome to the profile!</p>
      </div>
    );
  }
}

export default ProfileView;

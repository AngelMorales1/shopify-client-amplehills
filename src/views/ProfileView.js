import React, { Component } from 'react';
import { Redirect } from 'react-router';

class ProfileView extends Component {
  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (!customer.id) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <p>
          Welcome {customer.firstName} {customer.lastName}!
        </p>
      </div>
    );
  }
}

export default ProfileView;

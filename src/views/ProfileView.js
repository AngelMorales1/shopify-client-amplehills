import React, { Component } from 'react';
import { Redirect } from 'react-router';
import get from 'utils/get';

import Profile from 'components/Profile';
import UserForm from 'components/UserForm';

class ProfileView extends Component {
  render() {
    const { model, user } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (!get(user, 'id', 0)) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <p>Welcome to the profile!</p>
        {get(user, 'id', 0) ? <Profile /> : <UserForm />}
      </div>
    );
  }
}

export default ProfileView;

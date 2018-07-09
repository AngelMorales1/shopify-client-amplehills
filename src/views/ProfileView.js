import React, { Component } from 'react';
import get from 'utils/get';

import Profile from 'components/Profile';
import UserForm from 'components/UserForm';

class ProfileView extends Component {
  render() {
    const { model, user } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="Profile">
        <p>Welcome to the profile!</p>
        {get(user, 'id', '') ? <Profile /> : <UserForm />}
      </div>
    );
  }
}

export default ProfileView;

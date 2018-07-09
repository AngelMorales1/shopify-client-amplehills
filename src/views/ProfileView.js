import React, { Component } from 'react';

class ProfileView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="Profile">Welcome to the profile!</div>;
  }
}

export default ProfileView;

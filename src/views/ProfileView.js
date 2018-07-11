import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'components/base';

class ProfileView extends Component {
  signOut = () => {
    const { actions } = this.props;
    actions.signOutCustomer();
  };

  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    if (!customer.id) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <p>
          Welcome {customer.firstName} {customer.lastName}!
          <div className="my2">
            <Button
              variant="primary-small"
              color="peach"
              label="Sign Out"
              onClick={this.signOut}
            />
          </div>
        </p>
      </div>
    );
  }
}

export default ProfileView;

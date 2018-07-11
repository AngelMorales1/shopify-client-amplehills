import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'components/base';

class ProfileView extends Component {
  signOut = () => {
    const { actions, checkout } = this.props;
    actions.signOutCustomer();
    actions.checkoutCustomerDisassociate(checkout.id);
  };

  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const { id, firstName, lastName } = customer;
    if (!id) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <div className="bg-iceberg drip">
          <div className="container-width mx-auto pt4 px2 center">
            <p className="block-headline">
              {firstName && lastName ? `${firstName} ${lastName}` : 'Profile'}
            </p>
            <div className="my3">
              <Button
                className="small"
                variant="primary-small"
                color="peach"
                label="Sign Out"
                onClick={this.signOut}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;

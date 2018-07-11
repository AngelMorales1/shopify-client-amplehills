import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'components/base';

import get from 'utils/get';

class ProfileView extends Component {
  signOut = () => {
    const { actions, checkout } = this.props;
    actions.signOutCustomer();
    actions.checkoutCustomerDisassociate(checkout.id);
  };

  render() {
    const { model, customer } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const { id, firstName, lastName, email, phone, addresses } = customer;
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
        <div className="container-width mx-auto my3 px3">
          <div className="flex flex-wrap">
            <div className="col col-12 md-col-6">
              <div className="col col-12 md-col-9">
                <div className="my3">
                  <h2 className="carter sub-title mb3">Personal Info</h2>
                  <div className="card card--light-gray-border p3 my2">
                    <div className="relative">
                      <strong className="bold block mb2">Email Address</strong>
                      <p>{email}</p>

                      <Button
                        variant="no-style"
                        label="Edit"
                        className="text-peach absolute t0 r0"
                      />
                    </div>
                  </div>
                  {phone ? (
                    <div className="card card--light-gray-border p3 my2">
                      <div className="relative">
                        <strong className="bold block mb2">Phone Number</strong>
                        <p>{phone}</p>

                        <Button
                          variant="no-style"
                          label="Edit"
                          className="text-peach absolute t0 r0"
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="card card--light-gray-border p3 my2">
                    <div className="relative">
                      <strong className="bold block mb2">Password</strong>
                      <p>• • • • • • • • • •</p>

                      <Button
                        variant="no-style"
                        label="Edit"
                        className="text-peach absolute t0 r0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col col-12 md-col-6">
              <div className="w100">
                <div className="my2">
                  <h2 className="carter sub-title">Order History</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;

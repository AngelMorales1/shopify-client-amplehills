import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'components/base';
import ProfileInfo from 'components/ProfileInfo';
import ProfileOrders from 'components/ProfileOrders';
import ErrorPage from 'components/ErrorPage';

class ProfileView extends Component {
  signOut = () => {
    const { actions, checkout } = this.props;
    actions.signOutCustomer();
    actions.checkoutCustomerDisassociate(checkout.id);
  };

  render() {
    const {
      model,
      customer,
      checkout,
      actions,
      customerFieldBeingEdited,
      successfullyEditedFields,
      errors,
      products
    } = this.props;
    if (model.isError) return <ErrorPage />;

    const { id, firstName, lastName } = customer;
    if (!id) return <Redirect to="/sign-in" />;

    return (
      <div className="Profile">
        <div className="bg-sky-blue drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline">
              {firstName && lastName ? `${firstName} ${lastName}` : 'Profile'}
            </p>
            <div className="my3 flex justify-center">
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
        <div className="container-width transition-slide-up mx-auto my3 px3">
          <div className="flex flex-wrap">
            <div className="col col-12 md-col-6">
              <div className="col col-12 md-col-9">
                <ProfileInfo
                  actions={actions}
                  errors={errors}
                  successfullyEditedFields={successfullyEditedFields}
                  customerFieldBeingEdited={customerFieldBeingEdited}
                  {...customer}
                />
              </div>
            </div>
            <div className="col col-12 md-col-6">
              <div className="w100">
                <ProfileOrders
                  actions={actions}
                  products={products}
                  checkout={checkout}
                  orders={customer.orders}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileView;

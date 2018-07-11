import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, TextField } from 'components/base';
import get from 'utils/get';

class ProfileInfo extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      email: props.email,
      phone: props.phone
    };
  }

  render() {
    console.log(this.props);
    const { email, phone, actions, customerFieldsBeingEdited } = this.props;
    const customerFieldBeingEdited = customerFieldsBeingEdited.length
      ? customerFieldsBeingEdited[0]
      : null;

    return (
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
              onClick={() =>
                actions.editCustomerField({
                  id: 'email',
                  label: 'email address',
                  onChange: () => {}
                })
              }
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
                onClick={() =>
                  actions.editCustomerField({
                    id: 'phone',
                    label: 'phone number',
                    onChange: () => {}
                  })
                }
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
              onClick={() =>
                actions.editCustomerField({
                  id: 'password',
                  label: 'password',
                  onChange: () => {}
                })
              }
            />
          </div>
        </div>
        {customerFieldsBeingEdited.length ? (
          <Modal>
            <span className="sub-title">
              Edit {customerFieldBeingEdited.label}
            </span>
            <form>
              <TextField
                value={get(this.state, 'customerFieldBeingEdited.id', '')}
                onChange={customerFieldBeingEdited.onChange}
                color="light-gray"
              />
              <div className="flex mt4 justify-end">
                <Button
                  color="peach"
                  label="Cancel"
                  onClick={actions.cancelEditCustomerFields}
                />
                <Button
                  color="madison-blue"
                  label="Save"
                  onClick={actions.submitCustomerFields}
                />
              </div>
            </form>
          </Modal>
        ) : null}
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  email: PropTypes.string,
  phone: PropTypes.string,
  actions: PropTypes.shape({
    editCustomerEmail: PropTypes.func,
    editCustomerPhone: PropTypes.func,
    editCustomerPassword: PropTypes.func
  }),
  customerFieldsBeingEdited: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onChange: PropTypes.func
    })
  )
};

ProfileInfo.defaultProps = {
  email: '',
  phone: '',
  actions: {
    editCustomerEmail: () => {},
    editCustomerPhone: () => {},
    editCustomerPassword: () => {}
  },
  customerFieldsBeingEdited: []
};

export default ProfileInfo;

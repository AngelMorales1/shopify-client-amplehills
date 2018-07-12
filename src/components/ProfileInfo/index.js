import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, TextField, FormFlash } from 'components/base';
import get from 'utils/get';

class ProfileInfo extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      email: props.email,
      phone: props.phone
    };
  }

  handleCustomerUpdate = (customerAccessToken, customer) => {
    // TODO: Validation
    this.props.actions.updateCustomer(customerAccessToken, customer);
  };

  handleCustomerFieldChange = (id, value) => {
    this.setState({ [id]: value });
  };

  renderSuccessMessage(successfullyEditedFields) {
    if (!successfullyEditedFields.length) return null;

    const field = Object.keys(successfullyEditedFields[0])[0];
    const value = Object.values(successfullyEditedFields[0])[0];
    const message =
      field === 'password'
        ? 'Your password has been updated!'
        : `Your ${field} has been updated to: ${value}`;

    return <FormFlash success={true} message={message} />;
  }

  render() {
    const {
      email,
      phone,
      actions,
      accessToken,
      customerFieldsBeingEdited,
      successfullyEditedFields,
      errors
    } = this.props;

    const customerFieldBeingEdited = customerFieldsBeingEdited.length
      ? customerFieldsBeingEdited[0]
      : null;

    return (
      <div className="my3">
        <h2 className="carter sub-title mb3">Personal Info</h2>

        {this.renderSuccessMessage(successfullyEditedFields)}
        {errors ? (
          <FormFlash error={true} message={`Unexpected Error: ${errors}`} />
        ) : null}
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
                  placeholder: 'eat@amplehills.com',
                  onSave: () =>
                    this.handleCustomerUpdate(accessToken, {
                      email: this.state.email
                    })
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
                    placeholder: '5556667890',
                    onSave: () =>
                      this.handleCustomerUpdate(accessToken, {
                        phone: this.state.phone
                      })
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
                  placeholder: '• • • • • • • • • •',
                  onSave: () => {
                    this.setState({ error: '' });
                    if (this.state.password !== this.state.confirmPassword)
                      return this.setState({
                        error: 'Your passwords do not match!'
                      });

                    this.handleCustomerUpdate(accessToken, {
                      password: this.state.password
                    });
                  }
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
            {this.state.error ? (
              <FormFlash error={true} message={this.state.error} />
            ) : null}
            <form>
              <div className="mt3 mb4">
                <TextField
                  value={get(this.state, customerFieldBeingEdited.id, '')}
                  onChange={value =>
                    this.handleCustomerFieldChange(
                      customerFieldBeingEdited.id,
                      value
                    )
                  }
                  color="light-gray"
                  className="my3"
                  type={
                    customerFieldBeingEdited.id === 'password'
                      ? 'password'
                      : 'text'
                  }
                  label={
                    customerFieldBeingEdited.id === 'password' ? 'Password' : ''
                  }
                  placeholder={customerFieldBeingEdited.placeholder}
                />
                {customerFieldBeingEdited.id === 'password' ? (
                  <TextField
                    value={get(this.state, 'confirmPassword', '')}
                    onChange={value =>
                      this.handleCustomerFieldChange('confirmPassword', value)
                    }
                    color="light-gray"
                    className="my3"
                    type="password"
                    label="Confirm Password"
                    placeholder={customerFieldBeingEdited.placeholder}
                  />
                ) : null}
              </div>
              <div className="flex justify-end">
                <Button
                  color="peach"
                  label="Cancel"
                  onClick={actions.cancelEditCustomerFields}
                  className="mr2"
                />
                <Button
                  color="madison-blue"
                  label="Save"
                  onClick={customerFieldBeingEdited.onSave}
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

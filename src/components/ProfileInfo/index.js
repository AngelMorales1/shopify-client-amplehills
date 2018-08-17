import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Button, Modal, TextField, FormFlash } from 'components/base';
import UpdateCustomerForm from 'constants/forms/UpdateCustomer';
import get from 'utils/get';

import styles from './ProfileInfo.scss';

class ProfileInfo extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      error: null,
      email: props.email,
      phone: props.phone
    };
  }

  handleCustomerUpdate = field => {
    const { accessToken } = this.props;
    const { email, phone, password } = this.state;
    switch (field) {
      case UpdateCustomerForm.EMAIL.id:
        return this.props.actions.updateCustomer(accessToken, { email });
      case UpdateCustomerForm.PHONE.id:
        return this.props.actions.updateCustomer(accessToken, { phone });
      case UpdateCustomerForm.PASSWORD.id:
        this.setState({ error: '' });
        if (this.state.password !== this.state.confirmPassword)
          return this.setState({
            error: 'Your passwords do not match!'
          });

        return this.props.actions.updateCustomer(accessToken, { password });
      default:
        return null;
    }
  };

  handleCustomerFieldChange = (id, value) => {
    this.setState({ [id]: value });
  };

  renderSuccessMessage(successfullyEditedFields = []) {
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
      customerFieldBeingEdited,
      successfullyEditedFields,
      errors
    } = this.props;
    const editModal = customerFieldBeingEdited
      ? Object.values(UpdateCustomerForm).find(
          field => field.id === customerFieldBeingEdited
        )
      : null;

    return (
      <div className="my3">
        <h2 className="carter sub-title mb3">Personal Info</h2>

        {this.renderSuccessMessage(successfullyEditedFields)}
        {errors ? (
          <FormFlash error={true} message={`Unexpected Error: ${errors}`} />
        ) : null}
        <div className="card card--light-gray-border p3 my2">
          <div className="flex flex-column">
            <div className="w100 flex flex-row justify-between">
              <strong className="bold block mb2">Email Address</strong>
              <Button
                variant="style-none"
                label="Edit"
                className="text-peach"
                hover={'underline-peach'}
                onClick={() =>
                  actions.activateEditCustomerField(UpdateCustomerForm.EMAIL.id)
                }
              />
            </div>
            <p className="wrap">{email}</p>
          </div>
        </div>
        {phone ? (
          <div className="card card--light-gray-border p3 my2">
            <div className="flex flex-column">
              <div className="w100 flex flex-row justify-between">
                <strong className="bold block mb2">Phone Number</strong>
                <Button
                  variant="style-none"
                  label="Edit"
                  className="text-peach"
                  hover={'underline-peach'}
                  onClick={() =>
                    actions.activateEditCustomerField(
                      UpdateCustomerForm.PHONE.id
                    )
                  }
                />
              </div>
              <p>{phone}</p>
            </div>
          </div>
        ) : null}
        <div className="card card--light-gray-border p3 my2">
          <div className="flex flex-column">
            <div className="w100 flex flex-row justify-between">
              <strong className="bold block mb2">Password</strong>
              <Button
                variant="style-none"
                label="Edit"
                className="text-peach"
                hover={'underline-peach'}
                onClick={() =>
                  actions.activateEditCustomerField(
                    UpdateCustomerForm.PASSWORD.id
                  )
                }
              />
            </div>
            <p>• • • • • • • • • •</p>
          </div>
        </div>
        {editModal ? (
          <Modal>
            <span className="sub-title">Edit {editModal.label}</span>
            {this.state.error ? (
              <FormFlash error={true} message={this.state.error} />
            ) : null}
            <form>
              <div className="mt3 mb4">
                <TextField
                  value={get(this.state, editModal.id, '')}
                  onChange={value =>
                    this.handleCustomerFieldChange(editModal.id, value)
                  }
                  color="light-gray"
                  className="my3"
                  type={editModal.id === 'password' ? 'password' : 'text'}
                  label={editModal.id === 'password' ? 'Password' : ''}
                  placeholder={editModal.placeholder}
                />
                {editModal.id === 'password' ? (
                  <TextField
                    value={get(this.state, 'confirmPassword', '')}
                    onChange={value =>
                      this.handleCustomerFieldChange('confirmPassword', value)
                    }
                    color="light-gray"
                    className="my3"
                    type="password"
                    label="Confirm Password"
                    placeholder={editModal.placeholder}
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
                  onClick={() =>
                    this.handleCustomerUpdate(customerFieldBeingEdited)
                  }
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
  customerFieldBeingEdited: PropTypes.arrayOf(PropTypes.object)
};

ProfileInfo.defaultProps = {
  email: '',
  phone: '',
  actions: {
    editCustomerEmail: () => {},
    editCustomerPhone: () => {},
    editCustomerPassword: () => {}
  },
  customerFieldBeingEdited: [{}]
};

export default ProfileInfo;

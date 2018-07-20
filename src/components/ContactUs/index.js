import React, { Component } from 'react';
import isValidEmailAddress from 'utils/isValidEmailAddress';
import ContactUsForm from 'constants/forms/ContactUs';
import { Dropdown, Radio, TextField, Button, FormFlash } from 'components/base';

import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  state = {
    selectedAddress: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  handleChangeAddress = selectedAddress => {
    this.setState({ selectedAddress });
  };

  formHasErrors = () => {
    const { selectedAddress, name, email, message } = this.state;

    if (!selectedAddress) {
      const error = 'Please select the reason why you are contacting us.';
      this.setState({ error });
      return true;
    }

    if (!name) {
      const error = 'Please enter your full name.';
      this.setState({ error });
      return true;
    }

    if (!email || !isValidEmailAddress(email)) {
      const error = 'Please enter a valid email address.';
      this.setState({ error });
      return true;
    }

    if (!message) {
      const error = 'Please write a message.';
      this.setState({ error });
      return true;
    }

    return false;
  };

  submitContactForm = () => {
    if (this.formHasErrors()) return null;

    console.log('sent');
  };

  render() {
    const { error, selectedAddress } = this.state;

    return (
      <div
        className={cx(
          styles['ContactUs'],
          'flex flex-column justify-around items-center'
        )}
      >
        <h2 className="block-headline my2 px2 center">Contact us</h2>
        <p className="my2 px2 center">What can we help you with?</p>
        <form className="flex flex-wrap justify-center text-container-width">
          <div className="flex flex-wrap justify-center px2 my2">
            {Object.values(ContactUsForm.ADDRESSES).map(field => (
              <Radio
                checked={selectedAddress === field.email}
                onClick={() => this.setState({ selectedAddress: field.email })}
                className="mx2 my1 small"
                label={field.label}
              />
            ))}
          </div>
          {Object.values(ContactUsForm.FIELDS).map(field => {
            <TextField
              className="m1"
              variant="light-gray"
              type={field.type}
              onChange={value => this.setState({ [field.id]: value })}
              placeholder={field.label}
            />;
          })}
          <div className="w100 flex flex-column">
            {Object.values(ContactUsForm.FIELDS).map(field => (
              <TextField
                className="m1"
                variant="light-gray"
                type={field.type}
                value={this.state[field.id]}
                onChange={value => this.setState({ [field.id]: value })}
                placeholder={field.label}
              />
            ))}
          </div>
          <div
            className={cx(
              styles['ContactUs__button-container'],
              'w100 flex flex-wrap text-container-width my2 px1'
            )}
          >
            {error ? (
              <FormFlash className="w100 mb2" error={true} message={error} />
            ) : null}
            <Button
              label="Send Us a Message"
              color="madison-blue"
              className="my1"
              onClick={() => this.submitContactForm()}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;

import React, { Component } from 'react';
import isValidEmailAddress from 'utils/isValidEmailAddress';
import ContactUsForm from 'constants/forms/ContactUs';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';
import { Radio, TextField, Button, FormFlash } from 'components/base';

import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.formStatus === PENDING && this.props.formStatus === FULFILLED)
      this.setState({
        selectedAddress: '',
        name: '',
        email: '',
        phone: '',
        message: ''
      });
  }

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

    const { selectedAddress, name, email, phone, message } = this.state;

    this.setState({ error: '' });
    this.props.actions.sendContactForm({
      selectedAddress,
      name,
      email,
      phone,
      message
    });
  };

  render() {
    const { error, selectedAddress } = this.state;
    const { formStatus } = this.props;

    return (
      <div
        className={cx(
          styles['ContactUs'],
          'transition-slide-up flex flex-column justify-around items-center'
        )}
      >
        <h2 className="block-headline my2 px2 center">Contact us</h2>
        <p className="my2 px2 center">What can we help you with?</p>
        <form className="flex flex-wrap justify-center text-container-width">
          <div className="flex flex-wrap justify-center px2 my2">
            {Object.values(ContactUsForm.ADDRESSES).map(field => (
              <Radio
                key={field.label}
                checked={selectedAddress === field.bucket}
                onClick={() => this.setState({ selectedAddress: field.bucket })}
                className="mx2 my1 small"
                label={field.label}
              />
            ))}
          </div>
          <div className="w100 flex flex-column">
            {Object.values(ContactUsForm.FIELDS).map(field => (
              <TextField
                key={field.label}
                className={cx(styles['ContactUs__text-field'], 'm1')}
                variant={
                  field.type === 'textarea' ? 'light-gray-tall' : 'light-gray'
                }
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
            {error || formStatus === REJECTED ? (
              <FormFlash
                className="w100 mb2"
                error={true}
                message={
                  error
                    ? error
                    : 'There was an unexpected problem while submitting your message. Please reach out directly to info@amplehills.com'
                }
              />
            ) : null}
            {formStatus === FULFILLED ? (
              <FormFlash
                className="w100 mb2"
                success={true}
                message="Your message has been sent!"
              />
            ) : null}
            <Button
              disabled={formStatus === PENDING}
              label="Send Us a Message"
              color="madison-blue"
              className="my1"
              onClick={this.submitContactForm}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;

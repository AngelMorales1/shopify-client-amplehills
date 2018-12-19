import React, { Component } from 'react';
import isValidEmailAddress from 'utils/isValidEmailAddress';
import ContactUsForm from 'constants/forms/ContactUs';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';
import { Radio, TextField, Button, FormFlash, Dropdown } from 'components/base';

import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  state = {
    selectedAddress: '',
    selectedField: null,
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  componentDidMount() {
    const { param } = this.props;

    switch (param) {
      case 'general-info':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.GENERAL.bucket,
          selectedField: 'GENERAL'
        });
      case 'orders':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.ORDERS.bucket,
          selectedField: 'ORDERS'
        });
      case 'off-site-events':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.EVENTS.bucket,
          selectedField: 'EVENTS'
        });
      case 'press':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.PRESS.bucket,
          selectedField: 'PRESS'
        });
      case 'parties':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.PARTIES.bucket,
          selectedField: 'PARTIES'
        });
      case 'jobs':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.JOBS.bucket,
          selectedField: 'JOBS'
        });
      case 'wholesale':
        return this.setState({
          selectedAddress: ContactUsForm.ADDRESSES.WHOLESALE.bucket,
          selectedField: 'WHOLESALE'
        });
      default:
        return null;
    }
  }

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
    const { error, selectedAddress, selectedField } = this.state;
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
          <div className="w100 flex flex-wrap justify-center px2 my2">
            <Dropdown
              fixedWidth={true}
              className="w100"
              selectClassName="w100"
              variant="secondary"
              placeholder="Choose your inquiry"
              value={selectedField ? selectedField : null}
              options={Object.keys(ContactUsForm.ADDRESSES).map(field => {
                const label = ContactUsForm.ADDRESSES[field].label;

                return { label: label, value: field };
              })}
              onChange={filter =>
                this.setState({
                  selectedAddress: ContactUsForm.ADDRESSES[filter.value],
                  selectedField: filter.value
                })
              }
            />
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

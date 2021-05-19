import React, { Component } from 'react';
import isValidEmailAddress from 'utils/isValidEmailAddress';
import ContactUsForm from 'constants/forms/ContactUs';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';
import { TextField, Button, FormFlash, Dropdown } from 'components/base';

import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    title: '',
    selected: null
  };

  componentDidMount() {
    const { param } = this.props;

    switch (param) {
      case 'general-info':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.GENERAL
        });
      case 'orders':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.ORDERS
        });
      case 'off-site-events':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.EVENTS
        });
      case 'press':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.PRESS
        });
      case 'parties':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.PARTIES
        });
      case 'comments-concerns':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.CONCERNS
        });
      case 'jobs':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.JOBS
        });
      case 'wholesale':
        return this.setState({
          selected: ContactUsForm.ADDRESSES.WHOLESALE
        });
      default:
        return null;
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formStatus === PENDING && this.props.formStatus === FULFILLED)
      this.setState({
        selected: null,
        name: '',
        email: '',
        phone: '',
        message: '',
        title: ''
      });
  }

  formHasErrors = () => {
    const { selected, name, email, message, title } = this.state;

    if (!selected) {
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

    if (!title) {
      const error = 'Please provide a title.';
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

    const { selected, name, email, phone, message, title } = this.state;

    this.setState({ error: '' });

    this.props.actions.sendContactForm({
      category: selected.happyFoxCategory,
      name,
      email,
      phone,
      text: message,
      subject: title
    });
  };

  render() {
    const { error, selected } = this.state;
    const { formStatus } = this.props;
    const { ADDRESSES } = ContactUsForm;

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
          <div className="w100 flex flex-wrap justify-center px1 my1">
            <Dropdown
              fixedWidth={true}
              className="w100"
              variant="primary-new"
              placeholder="Pick a subject"
              value={
                selected
                  ? ADDRESSES[
                      Object.keys(ADDRESSES).find(
                        key => ADDRESSES[key].label === selected.label
                      )
                    ]
                  : null
              }
              options={Object.keys(ADDRESSES).map(field => {
                return { label: ADDRESSES[field].label, value: field };
              })}
              onChange={filter =>
                this.setState({
                  selected: ADDRESSES[filter.value]
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

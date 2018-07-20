import React, { Component } from 'react';
import ContactUsForm from 'constants/forms/ContactUs';
import { Dropdown, Radio, TextField, Button } from 'components/base';

import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  state = {
    selectedAddress: ''
  };

  handleChangeAddress = selectedAddress => {
    this.setState({ selectedAddress });
  };

  render() {
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
            {Object.values(ContactUsForm).map(field => (
              <Radio
                checked={this.state.selectedAddress === field.email}
                onClick={() => this.setState({ selectedAddress: field.email })}
                className="mx2 my1 small"
                label={field.label}
              />
            ))}
          </div>
          <div className="w100 flex flex-column">
            <TextField
              className="m1"
              variant="light-gray"
              type="text"
              placeholder="Name"
            />
            <TextField
              className="m1"
              variant="light-gray"
              type="email"
              placeholder="Email Address"
            />
            <TextField
              className="m1"
              variant="light-gray"
              type="tel"
              placeholder="Phone Number"
            />
            <TextField
              className="m1"
              variant="light-gray-tall"
              placeholder="Message"
              multiLine={true}
            />
          </div>
          <div
            className={cx(
              styles['ContactUs__button-container'],
              'w100 flex text-container-width'
            )}
          >
            <Button
              label="Send Us a Message"
              color="madison-blue"
              className="m1"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ContactUs;

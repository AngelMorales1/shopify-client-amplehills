import React, { Component } from 'react';
import { Radio, TextField, Button } from 'components/base';
import cx from 'classnames';
import styles from './ContactUs.scss';

class ContactUs extends Component {
  constructor() {
    super();

    this.state = {
      checkedRadioField: ''
    };
  }

  checkRadioButton = field => {
    this.setState({ checkedRadioField: field });
  };

  render() {
    return (
      <div className="flex flex-column justify-around items-center p4">
        <h2 className="title bold m3">Contact us</h2>
        <p className="m3">What can we help you with?</p>
        <div className="flex m3">
          <Radio
            check={this.state.checkedRadioField === 'ordering'}
            onClick={() => this.checkRadioButton('ordering')}
            className="mx3"
            label="Ordering"
          />
          <Radio
            check={this.state.checkedRadioField === 'shipping'}
            onClick={() => this.checkRadioButton('shipping')}
            className="mx3"
            label="Shipping"
          />
          <Radio
            check={this.state.checkedRadioField === 'other'}
            onClick={() => this.checkRadioButton('other')}
            className="mx3"
            label="Other"
          />
        </div>
        <div
          className={cx(
            'flex flex-column m3',
            styles['ContactUs__input-fields']
          )}
        >
          <TextField
            className="m1"
            variant="pampas"
            type="text"
            placeholder="Name"
          />
          <TextField
            className="m1"
            variant="pampas"
            type="email"
            placeholder="Email Address"
          />
          <TextField
            className="m1"
            variant="pampas"
            type="tel"
            placeholder="Phone Number"
          />
          <TextField
            className="m1"
            variant="pampas-tall"
            placeholder="Message"
            multiLine={true}
          />
        </div>
        <Button label="Send Us a Message" color="madison-blue" />
      </div>
    );
  }
}

export default ContactUs;

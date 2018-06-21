import React, { Component } from 'react';
import { Radio, TextField, Button } from 'components/base';
import cx from 'classnames';

class ContactUs extends Component {
  constructor() {
    super();

    this.state = {
      radioIsChecked: false
    };
  }
  render() {
    return (
      <div className="flex flex-column justify-around items-center">
        <h2 className="title bold">Contact us</h2>
        <p>What can we help you with?</p>
        <div className="flex">
          <Radio className="mx2" label="Ordering" />
          <Radio className="mx2" label="Shipping" />
          <Radio className="mx2" label="Other" />
        </div>
        <div className="flex flex-column">
          <TextField color="pampas" placeholder="Name" />
          <TextField color="pampas" placeholder="Email Address" />
          <TextField color="pampas" placeholder="Phone Number" />
          <TextField color="pampas" placeholder="Message" />
        </div>
        <Button label="Send Us a Message" color="madison-blue" />
      </div>
    );
  }
}

export default ContactUs;

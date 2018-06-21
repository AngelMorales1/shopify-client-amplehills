import React, { Component } from 'react';
import { Radio, TextField, Button } from 'components/base';
import cx from 'classnames';

class ContactUs extends Component {
  constructor() {
    super();

    this.state = {
      checkedRadio: ''
    };
  }

  handleRadioClick = field => {
    this.setState({ checkedRadio: field });
  };

  render() {
    return (
      <div className="flex flex-column justify-around items-center">
        <h2 className="title bold">Contact us</h2>
        <p>What can we help you with?</p>
        <div className="flex">
          <Radio
            check={this.state.checkedRadio === 'ordering'}
            onClick={() => this.handleRadioClick('ordering')}
            className="mx2"
            label="Ordering"
          />
          <Radio
            check={this.state.checkedRadio === 'shipping'}
            onClick={() => this.handleRadioClick('shipping')}
            className="mx2"
            label="Shipping"
          />
          <Radio
            check={this.state.checkedRadio === 'other'}
            onClick={() => this.handleRadioClick('other')}
            className="mx2"
            label="Other"
          />
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

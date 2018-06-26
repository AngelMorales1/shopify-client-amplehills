import React, { Component } from 'react';
import { Radio, TextField, Button } from 'components/base';

class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedRadioField: ''
    };
  }

  handleRadioClick = field => {
    this.setState({ checkedRadioField: field });
  };

  render() {
    return (
      <div className="flex flex-column justify-around items-center p4">
        <h2 className="block-headline m2">Contact us</h2>
        <p className="m2">What can we help you with?</p>
        <form className="flex m3">
          <Radio
            checked={this.state.checkedRadioField === 'ordering'}
            onClick={() => this.handleRadioClick('ordering')}
            className="mx3"
            label="Ordering"
          />
          <Radio
            checked={this.state.checkedRadioField === 'shipping'}
            onClick={() => this.handleRadioClick('shipping')}
            className="mx3"
            label="Shipping"
          />
          <Radio
            checked={this.state.checkedRadioField === 'other'}
            onClick={() => this.handleRadioClick('other')}
            className="mx3"
            label="Other"
          />
        </form>
        <div className="flex flex-column m3 wh100 text-container-width">
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
        <Button label="Send Us a Message" color="madison-blue" />
      </div>
    );
  }
}

export default ContactUs;

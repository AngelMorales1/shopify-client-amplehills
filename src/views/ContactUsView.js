import React, { Component } from 'react';
import ContactUs from 'components/ContactUs';

class ContactUsView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <ContactUs {...this.props} />;
  }
}

export default ContactUsView;

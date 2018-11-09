import React, { Component } from 'react';
import ContactUs from 'components/ContactUs';
import getUrlParam from 'utils/getUrlParam';

class ContactUsView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const param = getUrlParam('contact');

    return <ContactUs param={param} {...this.props} />;
  }
}

export default ContactUsView;

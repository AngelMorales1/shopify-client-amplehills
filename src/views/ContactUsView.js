import React, { Component } from 'react';
import ContactUs from 'components/ContactUs';
import ErrorPage from 'components/ErrorPage';
import getUrlParam from 'utils/getUrlParam';

class ContactUsView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <ErrorPage />;

    const param = getUrlParam('contact');

    return <ContactUs param={param} {...this.props} />;
  }
}

export default ContactUsView;

import React, { Component } from 'react';
import InStores from 'components/InStores';
import ErrorPage from 'components/ErrorPage';

class InStoresView extends Component {
  render() {
    const { model, localRetailers, text } = this.props;
    if (model.isError) return <ErrorPage />;

    return <InStores localRetailers={localRetailers} text={text} />;
  }
}

export default InStoresView;

import React, { Component } from 'react';
import InStores from 'components/InStores';

class InStoresView extends Component {
  render() {
    const { model, localRetailers, text } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <InStores localRetailers={localRetailers} text={text} />;
  }
}

export default InStoresView;

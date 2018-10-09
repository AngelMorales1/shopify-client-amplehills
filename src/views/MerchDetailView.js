import React, { Component } from 'react';
import MerchDetails from 'components/MerchDetails';

class MerchDetailView extends Component {
  render() {
    const { model, merch, actions, checkout } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <MerchDetails merch={merch} actions={actions} checkout={checkout} />;
  }
}

export default MerchDetailView;

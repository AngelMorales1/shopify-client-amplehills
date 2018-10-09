import React, { Component } from 'react';
import MerchDetails from 'components/MerchDetails';

class MerchDetailView extends Component {
  render() {
    const { model, merchByHandle } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <MerchDetails merch={merchByHandle} />;
  }
}

export default MerchDetailView;

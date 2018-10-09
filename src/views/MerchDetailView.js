import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import MerchDetails from 'components/MerchDetails';

class MerchDetailView extends Component {
  render() {
    const { model, merch } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <MerchDetails merch={merch} />;
  }
}

export default MerchDetailView;

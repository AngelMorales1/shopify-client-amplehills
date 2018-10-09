import React, { Component, Fragment } from 'react';
import get from 'utils/get';

class MerchDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="MerchDetailView" />;
  }
}

export default MerchDetailView;

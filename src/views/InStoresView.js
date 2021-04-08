import React, { Component } from 'react';
import InStores from 'components/InStores';
import ErrorPage from 'components/ErrorPage';

class InStoresView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <ErrorPage />;

    console.log('MODEL;', model);

    return (
      <InStores
        retailLocations={model.retailLocations}
        content={model.content}
      />
    );
  }
}

export default InStoresView;

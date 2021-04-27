import React, { Component } from 'react';
import InStores from 'components/InStores';
import ErrorPage from 'components/ErrorPage';

class InStoresView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <ErrorPage />;

    return (
      <InStores
        getSearchResultStatus={this.props.getSearchResultStatus}
        klaviyoListSignupStatus={this.props.klaviyoListSignupStatus}
        searchResult={this.props.searchResult}
        actions={this.props.actions}
        retailLocations={model.retailLocations}
        content={model.content}
      />
    );
  }
}

export default InStoresView;

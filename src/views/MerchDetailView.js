import React, { Component, Fragment } from 'react';
import MerchDetails from 'components/MerchDetails';

class MerchDetailView extends Component {
  render() {
    const { model, merch, actions, checkout, cardsBlock } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <Fragment>
        <MerchDetails merch={merch} actions={actions} checkout={checkout} />
      </Fragment>
    );
  }
}

export default MerchDetailView;

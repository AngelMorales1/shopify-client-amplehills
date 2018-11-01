import React, { Component, Fragment } from 'react';
import MerchDetails from 'components/MerchDetails';
import CardsBlock from 'components/CardsBlock';

class MerchDetailView extends Component {
  render() {
    const { model, merch, actions, checkout, cardsBlock } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const cardsBlockHasData = Object.values(cardsBlock).length;

    return (
      <Fragment>
        <MerchDetails merch={merch} actions={actions} checkout={checkout} />
        {cardsBlockHasData ? <CardsBlock cardsBlock={cardsBlock} /> : null}
      </Fragment>
    );
  }
}

export default MerchDetailView;

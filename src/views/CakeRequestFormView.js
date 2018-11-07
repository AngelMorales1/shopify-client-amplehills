import React, { Component } from 'react';
import CakeRequestForm from 'components/CakeRequestForm';

class CakeRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const {
      cakeLocations,
      cakeFlavors,
      cakeToppings,
      cakeFillings,
      cakeDeposit,
      actions,
      checkout,
      addLineItemsStatus
    } = this.props;

    return (
      <div className="CakeRequestFormView">
        <CakeRequestForm
          cakeLocations={cakeLocations}
          cakeFlavors={cakeFlavors}
          cakeToppings={cakeToppings}
          cakeFillings={cakeFillings}
          cakeDeposit={cakeDeposit}
          actions={actions}
          checkout={checkout}
          addLineItemsStatus={addLineItemsStatus}
        />
      </div>
    );
  }
}

export default CakeRequestFormView;

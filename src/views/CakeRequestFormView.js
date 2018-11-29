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
      cakeSprinkles,
      cakeSizes
    } = this.props;

    return (
      <div className="CakeRequestFormView">
        <CakeRequestForm
          cakeLocations={cakeLocations}
          cakeFlavors={cakeFlavors}
          cakeToppings={cakeToppings}
          cakeFillings={cakeFillings}
          cakeSprinkles={cakeSprinkles}
          cakeDeposit={cakeDeposit}
          cakeSizes={cakeSizes}
          actions={actions}
          checkout={checkout}
          today={new Date()}
        />
      </div>
    );
  }
}

export default CakeRequestFormView;

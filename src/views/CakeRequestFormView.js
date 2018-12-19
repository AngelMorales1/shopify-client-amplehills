import React, { Component } from 'react';
import CakeRequestForm from 'components/CakeRequestForm';

import moment from 'moment';

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
      cakeSizes,
      cakeRecommendations
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
          cakeRecommendations={cakeRecommendations}
          actions={actions}
          checkout={checkout}
          today={new Date()}
          daysAfter={new Date(moment().add(3, 'days'))}
        />
      </div>
    );
  }
}

export default CakeRequestFormView;

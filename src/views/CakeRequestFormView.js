import React, { Component } from 'react';
import CakeRequestForm from 'components/CakeRequestForm';

class CakeRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const {
      cakeLocations,
      cakeAddOns,
      cakeDeposit,
      actions,
      checkout,
      addLineItemsStatus
    } = this.props;

    return (
      <div className="CakeRequestFormView">
        <CakeRequestForm
          cakeLocations={cakeLocations}
          cakeAddOns={cakeAddOns}
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

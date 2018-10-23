import React, { Component } from 'react';
import PartyRequestForm from 'components/PartyRequestForm';

class PartyRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const {
      partyAvailableLocations,
      partyAddons,
      partyDeposit,
      actions,
      checkout,
      addLineItemsStatus
    } = this.props;

    return (
      <div className="PartyRequestFormView">
        <PartyRequestForm
          partyAvailableLocations={partyAvailableLocations}
          partyAddons={partyAddons}
          partyDeposit={partyDeposit}
          actions={actions}
          checkout={checkout}
          addLineItemsStatus={addLineItemsStatus}
        />
      </div>
    );
  }
}

export default PartyRequestFormView;

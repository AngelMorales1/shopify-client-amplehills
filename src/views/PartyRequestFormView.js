import React, { Component } from 'react';
import PartyRequestForm from 'components/PartyRequestForm';

class PartyRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const {
      partyAvailableLocations,
      formStateus,
      partyAddons,
      partyDeposit,
      actions,
      checkout
    } = this.props;

    return (
      <div className="PartyRequestFormView">
        <PartyRequestForm
          formStateus={formStateus}
          partyAvailableLocations={partyAvailableLocations}
          partyAddons={partyAddons}
          partyDeposit={partyDeposit}
          actions={actions}
          checkout={checkout}
        />
      </div>
    );
  }
}

export default PartyRequestFormView;

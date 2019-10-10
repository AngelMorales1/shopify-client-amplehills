import React, { Component } from 'react';
import PartyRequestForm from 'components/PartyRequestForm';
import ErrorPage from 'components/ErrorPage';

class PartyRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <ErrorPage />;

    const {
      partyAvailableLocations,
      partyAddOns,
      partyDeposit,
      actions,
      checkout,
      addLineItemsStatus,
      availabilities,
      disabledDays,
      getAvailabilityStatus,
      actions: { getAvailability }
    } = this.props;

    return (
      <div className="PartyRequestFormView">
        <PartyRequestForm
          availabilities={availabilities}
          disabledDays={disabledDays}
          getAvailability={getAvailability}
          getAvailabilityStatus={getAvailabilityStatus}
          partyAvailableLocations={partyAvailableLocations}
          partyAddOns={partyAddOns}
          partyDeposit={partyDeposit}
          actions={actions}
          checkout={checkout}
          addLineItemsStatus={addLineItemsStatus}
          today={new Date()}
        />
      </div>
    );
  }
}

export default PartyRequestFormView;

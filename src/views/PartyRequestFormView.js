import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import PartyRequestForm from 'components/PartyRequestForm';

class PartyRequestFormView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const { partyAvailableLocations } = this.props;

    return (
      <div className="PartyRequestFormView">
        <PartyRequestForm partyAvailableLocations={partyAvailableLocations} />
      </div>
    );
  }
}

export default PartyRequestFormView;

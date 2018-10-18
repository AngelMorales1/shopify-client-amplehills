import React, { Component } from 'react';
import Global from 'constants/Global';
import LocationsMapFilters from 'constants/LocationsMapFilters';
import get from 'utils/get';

import LocationsMap from 'components/LocationsMap';
import LocationsCards from 'components/LocationsCards';

class LocationsLandingView extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, large } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= large.lowerbound ? small.label : large.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const { model, alertIsActive, locations } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const mapPosition = alertIsActive
      ? Global.headerHeight.desktop + Global.alertHeight.desktop
      : Global.headerHeight.desktop;

    const locationsState = locations.reduce((states, location) => {
      const state = get(location, 'state', '');
      states[state] = true;
      return states;
    }, {});
    const states = Object.keys(locationsState).map(
      state => LocationsMapFilters.STATE_FILTERS[state]
    );

    return (
      <div className="Locations w100 flex flex-row">
        {this.state.currentBreakpoint !== 'small' ? (
          <div
            className="self-start w100"
            style={{
              position: 'sticky',
              top: `${mapPosition}px`
            }}
          >
            <LocationsMap {...this.props} states={states} />
          </div>
        ) : null}
        <div
          style={
            this.state.currentBreakpoint === 'small'
              ? { width: '100%' }
              : { width: `${Global.locationsCardsWidth}px` }
          }
        >
          <LocationsCards {...this.props} states={states} />
        </div>
      </div>
    );
  }
}

export default LocationsLandingView;

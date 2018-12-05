import React, { Component } from 'react';
import Global from 'constants/Global';
import getUrlParam from 'utils/getUrlParam';
import LocationsMapFilters from 'constants/LocationsMapFilters';
import get from 'utils/get';

import LocationsMap from 'components/LocationsMap';
import LocationsCards from 'components/LocationsCards';

class LocationsLandingView extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.small.label,
    mapHasLoaded: false,
    cardHasLoaded: false
  };

  componentDidMount() {
    const searchParam = getUrlParam('search');

    if (searchParam) {
      this.props.actions.updateSearchFilter(searchParam);
    }

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

  locationsMapHasLoaded = () => {
    this.setState({ mapHasLoaded: true }, this.setSelectedLocation);
  };

  locationsCardHasLoaded = () => {
    this.setState({ cardHasLoaded: true }, this.setSelectedLocation);
  };

  setSelectedLocation = () => {
    const param = getUrlParam('location');

    if (param && this.state.mapHasLoaded && this.state.cardHasLoaded) {
      const actions = get(this, 'props.actions', {});
      actions.selectLocation(param);
    }
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
            <LocationsMap
              states={states}
              locationsMapHasLoaded={this.locationsMapHasLoaded}
              {...this.props}
            />
          </div>
        ) : null}
        <div
          style={
            this.state.currentBreakpoint === 'small'
              ? { width: '100%' }
              : { width: `${Global.locationsCardsWidth}px` }
          }
        >
          <LocationsCards
            states={states}
            locationsCardHasLoaded={this.locationsCardHasLoaded}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default LocationsLandingView;

import React, { Component } from 'react';
import Global from 'constants/Global';

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
    const { model, appAlertIsActive } = this.props;
    if (model.isError) return <h1>Error</h1>;
    const mapPosition = appAlertIsActive
      ? Global.headerHeight.desktop + Global.alertHeight.desktop
      : Global.headerHeight.desktop;

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
            <LocationsMap {...this.props} />
          </div>
        ) : null}
        <div
          style={
            this.state.currentBreakpoint === 'small'
              ? { width: '100%' }
              : { width: `${Global.locationsCardsWidth}px` }
          }
        >
          <LocationsCards {...this.props} />
        </div>
      </div>
    );
  }
}

export default LocationsLandingView;

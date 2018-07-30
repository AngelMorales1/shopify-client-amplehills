import React, { Component } from 'react';
import Global from 'constants/Global';

import LocationsMap from 'components/LocationsMap';
import LocationsSideRail from 'components/LocationsSideRail';

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
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="Locations">
        {this.state.currentBreakpoint !== 'small' ? (
          <div className="col col-8">
            <LocationsMap {...this.props} />
          </div>
        ) : null}
        <div className="col col-12 md-col-4">
          <LocationsSideRail {...this.props} />
        </div>
      </div>
    );
  }
}

export default LocationsLandingView;

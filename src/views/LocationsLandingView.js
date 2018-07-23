import React, { Component } from 'react';
import MapboxMap from 'components/MapboxMap';

class LocationsLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    console.log(this.props);
    return <div className="Locations" />;
  }
}

export default LocationsLandingView;

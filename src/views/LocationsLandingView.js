import React, { Component } from 'react';
import MapboxMap from 'components/MapboxMap';

class LocationsLandingView extends Component {
  render() {
    const { model, locationGeo } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="Locations">
        <MapboxMap featureCollection={locationGeo} />
      </div>
    );
  }
}

export default LocationsLandingView;

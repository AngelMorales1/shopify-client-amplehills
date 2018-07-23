import React, { Component } from 'react';

class LocationsLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="Home">Locations!</div>;
  }
}

export default LocationsLandingView;

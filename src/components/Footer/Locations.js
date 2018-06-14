import React, { Component } from 'react';
import Region from './Region.js';

class Locations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);

    return (
      <div>
        <h1>Locations</h1>
        {regions.map(region => (
          <Region
            key={region}
            region={region}
            stores={this.props.locations[region]}
          />
        ))}
      </div>
    );
  }
}

export default Locations;

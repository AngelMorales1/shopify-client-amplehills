import React, { Component } from 'react';
import Region from './Region.js';

import styles from './Footer.scss';

class Locations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div>
        <h1>Locations</h1>
        <div>
          {regions.map(region => (
            <Region
              key={region}
              region={region}
              stores={this.props.locations[region]}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Locations;

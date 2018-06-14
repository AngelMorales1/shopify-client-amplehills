import React, { Component } from 'react';
import Region from './Region.js';

import styles from './Footer.scss';

class Locations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div className={`${styles['location-container']} border m4`}>
        <h1
          className={`${styles['footer--font-color']} ${
            styles['title-text']
          } mb2`}
        >
          Locations
        </h1>
        <div
          className={`${styles['test']} ${
            styles['region-container']
          } flex flex-column flex-wrap`}
        >
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

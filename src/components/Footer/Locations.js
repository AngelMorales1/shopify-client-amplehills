import React, { Component } from 'react';
import Region from './Region.js';

import styles from './Footer.scss';

class Locations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div className={`p3`}>
        <h2 className={`footer-text  mb2 ml3 ${styles['title-text']}`}>
          Locations
        </h2>
        <div
          className={`${styles['region-container']} flex flex-column flex-wrap`}
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

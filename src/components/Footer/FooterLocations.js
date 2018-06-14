import React, { Component } from 'react';
import FooterRegions from './FooterRegions.js';

import styles from './Footer.scss';

class FooterLocations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div className={`p3`}>
        <h2 className={`footer-text  mb2 ml3 ${styles['title-text']}`}>
          Locations
        </h2>
        <div
          className={`${
            styles['FooterRegion__container']
          } flex flex-column flex-wrap`}
        >
          {regions.map(region => (
            <FooterRegions
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

export default FooterLocations;

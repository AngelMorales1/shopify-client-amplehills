import React, { Component } from 'react';

import styles from './Footer.scss';
import Locations from './Locations.js';

class Footer extends Component {
  sortDataByRegion(data = []) {
    return data.reduce((acc, cur) => {
      let region = cur.fields.region;
      acc[region]
        ? (acc[region] = acc[region].concat([cur]))
        : (acc[region] = [cur]);
      return acc;
    }, {});
  }

  render() {
    return (
      <div className={`${styles['footer-container']} drip p4`}>
        <Locations
          locations={this.sortDataByRegion(this.props.locations.items)}
        />
        <span className={`footer-text}`}>
          &copy; 2017 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

import React, { Component } from 'react';

import styles from './Footer.scss';
import FooterLocations from './FooterLocations.js';

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
      <div className={`${styles['Footer__container']} drip p4`}>
        <FooterLocations
          locations={this.sortDataByRegion(this.props.locations.items)}
        />
        <span className={`footer-text ${styles['licence-text']}`}>
          &copy; 2017 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

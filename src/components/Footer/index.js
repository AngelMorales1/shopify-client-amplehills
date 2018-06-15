import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Footer.scss';
import FooterLocations from './FooterLocations.js';

class Footer extends Component {
  sortDataByRegion(data = []) {
    return data.reduce((accumulated, current) => {
      let region = current.fields.region;
      accumulated[region]
        ? (accumulated[region] = accumulated[region].concat([current]))
        : (accumulated[region] = [current]);
      return accumulated;
    }, {});
  }

  render() {
    return (
      <div className={cx('p4 bg-madison-blue', styles['Footer'])}>
        <FooterLocations
          locations={this.sortDataByRegion(this.props.locations.items) || {}}
        />
        <span className={cx('Footer__text Footer__licence-text text-white')}>
          &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

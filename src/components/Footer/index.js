import React, { Component } from 'react';
import cx from 'classnames';

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
      <div className={cx('drip p4', styles['Footer'])}>
        <FooterLocations
          locations={this.sortDataByRegion(this.props.locations.items)}
        />
        <span className={cx('footer-text', styles['licence-text'])}>
          &copy; 2017 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

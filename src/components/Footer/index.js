import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import FooterLocations from './FooterLocations.js';
import FooterLinks from './FooterLinks.js';

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
      <div className={cx('p4 bg-madison-blue Footer__text', styles['Footer'])}>
        <div>
          <FooterLocations
            locations={this.sortDataByRegion(this.props.locations.items)}
          />
          <FooterLinks
            footerIllustration={this.props.footerIllustration}
            footerLinks={this.props.footerLinks}
          />
        </div>
        <span className="Footer__licence-text text-white">
          &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

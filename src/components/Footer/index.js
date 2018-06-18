import React, { Component } from 'react';
import cx from 'classnames';
import styles from './Footer.scss';
import FooterLocations from './FooterLocations.js';
import FooterLinks from './FooterLinks.js';
import { Image } from 'components/base';

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
        <div className="clearfix flex">
          <FooterLocations
            locations={this.sortDataByRegion(this.props.locations.items)}
          />
          <FooterLinks
            footerIllustration={this.props.footerIllustration}
            footerLinks={this.props.footerLinks}
          />
        </div>
        <span className="ml4 bold Footer--smaller-text text-white">
          &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
        {this.props.footerIllustration ? (
          <Image
            src={this.props.footerIllustration.fields.file.url}
            className={cx('w14', styles['illustration'])}
          />
        ) : null}
      </div>
    );
  }
}

export default Footer;

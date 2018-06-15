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
    // let globalDataItems = this.props.globalSettingsData.items.length > 0 ? this.props.globalSettingsData.items[0] : {};
    return (
      <div className={cx('p4 bg-madison-blue Footer__text', styles['Footer'])}>
        <div>
          <FooterLocations
            locations={this.sortDataByRegion(this.props.locations.items)}
          />
          <FooterLinks />
        </div>
        <span className="Footer__licence-text text-white">
          &copy; 2018 Ample Hills Creamery. Privacy Policy & Accessibility
        </span>
      </div>
    );
  }
}

export default Footer;

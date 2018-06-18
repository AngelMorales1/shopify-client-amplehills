import React, { Component } from 'react';
import cx from 'classnames';
import FooterRegions from './FooterRegions.js';
import styles from './Footer.scss';

class FooterLocations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div className="m4 col-6">
        <h2 className="title bold mb2 text-white">Locations</h2>
        <div
          className={cx(
            'flex flex-column flex-wrap',
            styles['FooterRegions__container']
          )}
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

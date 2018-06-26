import React, { Component } from 'react';
import cx from 'classnames';
import FooterRegions from './FooterRegions.js';
import styles from './Footer.scss';

class FooterLocations extends Component {
  render() {
    let regions = Object.keys(this.props.locations);
    return (
      <div
        className={cx(
          'flex flex-column m4',
          styles['Footer__Locations-container']
        )}
      >
        <h2 className="mb2 text-white block-headline">Locations</h2>
        <div
          className={cx(
            'flex flex-column flex-wrap',
            styles['Footer__Regions-container']
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

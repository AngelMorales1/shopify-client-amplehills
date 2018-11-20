import React, { Component } from 'react';
import cx from 'classnames';

import { Image, Button, TextField } from 'components/base';
import styles from './LocationSearch.scss';

class LocationSearch extends Component {
  state = {
    address: ''
  };

  render() {
    return (
      <div
        className={cx(
          styles['LocationSearch'],
          'absolute w100 py4 px2 z-sub-nav'
        )}
      >
        <div
          className={cx(
            styles['LocationSearch__container'],
            'bg-white drop-shadow w100 content-width flex justify-between mx-auto'
          )}
        >
          <div className="flex flex-row justify-between items-center">
            <h2
              className={cx(
                styles['LocationSearch__text'],
                'carter text-peach col-7 md-col-12 mr2'
              )}
            >
              Find an Ample Hill’s Creamery near you
            </h2>
            <Button
              variant="style-none"
              to="/locations"
              className={cx(
                styles['LocationSearch__button-image'],
                'md-hide lg-hide p0'
              )}
            >
              <Image src="/assets/images/arrow-inside-circle.svg" />
            </Button>
          </div>
          <div className="xs-hide sm-hide col-5 flex flex-row items-center ml-auto mr0">
            <div
              className={cx(
                styles['LocationSearch__text-field-container'],
                'mr2 w100'
              )}
            >
              <TextField
                value={this.state.address}
                onChange={value => this.setState({ address: value })}
                className={cx(styles['LocationSearch__text-field'], 'w100')}
                placeholder="Address or Zip"
                variant="madison-blue-border-round"
              />
            </div>
            <Button
              className={cx(styles['LocationSearch__search-button'], 'px3 mr3')}
              label="Search"
              variant="primary"
              color="madison-blue"
              shadow={true}
            />
          </div>
          <div className={cx(styles['LocationSearch__all-locations-button'])}>
            <Button
              className="text-madison-blue inline-block"
              variant="underline-peach"
              to="/locations"
              label="All Locations"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LocationSearch;

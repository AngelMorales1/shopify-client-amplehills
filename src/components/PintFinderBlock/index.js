import React, { Component } from 'react';
import cx from 'classnames';
import { VscLoading } from 'react-icons/vsc';

import { Button, Dropdown, TextField } from 'components/base';
import styles from './PintFinderBlock.scss';

class PintFinderBlock extends Component {
  state = {
    address: '',
    radius: 10
  };

  handleChangeAddress = address =>
    this.setState(state => ({ ...state, address }));
  handleRadiusChange = radius => this.setState(state => ({ ...state, radius }));

  render() {
    const { address, radius } = this.state;
    console.log('POP', this.props);

    return (
      <div
        className={cx(styles['PintFinder'], 'relative col-12 bg-sky-blue drip')}
        style={{ zIndex: this.props.z }}
      >
        <div
          className={cx(
            styles['PintFinder__inner'],
            'flex flex-wrap justify-center items-center mx-auto'
          )}
        >
          <div className="col-12 md-col-6">
            <h2 className="block-headline mb3">Local Retailers</h2>
            <div className="markdown-block text-container-width">
              <p>
                Find our ice cream in a retailer or scoop shop near you. Enter
                your zip code or use your current location to locate the closest
                pint!
              </p>
            </div>
          </div>
          <div className="col-12 md-col-6 flex flex-column justify-center items-center ">
            <div className="relative mb2 col-12 md-col-10">
              <TextField
                type="text"
                className="col-12"
                name="zip"
                placeholder="Enter your zip code"
                variant="primary-search"
                value={address}
                onChange={this.handleChangeAddress}
              />
              <div
                className={cx(
                  styles['PintFinder__input-control'],
                  'flex items-center'
                )}
              >
                <Button
                  key="2-button"
                  disabled={!address}
                  variant="primary-small"
                  label="Search"
                  color="madison-blue"
                  onClick={this.handleSearch}
                />
              </div>
            </div>
            <div
              className={cx(
                styles['PintFinder__radius-dropdown-container'],
                'col-12 center'
              )}
            >
              <span className="small">Search for retailers within</span>
              <Dropdown
                textAlignCenter={true}
                color="peach"
                textColor="peach"
                className={cx(
                  styles['PintFinder__radius-dropdown'],
                  'wauto mx1 small inline-block'
                )}
                variant="underline"
                value={radius}
                options={[5, 10, 25, 100].map(distance => {
                  return { label: `${distance} mi`, value: distance };
                })}
                onChange={radius => this.handleRadiusChange(radius.value)}
              />
              <span className="small xs-hide sm-hide">of your location</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PintFinderBlock;

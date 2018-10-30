import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import Global from 'constants/Global';
import locationModel from 'models/locationModel';

import { Button, Image } from 'components/base';
import styles from './AvailableFlavors.scss';

class AvailableFlavors extends Component {
  state = {
    currentBreakpoint: Global.breakpoints.medium.label,
    showAllFlavorOnMobileView: false
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  render() {
    const { drip, setRef, location, block, z } = this.props;
    const { small } = Global.breakpoints;
    const title = get(block, 'fields.title', '');
    const locationId = get(location, 'id', '');
    const isMobileView = this.state.currentBreakpoint === small.label;
    const availableFlavors = get(location, 'availableFlavors', []);
    const selectedAvailableFlavors =
      isMobileView && !this.state.showAllFlavorOnMobileView
        ? availableFlavors.slice(0, 4)
        : availableFlavors;
    const FlavorsLength = availableFlavors.length;

    return (
      <div
        ref={refBlock => setRef(refBlock)}
        style={{ zIndex: z }}
        className={cx({ drip: drip }, 'bg-iceberg py4 px3')}
      >
        <div className="mx-auto flex flex-column items-center container-width">
          <h2 className="block-headline center mb3">{title}</h2>
          <div
            className={cx(
              styles['AvailableFlavors__card-container'],
              'flex flex-wrap items-center justify-center'
            )}
          >
            {selectedAvailableFlavors.map((flavor, i) => {
              const fields = get(flavor, 'fields', {});
              const title = get(fields, 'title', '');
              const label = get(fields, 'label', '');
              const image = get(fields, 'image.fields.file.url', '');
              const isLocationSpecial = get(fields, 'locationSpecial', []).find(
                location => {
                  return get(location, 'sys.id', '') === locationId;
                }
              );

              return (
                <div
                  key={get(flavor, 'sys.id', i)}
                  className={cx(
                    styles['AvailableFlavors__card'],
                    'flex flex-row justify-between items-center bg-white m1 p1'
                  )}
                >
                  <Image
                    className={cx(
                      styles['AvailableFlavors__card-image'],
                      'col-5'
                    )}
                    src={contentfulImgUtil(image, '200')}
                  />
                  <div className="col-6">
                    {label &&
                      !isLocationSpecial && (
                        <p className="small mb1 carter text-peach">{label}</p>
                      )}
                    {isLocationSpecial && (
                      <p className="small mb1 carter text-peach">
                        Location Special
                      </p>
                    )}
                    <p className="small bold">{title}</p>
                  </div>
                </div>
              );
            })}
            {isMobileView && FlavorsLength > 4 ? (
              <Button
                className="mt3"
                variant="primary-small"
                color="peach"
                onClick={() =>
                  this.setState({
                    showAllFlavorOnMobileView: !this.state
                      .showAllFlavorOnMobileView
                  })
                }
                label={
                  this.state.showAllFlavorOnMobileView
                    ? 'View Less Flavors'
                    : `View ${FlavorsLength - 4} More Flavors`
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

AvailableFlavors.propTypes = {
  drip: PropTypes.bool,
  setRef: PropTypes.func,
  location: locationModel.propTypes,
  block: PropTypes.shape({
    title: PropTypes.string
  }),
  z: PropTypes.number
};

AvailableFlavors.defaultProps = {
  drip: false,
  setRef: () => {},
  location: locationModel.default,
  block: {
    title: ''
  },
  z: 1
};

export default AvailableFlavors;

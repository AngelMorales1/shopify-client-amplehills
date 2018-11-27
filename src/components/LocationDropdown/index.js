import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import {
  FARTHER_FROM_BROOKLYN,
  FARTHEST_FROM_BROOKLYN,
  BROOKLYN
} from 'constants/LocationGroups';
import styles from './LocationDropdown.scss';
import { Image, Button } from 'components/base';
const LocationDropdown = ({
  alertIsActive,
  locationDropdownIsOpen,
  openLocationDropdown,
  closeLocationDropdown,
  locationSortedByGroup,
  locationDropdownImage
}) => {
  return (
    <div
      onMouseEnter={openLocationDropdown}
      onMouseLeave={closeLocationDropdown}
      className={cx(
        styles['LocationDropdown'],
        {
          [styles['LocationDropdown--inactive']]: !locationDropdownIsOpen
        },
        'relative'
      )}
    >
      <div
        className={cx(
          styles['LocationDropdown__nav-container'],
          {
            [styles[
              'LocationDropdown__nav-container--with-alert'
            ]]: alertIsActive
          },
          'absolute z-nav'
        )}
      >
        <div className={cx('w100 pt3 px4 bg-peach fixed drip')}>
          <div className="flex flex-row items-center justify-between">
            <div className="col-3">
              <Image src={locationDropdownImage} />
            </div>
            <div className="col-8 flex flex-row items-start justify-between">
              {Object.keys(locationSortedByGroup).map(locationGroup => {
                let locationGroupTitle = BROOKLYN;

                if (locationGroup === FARTHER_FROM_BROOKLYN) {
                  locationGroupTitle = FARTHER_FROM_BROOKLYN;
                }

                if (locationGroup === FARTHEST_FROM_BROOKLYN) {
                  locationGroupTitle = FARTHEST_FROM_BROOKLYN;
                }

                return (
                  <div key={locationGroup} className="col-4 mr2">
                    <p className="carter text-white mb3 white-space-normal">
                      {locationGroupTitle}
                    </p>
                    {Object.keys(locationSortedByGroup[locationGroup]).map(
                      region => {
                        return (
                          <div
                            key={region}
                            className="flex flex-column items-start mb2"
                          >
                            <p className="bold text-white mb1 white-space-normal">
                              {region}
                            </p>
                            {get(
                              locationSortedByGroup,
                              `${locationGroup}.${region}`,
                              []
                            )
                              .sort(
                                (a, b) => a.navRegionOrder - b.navRegionOrder
                              )
                              .map(location => {
                                const title = get(location, 'title', '');
                                const slug = get(location, 'slug', '');

                                return (
                                  <Button
                                    key={title}
                                    className={cx(
                                      styles['LocationDropdown__location-link'],
                                      'text-white light mb1 white-space-normal avenir'
                                    )}
                                    onClick={closeLocationDropdown}
                                    to={`/location/${slug}`}
                                    label={title}
                                    variant="style-none"
                                    hover="underline-white"
                                  />
                                );
                              })}
                          </div>
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LocationDropdown;
LocationDropdown.propTypes = {
  alertIsActive: PropTypes.bool,
  LocationDropdownIsOpen: PropTypes.bool,
  openLocationDropdown: PropTypes.func,
  closeLocationDropdown: PropTypes.func,
  locationSortedByGroup: PropTypes.object,
  locationDropdownImage: PropTypes.string
};
LocationDropdown.defaultProps = {
  alertIsActive: false,
  LocationDropdownIsOpen: false,
  openLocationDropdown: () => {},
  closeLocationDropdown: () => {},
  locationSortedByGroup: {},
  locationDropdownImage: ''
};

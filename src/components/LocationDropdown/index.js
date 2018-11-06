import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import styles from './LocationDropdown.scss';
import { Image, Button } from 'components/base';
const LocationDropdown = ({
  productLanding,
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
              {Object.keys(locationSortedByGroup).map(locationGrop => {
                let locationGroupTitle = 'Brooklyn';
                if (locationGrop === 'fartherFromBrooklyn') {
                  locationGroupTitle = 'Farther From Brooklyn';
                }
                if (locationGrop === 'farthestFromBrooklyn') {
                  locationGroupTitle = 'Farthest from Brooklyn';
                }
                return (
                  <div className="col-4 mr2">
                    <p className="carter text-white mb3 white-space-normal">
                      {locationGroupTitle}
                    </p>
                    {Object.keys(locationSortedByGroup[locationGrop]).map(
                      region => {
                        return (
                          <div className="flex flex-column items-start mb2">
                            <p className="bold text-white mb1 white-space-normal">
                              {region}
                            </p>
                            {get(
                              locationSortedByGroup,
                              `${locationGrop}.${region}`,
                              []
                            ).map(location => {
                              const fields = get(location, 'fields', {});
                              const title = get(fields, 'title', '');
                              const slug = get(fields, 'slug', '');
                              return (
                                <Button
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
  productLanding: PropTypes.object,
  alertIsActive: PropTypes.bool,
  LocationDropdownIsOpen: PropTypes.bool,
  openLocationDropdown: PropTypes.func,
  closeLocationDropdown: PropTypes.func
};
LocationDropdown.defaultProps = {
  productLanding: {},
  alertIsActive: false,
  LocationDropdownIsOpen: false,
  openLocationDropdown: () => {},
  closeLocationDropdown: () => {}
};

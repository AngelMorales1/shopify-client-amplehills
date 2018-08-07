import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import getDistanceBetweenLocations from 'utils/getDistanceBetweenLocations';
import locationModel from 'models/locationModel';
import LocationsMapFilters from 'constants/LocationsMapFilters';

import { Image, Dropdown, TextField, Button } from 'components/base';
import styles from './LocationsCards.scss';

class LocationsCards extends Component {
  state = {
    position: null,
    sortedLocations: false
  };

  componentDidMount = () => {
    this.attemptToGetDistanceToStores();
  };

  componentDidUpdate = prevProps => {
    if (this.props.filteredLocations !== prevProps.filteredLocations) {
      this.attemptToGetDistanceToStores();
    }
  };

  attemptToGetDistanceToStores = () => {
    const locations = this.props.filteredLocations;
    if ('geolocation' in window.navigator) {
      return this.getDistanceToStores(locations);
    } else {
      return this.setState({
        sortedLocations: locations
      });
    }
  };

  getDistanceToStores = locations => {
    const { position } = this.state;

    if (position) {
      this.sortLocationsByDistance(locations, position);
    } else {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({ position });
          this.sortLocationsByDistance(locations, position);
        },
        error => {
          this.setState({ sortedLocations: locations });
        }
      );
    }
  };

  sortLocationsByDistance = (locations, position) => {
    const currentLocation = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    };

    const sortedLocations = locations.sort((location1, location2) => {
      location1.distance = getDistanceBetweenLocations(
        location1.coordinates.lat,
        location1.coordinates.lon,
        currentLocation.lat,
        currentLocation.lon
      );
      location2.distance = getDistanceBetweenLocations(
        location2.coordinates.lat,
        location2.coordinates.lon,
        currentLocation.lat,
        currentLocation.lon
      );
      return location1.distance - location2.distance;
    });

    this.setState({ sortedLocations: sortedLocations });
  };

  render() {
    const {
      actions,
      locationFilters,
      searchFilter,
      locationResultsLabel,
      selectedLocation
    } = this.props;
    const { sortedLocations } = this.state;
    const STATE_KEY = get(
      Object.values(LocationsMapFilters.STATE_FILTERS),
      '[0].key',
      ''
    );
    const activeStateFilter = locationFilters.find(
      filter => filter.key === STATE_KEY
    );

    return (
      <div
        className={cx(
          styles['LocationsCards'],
          'flex justify-center bg-goldenrod py3'
        )}
      >
        <div
          className={cx(
            styles['LocationsCards__cards-container'],
            'w100 flex flex-wrap items-start justify-center'
          )}
        >
          {sortedLocations ? (
            <div className="transition-slide-up w100">
              <div
                className={cx(
                  styles['LocationsCards__states-dropdown'],
                  'mb3 mx-auto'
                )}
              >
                <Dropdown
                  className="w100 flex"
                  selectClassName="w100"
                  variant="secondary"
                  placeholder="All states"
                  value={
                    activeStateFilter
                      ? get(activeStateFilter, 'value', '')
                      : null
                  }
                  options={[{ label: 'All states', value: 'All' }]
                    .concat(Object.values(LocationsMapFilters.STATE_FILTERS))
                    .map(filter => ({
                      label: filter.label,
                      value: filter.value
                    }))}
                  onChange={filter =>
                    filter.value === 'All'
                      ? actions.clearLocationFilters()
                      : actions.addLocationFilter({
                          key: STATE_KEY,
                          value: filter.value
                        })
                  }
                />
              </div>
              <div
                className={cx(
                  styles['LocationsCards__search'],
                  'mx-auto mb3 relative'
                )}
              >
                <TextField
                  value={searchFilter}
                  variant="primary-search"
                  className={styles['LocationsCards__search']}
                  placeholder={
                    locationFilters.length
                      ? `Search locations in ${
                          LocationsMapFilters.STATE_FILTERS[
                            activeStateFilter.value
                          ].label
                        }`
                      : `Search locations`
                  }
                  onChange={searchFilter =>
                    actions.updateSearchFilter(searchFilter)
                  }
                />
                <Button
                  disabled={!searchFilter}
                  className={cx(
                    styles['LocationsCards__search-button'],
                    'transition absolute t0 r0 small',
                    {
                      [styles[
                        'LocationsCards__search-button--active'
                      ]]: searchFilter
                    }
                  )}
                  variant="no-style"
                  label="Clear"
                  onClick={() => actions.updateSearchFilter('')}
                />
              </div>
              <div className="mb2 center">
                <span className="bold">{locationResultsLabel}</span>
              </div>
              <div className="flex flex-column items-center">
                {sortedLocations.map(location => (
                  <div
                    key={location.id}
                    className={cx(
                      styles['LocationsCards__card-container'],
                      'transition-slide-up-large transition bg-white my2 flex flex-column justify-between relative w100',
                      {
                        [styles['LocationsCards__card-container--selected']]:
                          location.id === selectedLocation
                      }
                    )}
                  >
                    {location.distance ? (
                      <div
                        className={cx(
                          styles['LocationsCards__card-tag'],
                          'bg-peach bold text-white absolute m3'
                        )}
                      >
                        <span
                          className={cx(
                            styles['LocationsCards__card-text'],
                            'uppercase'
                          )}
                        >
                          {location.distance} miles away
                        </span>
                      </div>
                    ) : null}
                    <div
                      className={cx(
                        styles['LocationsCards__card-seasonal'],
                        'absolute flex flex-column items-center justify-center z-1'
                      )}
                    >
                      <Image
                        className={cx(
                          styles['LocationsCards__card-seasonal-image'],
                          'z-overlay'
                        )}
                        src={get(location, 'seasonalImage', '')}
                      />
                      <div
                        className={cx(
                          styles['LocationsCards__card-seasonal-circle'],
                          location.seasonal
                            ? 'bg-pastel-pink'
                            : 'bg-pastel-blue',
                          'circle flex flex-column items-center justify-center'
                        )}
                      >
                        <span
                          className={cx(
                            styles['LocationsCards__card-seasonal-circle-text'],
                            'text-white small bold'
                          )}
                        >
                          {location.seasonal ? 'S' : 'YR'}
                        </span>
                      </div>
                    </div>
                    <div
                      style={
                        location.image
                          ? {
                              background: `url(${
                                location.image
                              }) no-repeat center`,
                              backgroundSize: 'cover'
                            }
                          : null
                      }
                      className={cx(styles['LocationsCards__card-image'], {
                        'bg-denim': !location.image
                      })}
                    />
                    <div
                      className={cx(styles['LocationsCards__card-drip'], 'p3')}
                    >
                      <h2 className="big carter mb2">{location.title}</h2>
                      <div>
                        <div className="flex flex-column justify-between">
                          <span className="small">{location.address1}</span>
                          <span
                            className={cx(
                              styles['LocationsCards__card-text'],
                              'small'
                            )}
                          >{`${location.city}, ${location.state} ${
                            location.zip
                          }`}</span>
                          <span
                            className={cx(
                              styles['LocationsCards__card-text'],
                              'small'
                            )}
                          >
                            {location.phone}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-row flex-wrap justify-between items-center mt2">
                          {location.currentOpenHours ? (
                            <div className="flex flex-column">
                              <span className="block-subheadline bold">
                                Open today
                              </span>
                              <span className={cx('small')}>
                                {location.hours[location.currentOpenHours]}
                              </span>
                            </div>
                          ) : (
                            <span className="block-subheadline bold">
                              Closed today
                            </span>
                          )}
                          {location.delivery ? (
                            <div
                              className={cx(
                                styles['LocationsCards__card-tag'],
                                'uppercase bold bg-madison-blue inline-block text-white mt2'
                              )}
                            >
                              <span className="text-white">Delivery</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h100 flex flex-row items-center justify-center">
              <div className={cx(styles['loader'])} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

LocationsCards.propTypes = {
  locations: PropTypes.arrayOf(locationModel.propTypes),
  selectedLocation: PropTypes.string
};

LocationsCards.defaultProps = {
  locations: [],
  selectedLocation: null
};

export default LocationsCards;

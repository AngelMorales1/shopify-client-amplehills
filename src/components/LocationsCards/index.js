import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import scrollTo from 'react-scroll-to-component';
import get from 'utils/get';
import getLocationCity from 'utils/getLocationCity';
import getDistanceBetweenLocations from 'utils/getDistanceBetweenLocations';
import locationModel from 'models/locationModel';
import LocationsMapFilters from 'constants/LocationsMapFilters';
import LocationCard from 'components/LocationCard';

import { Dropdown, TextField, Button } from 'components/base';
import styles from './LocationsCards.scss';

class LocationsCards extends Component {
  state = {
    position: null,
    sortedLocations: []
  };

  $cards = {};

  componentDidMount() {
    this.attemptToGetDistanceToStores();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.filteredLocations !== prevProps.filteredLocations) {
      this.attemptToGetDistanceToStores();
    }

    if (
      prevProps.selectedLocation !== this.props.selectedLocation &&
      this.props.selectedLocation !== null
    ) {
      scrollTo(this.$cards[this.props.selectedLocation], {
        duration: 1500
      });
    }
  }

  attemptToGetDistanceToStores = () => {
    const locations = this.props.filteredLocations;
    if ('geolocation' in window.navigator) {
      return this.getDistanceToStores(locations);
    } else {
      this.setState(
        {
          sortedLocations: locations
        },
        this.props.locationsCardHasLoaded
      );
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
          this.setState(
            { sortedLocations: locations },
            this.props.locationsCardHasLoaded
          );
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

    this.setState({ sortedLocations });
    this.props.locationsCardHasLoaded();
  };
  render() {
    const {
      actions,
      locationFilters,
      searchFilter,
      locationResultsLabel,
      selectedLocation,
      states
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
          {sortedLocations.length ? (
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
                    .concat(states)
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
                            get(activeStateFilter, 'value', 'NY')
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
                {sortedLocations.map(location => {
                  const locationUrl = `/location/${location.slug}`;

                  return (
                    <LocationCard
                      locationUrl={locationUrl}
                      getRef={$card => (this.$cards[location.id] = $card)}
                      key={location.id}
                      selectedLocation={selectedLocation}
                      location={location}
                    />
                  );
                })}
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
  selectedLocation: PropTypes.string,
  filteredLocations: PropTypes.arrayOf(
    PropTypes.shape({
      address1: PropTypes.string,
      address2: PropTypes.string,
      city: PropTypes.string,
      coordinates: PropTypes.shape({
        lon: PropTypes.number,
        lat: PropTypes.number
      }),
      currentOpenHours: PropTypes.string,
      delivery: PropTypes.bool,
      hours: PropTypes.shape({
        monday: PropTypes.string,
        tuesday: PropTypes.string,
        wednesday: PropTypes.string,
        thursday: PropTypes.string,
        friday: PropTypes.string,
        saturday: PropTypes.string,
        sunday: PropTypes.string
      }),
      id: PropTypes.string,
      image: PropTypes.string,
      orderDeliveryLink: PropTypes.string,
      phone: PropTypes.string,
      region: PropTypes.string,
      seasonal: PropTypes.bool,
      seasonalImage: PropTypes.string,
      sortedHours: PropTypes.arrayOf(PropTypes.object),
      state: PropTypes.string,
      stringifiedSearchableFields: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      zip: PropTypes.string
    })
  ),
  actions: PropTypes.shape({
    addLocationFilter: PropTypes.func,
    clearLocationFilters: PropTypes.func,
    clearLocationSelection: PropTypes.func,
    removeLocationFilter: PropTypes.func,
    selectLocation: PropTypes.func,
    updateSearchFilter: PropTypes.func
  }),
  locationFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    })
  ),
  searchFilter: PropTypes.string,
  locationResultsLabel: PropTypes.string,
  states: PropTypes.array
};

LocationsCards.defaultProps = {
  locations: [],
  selectedLocation: null,
  filteredLocations: [
    {
      address1: '',
      address2: '',
      city: '',
      coordinates: {
        lon: 0,
        lat: 0
      },
      currentOpenHours: '',
      delivery: false,
      hours: {
        monday: '',
        tuesday: '',
        wednesday: '',
        thursday: '',
        friday: '',
        saturday: '',
        sunday: ''
      },
      id: '',
      image: '',
      orderDeliveryLink: '',
      phone: '',
      region: '',
      seasonal: true,
      seasonalImage: '',
      sortedHours: [{}],
      state: '',
      stringifiedSearchableFields: [''],
      title: '',
      zip: ''
    }
  ],
  actions: {
    addLocationFilter: () => {},
    clearLocationFilters: () => {},
    clearLocationSelection: () => {},
    removeLocationFilter: () => {},
    selectLocation: () => {},
    updateSearchFilter: () => {}
  },
  locationFilters: [
    {
      key: '',
      value: ''
    }
  ],
  searchFilter: '',
  locationResultsLabel: '',
  states: []
};

export default LocationsCards;

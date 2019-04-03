import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import locationModel from 'models/locationModel';

import LocationsMapKey from 'constants/LocationsMapKey';

import { Button } from 'components/base';
import MapboxMap from 'components/MapboxMap';
import styles from './LocationsMap.scss';

class LocationsMap extends Component {
  state = {
    locationCount: {
      allYear: 0,
      seasonal: 0
    },
    seasonalIsdisabled: null,
    showFilteredOutLocationOnMap: false
  };

  componentDidMount() {
    const getLocationCount = this.props.locations.reduce(
      (locationCount, location) => {
        if (location.seasonal) {
          locationCount.seasonal++;
        } else {
          locationCount.allYear++;
        }

        return locationCount;
      },
      {
        allYear: 0,
        seasonal: 0
      }
    );

    this.setState({ locationCount: getLocationCount });
  }

  onClickFeature = feature => {
    const { actions, selectedLocation } = this.props;
    const featureLocationId = get(feature, 'properties.id', '');

    featureLocationId === selectedLocation
      ? actions.clearLocationSelection()
      : actions.selectLocation(featureLocationId);
  };

  handleRegionClick = (filter, filterIsActive) => {
    const { actions } = this.props;
    this.setState({
      seasonalIsdisabled: null,
      showFilteredOutLocationOnMap: true
    });

    if (filterIsActive) {
      actions.removeLocationFilter({
        key: filter.key,
        value: filter.value
      });
    } else {
      actions.addLocationFilter({
        key: filter.key,
        value: filter.value
      });
    }

    window.scrollTo(0, 0);
  };

  handleSeasonalClick = filter => {
    const { actions } = this.props;

    if (filter.value === this.state.seasonalIsdisabled) {
      this.setState({
        seasonalIsdisabled: null,
        showFilteredOutLocationOnMap: false
      });
      actions.removeLocationFilter({
        key: filter.key,
        value: filter.value
      });
    } else {
      this.setState({
        seasonalIsdisabled: filter.value,
        showFilteredOutLocationOnMap: false
      });
      actions.addLocationFilter({
        key: filter.key,
        value: filter.value
      });
    }
  };

  render() {
    const {
      filteredOutLocations,
      selectedLocation,
      locationFilters,
      locations,
      locationGeoJSON,
      actions,
      alertIsActive,
      states,
      locationsMapHasLoaded
    } = this.props;
    const { locationCount } = this.state;

    const LocationsMapClasses = cx(styles['LocationsMap'], 'relative', {
      [styles['LocationsMap--with-alert']]: alertIsActive
    });

    return (
      <div className={LocationsMapClasses}>
        <MapboxMap
          className="z-0"
          featureCollection={locationGeoJSON}
          defaultIcon="year-round-icon"
          styleUrl="mapbox://styles/amplemaps/cju1mzre610to1fqusknqhq34"
          collections={[
            {
              name: 'Selected',
              filter: {
                ids: selectedLocation ? [selectedLocation] : []
              },
              icon: 'selected-location-icon'
            },
            {
              name: 'SeasonalLocations',
              filter: {
                ids: locations
                  .filter(location => location.seasonal)
                  .filter(location => location.id !== selectedLocation)
                  .map(location => location.id)
              },
              icon: 'seasonal-icon'
            },
            {
              name: 'HiddenByFilter',
              filter: {
                ids: filteredOutLocations
              },
              visible: false
            }
          ]}
          showFilteredOutLocationOnMap={this.state.showFilteredOutLocationOnMap}
          initialZoom={6}
          initialCenter={[-73.949997, 40.650002]}
          iconSize={1.4}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
          textSize={16}
          textColor="#ffffff"
          mapPadding={150}
          maxZoom={14}
          zoomToFeatureSpeed={2}
          onClickFeature={this.onClickFeature}
          onLoad={() => setTimeout(() => locationsMapHasLoaded(), 0)}
          featureIdZoomTo={selectedLocation}
        />
        <div className="absolute t0 l0 flex p3">
          <Button
            className="mr2 flex flex-wrap items-center drop-shadow"
            color={locationFilters.length ? 'white-denim' : 'madison-blue'}
            variant="primary-small"
            label="All"
            onClick={actions.clearLocationFilters}
          />
          {states.map(filter => {
            const filterIsActive = locationFilters.some(
              activeFilter =>
                activeFilter.key === filter.key &&
                activeFilter.value === filter.value
            );

            return (
              <Button
                className="mr2 flex items-center drop-shadow mb2"
                color={filterIsActive ? 'madison-blue' : 'white-denim'}
                variant="primary-small"
                key={filter.value}
                label={filter.label}
                onClick={() => this.handleRegionClick(filter, filterIsActive)}
              />
            );
          })}
        </div>
        <div className="absolute b0 l0 flex p3">
          {LocationsMapKey.SEASONAL_FILTERS.map(filter => (
            <Button
              variant="primary-small"
              className={cx(
                'mr3 flex items-center justify-center pl1 pr2 text-dark-gray',
                {
                  [styles['LocationsMap__seasonal-button--selected']]:
                    filter.value === this.state.seasonalIsdisabled
                }
              )}
              key={filter.value}
              onClick={() => this.handleSeasonalClick(filter)}
            >
              <div
                className={cx(
                  styles['LocationsMap__circle-icon'],
                  'circle bg-peach mr1 flex items-center justify-center',
                  { 'bg-bright-turquoise': filter.value }
                )}
              >
                <p className="text-white">
                  {filter.value
                    ? locationCount.seasonal
                    : locationCount.allYear}
                </p>
              </div>
              <span>{filter.label}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }
}

LocationsMap.propTypes = {
  actions: PropTypes.shape({
    selectLocation: PropTypes.func,
    clearLocationSelection: PropTypes.func,
    clearLocationFilters: PropTypes.func,
    addLocationFilter: PropTypes.func,
    removeLocationFilter: PropTypes.func
  }),
  locationGeoJSON: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object)
  }),
  locations: PropTypes.arrayOf(locationModel.propTypes),
  locationFilters: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    })
  ),
  selectedLocation: PropTypes.string,
  states: PropTypes.array
};

LocationsMap.defaultProps = {
  actions: {
    selectLocation: () => {},
    clearLocationSelection: () => {},
    clearLocationFilters: () => {},
    addLocationFilter: () => {},
    removeLocationFilter: () => {}
  },
  locationGeoJSON: {},
  locations: [],
  locationFilters: [],
  states: []
};

export default LocationsMap;

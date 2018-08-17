import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import get from 'utils/get';
import locationModel from 'models/locationModel';

import LocationsMapFilters from 'constants/LocationsMapFilters';
import LocationsMapKey from 'constants/LocationsMapKey';

import { Image, Button } from 'components/base';
import MapboxMap from 'components/MapboxMap';
import styles from './LocationsMap.scss';

const LocationsMap = props => {
  const {
    filteredOutLocations,
    selectedLocation,
    locationFilters,
    locations,
    locationGeoJSON,
    actions,
    alertIsActive
  } = props;

  const onClickFeature = feature => {
    const featureLocationId = get(feature, 'properties.id', '');

    featureLocationId === selectedLocation
      ? actions.clearLocationSelection()
      : actions.selectLocation(featureLocationId);
  };
  const LocationsMapClasses = cx(styles['LocationsMap'], 'relative', {
    [styles['LocationsMap--with-alert']]: alertIsActive
  });

  return (
    <div className={LocationsMapClasses}>
      <MapboxMap
        className="z-0"
        featureCollection={locationGeoJSON}
        defaultIcon="year-round-icon-color"
        styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
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
            icon: 'seasonal-icon-color'
          },
          {
            name: 'HiddenByFilter',
            filter: {
              ids: filteredOutLocations
            },
            visible: false
          }
        ]}
        iconSize={1.4}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        textSize={16}
        textColor="#ffffff"
        mapPadding={150}
        maxZoom={18}
        onClickFeature={onClickFeature}
        featureIdZoomTo={selectedLocation}
      />
      <div className="absolute t0 l0 flex p3">
        <Button
          className="mr2 flex items-center drop-shadow"
          color={locationFilters.length ? 'white-denim' : 'madison-blue'}
          variant="primary-small"
          label="All"
          onClick={actions.clearLocationFilters}
        />
        {Object.values(LocationsMapFilters.STATE_FILTERS).map(filter => {
          const filterIsActive = locationFilters.some(
            activeFilter =>
              activeFilter.key === filter.key &&
              activeFilter.value === filter.value
          );

          return (
            <Button
              className="mr2 flex items-center drop-shadow"
              color={filterIsActive ? 'madison-blue' : 'white-denim'}
              variant="primary-small"
              key={filter.value}
              label={filter.label}
              onClick={
                filterIsActive
                  ? () =>
                      actions.removeLocationFilter({
                        key: filter.key,
                        value: filter.value
                      })
                  : () =>
                      actions.addLocationFilter({
                        key: filter.key,
                        value: filter.value
                      })
              }
            />
          );
        })}
      </div>
      <div className="absolute b0 l0 flex p3">
        {LocationsMapKey.SEASONAL_FILTERS.map(filter => (
          <div
            className={cx(
              styles['LocationsMap__map-key-item'],
              'mr3 flex items-center justify-center pl1 pr2 text-dark-gray drop-shadow bg-white bold'
            )}
            key={filter.value}
          >
            <Image src={filter.icon} className="mr2" />
            <span>{filter.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

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
      value: PropTypes.string
    })
  ),
  selectedLocation: PropTypes.string
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
  locationFilters: []
};

export default LocationsMap;

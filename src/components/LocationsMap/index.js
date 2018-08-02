import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import LocationsMapFilters from 'constants/LocationsMapFilters';
import LocationsMapKey from 'constants/LocationsMapKey';

import { Image, Button } from 'components/base';
import MapboxMap from 'components/MapboxMap';
import styles from './LocationsMap.scss';

const LocationsMap = props => {
  const { filteredOutLocations, locationFilters, actions } = props;

  return (
    <div className={cx(styles['LocationsMap'], 'relative')}>
      <MapboxMap
        className="z-0"
        featureCollection={props.locationGeoJSON}
        defaultIcon="year-round-icon"
        styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
        collections={[
          {
            name: 'Selected',
            filter: {
              ids: []
            },
            icon: 'selected-location-icon'
          },
          {
            name: 'SeasonalLocations',
            filter: {
              ids: props.locations
                .filter(location => location.seasonal)
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
        iconSize={1.4}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
        textSize={16}
        textColor="#ffffff"
        mapPadding={150}
      />
      <div className="absolute t0 l0 flex p3">
        <Button
          className="mr2 flex items-center drop-shadow"
          color={locationFilters.length ? 'white-denim' : 'madison-blue'}
          variant="primary-small"
          label="All"
          onClick={actions.clearLocationFilters}
        />
        {LocationsMapFilters.STATE_FILTERS.map(filter => {
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
  locationGeoJSON: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object)
  })
};

export default LocationsMap;

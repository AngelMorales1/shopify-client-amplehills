import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import getLocationsResults from 'utils/getLocationsResults';
import getDistanceBetweenLocations from 'utils/getDistanceBetweenLocations';
import locationModel from 'models/locationModel';

import { Image } from 'components/base';
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
    const sortedLocations = this.state.sortedLocations;

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
            <div className="w100">
              <div className="mb2 center">
                <span className="bold">
                  {getLocationsResults(sortedLocations.length)}
                </span>
              </div>
              <div className="flex flex-column items-center">
                {sortedLocations.map(location => {
                  const locationOpenHours = location.currentOpenHours;
                  const imageUrl = get(location, 'image.fields.file.url');

                  return (
                    <div
                      key={location.id}
                      className={cx(
                        styles['LocationsCards__card-container'],
                        'bg-white my2 flex flex-column justify-between relative w100'
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
                          'z-1 absolute flex flex-column items-center justify-center'
                        )}
                      >
                        <Image
                          className={cx(
                            styles['LocationsCards__card-seasonal-image'],
                            'z-overlay'
                          )}
                          src={get(
                            location,
                            'seasonalImage.fields.file.url',
                            ''
                          )}
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
                              styles[
                                'LocationsCards__card-seasonal-circle-text'
                              ],
                              'text-white small bold'
                            )}
                          >
                            {location.seasonal ? 'S' : 'YR'}
                          </span>
                        </div>
                      </div>
                      <div
                        style={
                          imageUrl
                            ? {
                                background: `url(${imageUrl}) no-repeat center`,
                                backgroundSize: 'cover'
                              }
                            : null
                        }
                        className={cx(styles['LocationsCards__card-image'], {
                          'bg-denim': !imageUrl
                        })}
                      />
                      <div
                        className={cx(
                          styles['LocationsCards__card-drip'],
                          'p3'
                        )}
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
                            {locationOpenHours.length ? (
                              <div className="flex flex-column">
                                <span className="block-subheadline bold">
                                  Open today
                                </span>
                                <span className={cx('small')}>
                                  {location[locationOpenHours]}
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
  locations: PropTypes.arrayOf(locationModel.propTypes)
};

LocationsCards.defaultProps = {
  locations: []
};

export default LocationsCards;

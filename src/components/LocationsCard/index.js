import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import moment from 'moment';

import { Image } from 'components/base';
import styles from './LocationsCard.scss';

class LocationsCard extends Component {
  state = { storeDistance: {} };

  componentDidMount = () => {
    this.props.locations.map(location => {
      return this.getDistanceToStore(location.title, location.location);
    });
  };

  getTodayOpenHours = location => {
    const currentDay = moment()
      .format('dddd')
      .toLowerCase();

    const todayOpenHours = Object.keys(location).filter(
      field => field === currentDay
    );

    return todayOpenHours;
  };

  getMilesFromcoordinate = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;

    return dist;
  };

  getDistanceToStore = (storeName, storeLocation) => {
    if ('geolocation' in window.navigator) {
      new Promise((resolve, reject) => {
        window.navigator.geolocation.getCurrentPosition(position => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
        });
      }).then(currentLocation => {
        const distance = this.getMilesFromcoordinate(
          storeLocation.lat,
          storeLocation.lon,
          currentLocation.lat,
          currentLocation.lon
        );
        const rouded = Math.round(distance * 10) / 10;

        this.setState(prevState => ({
          storeDistance: {
            ...prevState.storeDistance,
            [storeName]: rouded
          }
        }));
      });
    } else {
      return 'location not available';
    }
  };

  render() {
    const locations = this.props.locations;

    return (
      <div
        className={cx(styles['LocationsCard'], 'overflow-scroll bg-goldenrod')}
      >
        <div className="mt3 mb4 col-11 md-col-10 mx-auto">
          {locations.map(location => {
            const locationOpenHours = this.getTodayOpenHours(location);
            const imageUrl = get(location, 'image.fields.file.url');
            const seasonalBackground = get(location, 'seasonal', true)
              ? 'bg-pastel-pink'
              : 'bg-pastel-blue';

            return (
              <div
                key={location.id}
                className={cx(
                  styles['LocationsCard__card-container'],
                  'bg-white my3 flex flex-column justify-between relative'
                )}
              >
                <div
                  className={cx(
                    styles['LocationsCard__card-tag'],
                    'bg-peach bold text-white absolute m3'
                  )}
                >
                  {this.state.storeDistance[location.title] ? (
                    <span
                      className={cx(
                        styles['LocationsCard__card-text'],
                        'uppercase info-text-big'
                      )}
                    >
                      {this.state.storeDistance[location.title]} miles away
                    </span>
                  ) : (
                    <span className={cx('info-text-big flex flex-row')}>
                      <p
                        className={cx(
                          styles['dot'],
                          styles['one'],
                          'info-text-big'
                        )}
                      >
                        ·
                      </p>
                      <p
                        className={cx(
                          styles['dot'],
                          styles['two'],
                          'info-text-big ml1'
                        )}
                      >
                        ·
                      </p>
                      <p
                        className={cx(
                          styles['dot'],
                          styles['three'],
                          'info-text-big ml1'
                        )}
                      >
                        ·
                      </p>
                    </span>
                  )}
                </div>
                <div
                  className={cx(
                    styles['LocationsCard__card-seasonal'],
                    'z-1 absolute flex flex-column items-center justify-center'
                  )}
                >
                  <Image
                    className={cx(
                      styles['LocationsCard__card-seasonal-image'],
                      'z-overlay'
                    )}
                    src={get(location, 'seasonalImage.fields.file.url', '')}
                  />
                  <div
                    className={cx(
                      styles['LocationsCard__card-seasonal-circle'],
                      seasonalBackground,
                      'circle flex flex-column items-center justify-center'
                    )}
                  >
                    <span
                      className={cx(
                        styles['LocationsCard__card-seasonal-circle-text'],
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
                  className={cx(styles['LocationsCard__card-image'], {
                    'bg-denim': !imageUrl
                  })}
                />
                <div className={cx(styles['LocationsCard__card-drip'], 'p3')}>
                  <h2 className="big carter mb3">{location.title}</h2>
                  <div>
                    <div className="flex flex-column justify-between">
                      <span className="small">{location.address1}</span>
                      <span
                        className={cx(
                          styles['LocationsCard__card-text'],
                          'small'
                        )}
                      >{`${location.city}, ${location.state} ${
                        location.zip
                      }`}</span>
                      <span
                        className={cx(
                          styles['LocationsCard__card-text'],
                          'small'
                        )}
                      >
                        {location.phone}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-row justify-between items-center mt2">
                      {locationOpenHours.length ? (
                        <div className="flex flex-column">
                          <span className="block-subheadline bold">
                            Open today
                          </span>
                          <span className={cx('small')}>
                            {location[locationOpenHours[0]]}
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
                            styles['LocationsCard__card-tag'],
                            'uppercase bold bg-madison-blue inline-block'
                          )}
                        >
                          <span className="info-text-big text-white">
                            Delivery
                          </span>
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
    );
  }
}

LocationsCard.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      adddress1: PropTypes.string,
      city: PropTypes.string,
      delivery: PropTypes.bool,
      id: PropTypes.string,
      phone: PropTypes.string,
      region: PropTypes.string,
      seasonal: PropTypes.bool,
      state: PropTypes.string,
      title: PropTypes.string,
      zip: PropTypes.string,
      image: PropTypes.shape({
        fileds: PropTypes.shape({
          title: PropTypes.string,
          file: PropTypes.shape({
            url: PropTypes.string
          })
        })
      }),
      location: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number
      }),
      seasonalImage: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string,
          file: PropTypes.shape({
            url: PropTypes.string
          })
        })
      }),
      monday: PropTypes.string,
      tuesday: PropTypes.string,
      wednesday: PropTypes.string,
      thursday: PropTypes.string,
      friday: PropTypes.string,
      saturday: PropTypes.string,
      sunday: PropTypes.string
    })
  )
};

LocationsCard.defaultProps = {
  locations: [
    {
      adddress1: '',
      city: '',
      delivery: false,
      id: '',
      phone: '',
      region: '',
      seasonal: true,
      state: '',
      title: '',
      zip: '',
      image: {
        fileds: {
          title: '',
          file: {
            url: ''
          }
        }
      },
      location: {
        lat: 0,
        lon: 0
      },
      seasonalImage: {
        fields: {
          title: '',
          file: {
            url: ''
          }
        }
      },
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  ]
};

export default LocationsCard;

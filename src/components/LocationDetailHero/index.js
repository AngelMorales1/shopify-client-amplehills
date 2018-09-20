import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import getLocationCity from 'utils/getLocationCity';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import eventModel from 'models/eventModel';
import locationModel from 'models/locationModel';

import styles from './LocationDetailHero.scss';
import { Button } from 'components/base';
import MapboxMap from 'components/MapboxMap';

class LocationDetailHero extends PureComponent {
  render() {
    const { location, locationGeoJSON, events } = this.props;

    locationGeoJSON.features = [
      get(locationGeoJSON, 'features', []).find(
        feature => get(feature, 'properties.id', '') === location.id
      )
    ];

    const eventId = get(
      events.find(event => event.locationId === location.id),
      'contentfulId',
      ''
    );

    return (
      <div
        className={cx(
          styles['LocationDetailHero'],
          'flex bg-bees-wax relative'
        )}
      >
        <div
          className="col col-12 md-col-6 square"
          style={{
            background: `url(${contentfulImgUtil(
              get(location, 'image', ''),
              '1600'
            )}) no-repeat center`,
            backgroundSize: 'cover'
          }}
        />
        <div className="flex flex-column items-center justify-center col col-12 md-col-6 py4 px3">
          <div
            className={cx(
              'col-12 md-col-9 mx-auto flex-column justify-around items-center',
              {
                [styles[
                  'LocationDetailHero__content-container-with-subnav'
                ]]: get(location, 'contentBlocks', []).length
              }
            )}
          >
            <h2 className="block-headline my4">{location.title}</h2>
            <div
              className={cx(
                styles['LocationDetailHero__content-detail-container'],
                'flex'
              )}
            >
              <div className="col-12 md-col-6 mb4 flex flex-row justify-between items-center">
                <div className="mr1">
                  <p className="uppercase text-peach bold copy mb1">info</p>
                  <p className="block-subheadline">{location.address1}</p>
                  <p className="block-subheadline">
                    {getLocationCity(location)}
                  </p>
                  {location.phone ? (
                    <p className="block-subheadline">{location.phone}</p>
                  ) : null}
                </div>
                <div
                  className={cx(
                    styles['LocationDetailHero__map'],
                    'circle z-1 bg-white'
                  )}
                >
                  <MapboxMap
                    className="z-0 wh100"
                    featureCollection={locationGeoJSON}
                    defaultIcon="year-round-icon"
                    styleUrl="mapbox://styles/joshiefishbein/cjjyuj8fq0hrj2ro2j8066e4q"
                    iconSize={0.8}
                    mapPadding={10}
                    maxZoom={15}
                    collections={[
                      {
                        name: 'SeasonalLocations',
                        filter: {
                          ids: location.seasonal ? [location.id] : []
                        },
                        icon: 'seasonal-icon'
                      }
                    ]}
                  />
                </div>
              </div>
              <div className="col-12 md-col-6 mb4">
                <p className="uppercase text-peach bold copy mb1">hours</p>
                {get(location, 'sortedHours', []).map((hour, i) => {
                  const key = Object.keys(hour);
                  return (
                    <div key={key} className="flex flex-row justify-between">
                      <p className="bold block-subheadline mr1">{key}</p>
                      <p className="block-subheadline">{hour[key]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['LocationDetailHero__button-container'],
              'flex flex-wrap justify-center col-12 md-col-11 mx-auto'
            )}
          >
            {eventId ? (
              <div className={cx(styles['LocationDetailHero__button'], 'm1')}>
                <Button
                  className="uppercase justify-center"
                  color="madison-blue"
                  variant="primary-small"
                  label="book a class"
                  to={`/events/${eventId}`}
                />
              </div>
            ) : null}
            <div className={cx(styles['LocationDetailHero__button'], 'm1')}>
              <Button
                className="uppercase justify-center"
                color="madison-blue"
                variant="primary-small"
                label="book a party"
                to="/contact"
              />
            </div>
            <div className={cx(styles['LocationDetailHero__button'], 'm1')}>
              <Button
                className="uppercase justify-center"
                color="madison-blue"
                variant="primary-small"
                label="order a cake"
                to="/contact"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LocationDetailHero.propTypes = {
  location: locationModel.propTypes,
  locationGeoJSON: PropTypes.shape({
    type: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.object)
  }),
  events: PropTypes.arrayOf(eventModel.propTypes)
};

LocationDetailHero.defaultProps = {
  location: locationModel.default,
  locationGeoJSON: {},
  events: [eventModel.default]
};

export default LocationDetailHero;

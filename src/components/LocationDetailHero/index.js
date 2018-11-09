import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import getLocationCity from 'utils/getLocationCity';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import marked from 'marked';
import locationModel from 'models/locationModel';

import styles from './LocationDetailHero.scss';
import { Button, FormFlash } from 'components/base';
import MapboxMap from 'components/MapboxMap';

class LocationDetailHero extends Component {
  render() {
    const { location, locationGeoJSON, events, z } = this.props;
    const event = get(
      Object.values(events).find(
        event => event.locationId === location.id && event.id
      ),
      'handle',
      ''
    );
    const closeLocationForTheSeason = get(
      location,
      'closeLocationForTheSeason',
      false
    );
    const partyIsAvailable = get(location, 'partyAvailable', false);

    return (
      <div
        style={{ zIndex: z }}
        className={cx(
          styles['LocationDetailHero'],
          'flex bg-light-yellow relative'
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
            <h2 className="block-headline mt4">{location.title}</h2>
            {location.text ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(location.text)
                }}
                className="markdown-block mt3"
              />
            ) : null}
            <div
              className={cx(
                styles['LocationDetailHero__content-detail-container'],
                'flex items-start mt4'
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
                    className="z-0 wh100 circle"
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
                      },
                      {
                        name: 'unselectedLocation',
                        filter: {
                          ids: get(locationGeoJSON, 'features', []).reduce(
                            (filteredIds, feature) => {
                              if (
                                get(feature, 'properties.id', '') !==
                                location.id
                              ) {
                                filteredIds.push(
                                  get(feature, 'properties.id', '')
                                );
                              }
                              return filteredIds;
                            },
                            []
                          )
                        },
                        visible: false
                      }
                    ]}
                  />
                </div>
              </div>
              <div className="col-12 md-col-6 mb4">
                <p className="uppercase text-peach bold copy mb1">hours</p>
                {closeLocationForTheSeason ? (
                  <FormFlash
                    className="mb1 center"
                    error={true}
                    message="Closed for the Season"
                  />
                ) : null}
                {get(location, 'sortedHours', []).map((hour, i) => {
                  const key = Object.keys(hour);
                  const dateIsClosed = hour[key] === 'close';

                  return !dateIsClosed ? (
                    <div key={key} className="flex flex-row justify-between">
                      <p className="bold block-subheadline mr1">{key}</p>
                      <p className="block-subheadline">{hour[key]}</p>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['LocationDetailHero__button-container'],
              'flex flex-wrap col-12 md-col-11 mx-auto',
              {
                [styles[
                  'LocationDetailHero__button-container--with-one-button'
                ]]:
                  !event || !partyIsAvailable
              }
            )}
          >
            {event ? (
              <div
                className={cx(
                  styles['LocationDetailHero__button-container'],
                  'm1'
                )}
              >
                <Button
                  className={cx(
                    styles['LocationDetailHero__button'],
                    'uppercase justify-center'
                  )}
                  color="madison-blue"
                  variant="primary-small"
                  label="book a class"
                  to={`/events/${event}`}
                />
              </div>
            ) : null}
            {partyIsAvailable ? (
              <div
                className={cx(
                  styles['LocationDetailHero__button-container'],
                  'm1'
                )}
              >
                <Button
                  className={cx(
                    styles['LocationDetailHero__button'],
                    'uppercase justify-center'
                  )}
                  color="madison-blue"
                  variant="primary-small"
                  label="book a party"
                  to="/party-request-form"
                />
              </div>
            ) : null}
            <div
              className={cx(
                styles['LocationDetailHero__button-container'],
                'm1'
              )}
            >
              <Button
                className={cx(
                  styles['LocationDetailHero__button'],
                  'uppercase justify-center'
                )}
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
  events: PropTypes.array
};

LocationDetailHero.defaultProps = {
  location: locationModel.default,
  locationGeoJSON: {},
  events: []
};

export default LocationDetailHero;

import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import cx from 'classnames';
import moment from 'moment';
import marked from 'marked';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Image, Button } from 'components/base';
import styles from './EventDetailHero.scss';
import imageModel from 'models/imageModel';

const EventDetailHero = ({ event }) => {
  return (
    <div className={cx(styles['EventDetailHero'], 'flex flex-column mb4')}>
      <div className="flex flex-column justify-center items-center w100 mt4">
        <h2 className="block-headline">{event.title}</h2>
        <div className="mt3">
          <Button
            className={cx(styles['EventDetailHero__button'])}
            variant="primary-small"
            color="clear-madison-blue-border"
            label={'Share'.toUpperCase()}
          />
        </div>
      </div>
      <div
        className={cx(styles['EventDetailHero__content-container'], 'flex mt4')}
      >
        <div
          className={cx(styles['EventDetailHero__image'], 'col-12 md-col-6')}
        >
          <div
            className="aspect-4-3 w100"
            style={{
              background: `url(${contentfulImgUtil(
                event.image,
                '1600'
              )}) no-repeat center`,
              backgroundSize: 'cover'
            }}
          />
        </div>
        <div
          className={cx(
            styles['EventDetailHero__text-container'],
            'col-12 md-col-6 flex flex-column items-center'
          )}
        >
          <div className="text-container-width">
            {event.datesAndTimes.length > 1 ? (
              <div>dates list</div>
            ) : (
              <div>
                <div>
                  <p className="copy">Date</p>
                  <p
                    className={cx(
                      styles['EventDetailHero__content-text'],
                      'mt1'
                    )}
                  >
                    {moment(get(event, 'datesAndTimes[0].Date', '')).format(
                      'dddd, MMMM Do'
                    )}
                  </p>
                </div>
                <div>
                  <p className="copy mt3">Time</p>
                  <p
                    className={cx(
                      styles['EventDetailHero__content-text'],
                      'mt1'
                    )}
                  >
                    {get(event, 'datesAndTimes[0].Time', '')}
                  </p>
                </div>
                <div
                  className={cx(
                    styles['EventDetailHero__location-container'],
                    'flex mt3'
                  )}
                >
                  <div>
                    <p className="copy">Location</p>
                    <p
                      className={cx(
                        styles['EventDetailHero__content-text'],
                        'mt1'
                      )}
                    >
                      {event.locationTitle}
                    </p>
                  </div>
                  <div>
                    <Button
                      className={cx(styles['EventDetailHero__map-button'])}
                      variant="primary-small"
                      color="clear-madison-blue-border"
                      label="Map"
                    />
                  </div>
                </div>
              </div>
            )}
            <Button
              className={cx(styles['EventDetailHero__action-button'], 'mt4')}
              color="peach"
              label="Call to Action"
            />
            <div
              dangerouslySetInnerHTML={{ __html: marked(event.text) }}
              className={cx(styles['EventDetailHero__markdown'], 'mt4')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetailHero.propTypes = {};

EventDetailHero.defaultProps = {};

export default EventDetailHero;

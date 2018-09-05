import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import moment from 'moment';
import eventModel from 'models/eventModel';

import styles from './EventCard.scss';
import { Image, Button } from 'components/base';

const EventCard = ({ event, active }) => {
  const getTimeFormat = time => {
    if (time && time.length) {
      return get(fields, 'time', '')
        .replace(/\s+/g, '')
        .split('-')
        .map((time, i) => {
          let hourAndMin = time.replace(/\s+/g, '').split(':');
          const isExactTime = hourAndMin[1].slice(0, 2) === '00';

          if (isExactTime) {
            if (i === 0) {
              return hourAndMin[0];
            } else {
              const getAmPm = hourAndMin[1].slice(-2);
              return `${hourAndMin[0]}${getAmPm}`;
            }
          } else {
            if (i === 0) {
              const removeAmPm = hourAndMin[1].slice(0, -2);
              return `${hourAndMin[0]}:${removeAmPm}`;
            } else {
              return `${hourAndMin[0]}:${hourAndMin[1]}`;
            }
          }
        })
        .join('-');
    }
  };
  const fields = get(event, 'fields', {});
  const image = get(fields, 'image.fields.file.url', '');
  const title = get(fields, 'title', '');
  const date = moment(get(fields, 'date', '')).format('MMMM D YYYY');
  const time = getTimeFormat(get(fields, 'time', ''));
  const location = get(fields, 'location.fields.title', '');
  const eventType = get(fields, 'eventType', '');
  const eventTypeIsClass = eventType === 'Ice Cream Classes';
  const label = eventTypeIsClass ? 'More Info' : 'RSVP';

  return (
    <div
      className={cx(
        styles['EventCard'],
        'transition-slide-up-large bg-white mb3 flex col-12 md-col-7',
        { [styles['EventCard--active']]: active }
      )}
    >
      <div
        className={cx(styles['EventCard__image'], 'col-12 md-col-6')}
        style={{
          background: `url(${contentfulImgUtil(
            image,
            '900'
          )}) no-repeat center`,
          backgroundSize: 'cover'
        }}
      />
      <div
        className={cx(
          styles['EventCard__text-container'],
          'flex flex-column justify-between col-12 md-col-6'
        )}
      >
        <div>
          {!eventTypeIsClass ? (
            <p className="tout xs-hide sm-hide mb2">{`${date}, ${time} at ${location}`}</p>
          ) : null}
          <h2 className={cx(styles['EventCard__title'])}>{title}</h2>
          {eventTypeIsClass ? (
            <p className="tout mt2 mb1">
              ////////date and time should be render here ////////
            </p>
          ) : null}
        </div>
        <div>
          <Button
            className={cx(styles['EventCard__button'])}
            color="peach"
            label={label}
          />
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  active: PropTypes.bool,
  event: eventModel.propTypes
};

EventCard.defaultProps = {
  active: false,
  event: eventModel.default
};

export default EventCard;

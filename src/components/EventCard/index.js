import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import get from 'utils/get';
import getShortTimeFormat from 'utils/getShortTimeFormat';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import moment from 'moment';
import eventModel from 'models/eventModel';

import styles from './EventCard.scss';
import { Button } from 'components/base';

const EventCard = ({ event, active }) => {
  const datesAndTimes = event.datesAndTimes;
  const dates = datesAndTimes.map(dateAndTime => {
    return moment(get(dateAndTime, 'Date', '')).format('MMMM D YYYY');
  });
  const times = datesAndTimes.map(dateAndTime => {
    return getShortTimeFormat(get(dateAndTime, 'Time', ''));
  });
  const eventTypeIsClass = event.eventType === 'Ice Cream Classes';
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
            event.image,
            '900'
          )}) no-repeat center`,
          backgroundSize: 'cover'
        }}
      />
      <div
        className={cx(
          styles['EventCard__text-container'],
          'col-12 md-col-6 flex flex-column justify-between'
        )}
      >
        <div>
          {datesAndTimes.length === 1 ? (
            <p className={cx(styles['EventCard__date-text'], 'mb2')}>{`${
              dates[0]
            }, ${times[0]} at ${event.locationTitle}`}</p>
          ) : null}
          <h2 className={cx(styles['EventCard__title'])}>{event.title}</h2>
          {datesAndTimes.length > 1 ? (
            <div className="mt2">
              {dates.map((date, i) => (
                <p
                  key={`${date}-${i}`}
                  className={cx(styles['EventCard__text'])}
                >{`${moment(date).format('MM/DD/YY')} - ${times[i]}`}</p>
              ))}
            </div>
          ) : null}
          {event.blockCardText ? (
            <p
              dangerouslySetInnerHTML={{
                __html: marked(event.blockCardText)
              }}
              className={cx(styles['EventCard__text'], 'mt1 mb3')}
            />
          ) : null}
        </div>
        <div>
          <Button
            className="inline-flex"
            color="peach"
            label={label}
            to={`/events/${event.id}`}
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

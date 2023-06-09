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
import { Button, PortableText } from 'components/base';

const EventCard = ({ event, active }) => {
  const datesAndTimes = event.datesAndTimes;
  const dates = datesAndTimes.map(dateAndTime => {
    const getDateFormat = Date.parse(get(dateAndTime, 'date', ''));

    return !isNaN(getDateFormat)
      ? `${moment(getDateFormat).format('MMMM D YYYY')},`
      : '';
  });
  const times = datesAndTimes.map(dateAndTime => {
    return getShortTimeFormat(get(dateAndTime, 'time', '')) || '';
  });

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
          background: `url(${event.image.src}?w=900) no-repeat center`,
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
            } ${times[0]} at ${event.locationTitle}`}</p>
          ) : null}
          <h2 className={cx(styles['EventCard__title'])}>{event.title}</h2>
          {datesAndTimes.length > 1 ? (
            <div className="mt2">
              {dates.map((date, i) => {
                const getMultipleDateFormat = Date.parse(date);
                const renderDate = !isNaN(getMultipleDateFormat)
                  ? `${moment(getMultipleDateFormat).format('MM/DD/YY')} -`
                  : '';

                return (
                  <p
                    key={date}
                    className={cx(styles['EventCard__text'])}
                  >{`${renderDate} ${times[i]}`}</p>
                );
              })}
            </div>
          ) : null}
          {event.blockCardText ? (
            <p className={cx(styles['EventCard__text'], 'mt1')}>
              <PortableText blocks={event.blockCardText} />
            </p>
          ) : null}
        </div>
        <div>
          <Button
            className="inline-flex mt3"
            variant="primary-responsive"
            color="peach"
            label={event.blockCardButtonLabel || 'More Info'}
            to={`/events/${event.handle}`}
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

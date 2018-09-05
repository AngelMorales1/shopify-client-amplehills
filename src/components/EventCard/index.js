import React from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';
import moment from 'moment';

import styles from './EventCard.scss';
import { Image, Button } from 'components/base';

const EventCard = ({ event }) => {
  console.log(event);
  const fields = get(event, 'fields', {});
  const image = get(fields, 'image.fields.file.url', '');
  const title = get(fields, 'title', '');
  const date = moment(get(fields, 'date', '')).format('MMMM D YYYY');
  const time = get(fields, 'time', '');
  const location = get(fields, 'location.fields.title', '');

  return (
    <div
      className={cx(styles['EventCard'], 'bg-white mb3 flex col-12 md-col-7')}
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
      <div className="flex flex-column justify-between col-12 md-col-6 p4">
        <div>
          <span className="tout">{`${date}, ${time} at ${location}`}</span>
          <h2 className={cx(styles['EventCard__title'], 'mt2')}>{title}</h2>
        </div>
        <Button color="peach" label="RSVP" />
      </div>
    </div>
  );
};

EventCard.propTypes = {};

EventCard.defaultProps = {};

export default EventCard;

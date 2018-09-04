import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';

import cx from 'classnames';
import get from 'utils/get';

import styles from './EventsBlock.scss';

const EventsBlock = props => {
  const { z, block } = props;
  const fields = get(block, 'fields', {});
  const isDripOn = get(fields, 'drip', false);
  const colorClass = `EventsBlock--${get(fields, 'backgroundColor', 'white')}`;
  const titleOnLeft = get(fields, 'titleLeft', false);
  const title = get(fields, 'title', '');

  return (
    <div
      style={{ zIndex: z }}
      className={cx(styles[colorClass], 'flex justify-center', {
        drip: isDripOn
      })}
    />
  );
};

EventsBlock.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroudColor: PropTypes.string,
      title: PropTypes.string,
      drip: PropTypes.bool
    })
  })
};

EventsBlock.defaultProps = {
  z: 0,
  block: {
    fields: {
      backgroudColor: 'white',
      title: '',
      drip: false
    }
  }
};

export default EventsBlock;

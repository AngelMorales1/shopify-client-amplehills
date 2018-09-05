import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import EventCard from 'components/EventCard';

import { Button } from 'components/base';
import styles from './EventsBlock.scss';

class EventsBlock extends Component {
  state = {};
  render() {
    const { z, block } = this.props;
    const fields = get(block, 'fields', {});
    const isDripOn = get(fields, 'drip', false);
    const colorClass = `EventsBlock--${get(
      fields,
      'backgroundColor',
      'white'
    )}`;
    const title = get(fields, 'title', '');
    const text = get(fields, 'text', '');
    const events = get(fields, 'events', []);
    let selectedEvents = events.length ? events : this.props.events;
    console.log(this.props);
    return (
      <div
        style={{ zIndex: z }}
        className={cx(
          styles[colorClass],
          'flex flex-column items-center justify-center',
          {
            drip: isDripOn
          }
        )}
      >
        <div className="px2 text-container-width center">
          <h2 className="block-headline mt4 mb3">{title}</h2>
          <span className="block-subheadline">{text}</span>
        </div>
        <div className="w100 flex flex-column items-center mt3 px2">
          {selectedEvents.map((event, i) => (
            <EventCard key={get(event, 'sys.id') + i} event={event} />
          ))}
        </div>
      </div>
    );
  }
}

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

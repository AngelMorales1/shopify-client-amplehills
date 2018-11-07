import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import EventCard from 'components/EventCard';
import EventTypes from 'constants/EventTypes';

import { Button } from 'components/base';
import styles from './EventsBlock.scss';

class EventsBlock extends Component {
  state = {
    selectedEvents: [],
    buttonLabels: [],
    activeFilter: ''
  };

  componentDidMount() {
    const events = get(this, 'props.block.fields.events', {});
    const selectedEvents = Object.values(events).length
      ? this.getCustomEvents()
      : this.getAllEvents();

    const buttonLabels = this.getLocationButtonLabel(selectedEvents);

    this.setState({
      selectedEvents,
      buttonLabels,
      activeFilter: buttonLabels[0]
    });
  }

  filterIsActive = filter => {
    return this.state.activeFilter === filter;
  };

  cardIsActive = event => {
    const locationFilterButtonIsOn = get(
      this,
      'props.block.fields.locationFilterButton',
      false
    );

    if (locationFilterButtonIsOn) {
      const eventLocation = get(event, 'locationTitle', '');

      return this.state.activeFilter.split(':')[0] === eventLocation;
    }

    return true;
  };

  getLocationButtonLabel = selectedEvents => {
    const locationButtonLabel = selectedEvents.reduce((acc, cur) => {
      const location = get(cur, 'locationTitle', '');

      if (location) {
        acc[location] ? acc[location]++ : (acc[location] = 1);
      }

      return acc;
    }, {});

    return Object.keys(locationButtonLabel).map(
      key => `${key}: ${locationButtonLabel[key]}`
    );
  };

  getAllEvents = () => {
    const events = get(this, 'props.events', {});
    const allEvents = Object.values(events);
    const blockEventType = get(this, 'props.block.fields.eventType', '');

    return allEvents.filter(event => {
      const eventType = get(event, 'eventType', '');

      if (!blockEventType || blockEventType === EventTypes.ALL_EVENTS) {
        return event;
      }

      return eventType === blockEventType;
    });
  };

  getCustomEvents = () => {
    const events = get(this, 'props.events', {});
    const customEvents = get(this, 'props.block.fields.events', []);
    const allEvents = Object.values(events);

    return customEvents.map(customEvent => {
      const id = get(customEvent, 'sys.id', '');
      return allEvents.find(event => event.contentfulId === id);
    });
  };

  render() {
    const { z, block, setRef } = this.props;
    const { buttonLabels, selectedEvents } = this.state;
    const fields = get(block, 'fields', {});
    const isDripOn = get(fields, 'drip', false);
    const colorClass = `EventsBlock--${get(fields, 'backgroundColor', '')}`;
    const title = get(fields, 'title', '');
    const text = get(fields, 'text', '');
    const locationFilterButtonIsOn = get(fields, 'locationFilterButton', false);

    return (
      <div
        ref={refBlock => setRef(refBlock)}
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
          <div
            dangerouslySetInnerHTML={{
              __html: marked(text)
            }}
            className="markdown-block"
          />
        </div>
        {locationFilterButtonIsOn ? (
          <div
            className={cx(
              styles['EventsBlock__button-container'],
              'flex flex-wrap items-center justify-center mt3'
            )}
          >
            {buttonLabels.map((label, i) => {
              const color = this.filterIsActive(label)
                ? 'clear-madison-blue-border'
                : 'madison-blue';

              return (
                <Button
                  className="m1"
                  color={color}
                  variant="primary-small"
                  key={label}
                  label={label}
                  onClick={() =>
                    this.setState({
                      activeFilter: label
                    })
                  }
                />
              );
            })}
          </div>
        ) : null}
        <div className="w100 flex flex-column items-center my3 px2">
          {selectedEvents.map((event, i) => {
            return event ? (
              <EventCard
                active={this.cardIsActive(event)}
                key={get(event, 'contentfulId', i)}
                event={event}
              />
            ) : null;
          })}
        </div>
      </div>
    );
  }
}

EventsBlock.propTypes = {
  z: PropTypes.number,
  block: PropTypes.shape({
    fields: PropTypes.shape({
      backgroudColor: '',
      title: PropTypes.string,
      drip: PropTypes.bool,
      eventType: PropTypes.string,
      text: PropTypes.string,
      events: PropTypes.array,
      locationFilterButton: PropTypes.bool
    })
  }),
  events: PropTypes.array,
  setRef: PropTypes.func
};

EventsBlock.defaultProps = {
  z: 0,
  block: {
    fields: {
      backgroudColor: 'white',
      title: '',
      drip: false,
      eventType: '',
      text: '',
      events: [],
      locationFilterButton: false
    }
  },
  events: [],
  setRef: () => {}
};

export default EventsBlock;

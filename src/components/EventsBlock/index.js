import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import EventCard from 'components/EventCard';
import eventModel from 'models/eventModel';
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
    const selectedEvents = get(this, 'props.block.fields.events', []).length
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

      if (acc[location]) {
        acc[location]++;
      } else {
        acc[location] = 1;
      }

      return acc;
    }, {});

    return Object.keys(locationButtonLabel).map(
      key => `${key}: ${locationButtonLabel[key]}`
    );
  };

  getAllEvents = () => {
    const allEvents = get(this, 'props.events', []);
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
    const customEvents = get(this, 'props.block.fields.events', []);
    const allEvents = get(this, 'props.events', []);

    return customEvents.map(customEvent => {
      const id = get(customEvent, 'sys.id', '');
      return allEvents.find(event => event.id === id);
    });
  };

  render() {
    const { z, block, setRef } = this.props;
    const { buttonLabels, selectedEvents } = this.state;
    const fields = get(block, 'fields', {});
    const isDripOn = get(fields, 'drip', false);
    const colorClass = `EventsBlock--${get(
      fields,
      'backgroundColor',
      'white'
    )}`;
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
                  key={`${label}-${i}`}
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
            return (
              <EventCard
                active={this.cardIsActive(event)}
                key={`${get(event, 'id')}-${i}`}
                event={event}
              />
            );
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
  events: PropTypes.arrayOf(eventModel.propTypes),
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
  events: [eventModel.default],
  setRef: () => {}
};

export default EventsBlock;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';
import moment from 'moment';
import EventCard from 'components/EventCard';
import eventModel from 'models/eventModel';

import { Button } from 'components/base';
import styles from './EventsBlock.scss';

class EventsBlock extends Component {
  state = {
    activeFilter: ''
  };

  filterIsActive = (filter, index) => {
    return (
      this.state.activeFilter === filter || (!index && !this.state.activeFilter)
    );
  };

  cardIsActive = event => {
    const eventLocation = get(event, 'locationTitle', '');

    return this.state.activeFilter.split(':')[0] === eventLocation;
  };

  getLocationButtonLabel = selectedEvents => {
    const locationButtonLabel = selectedEvents.reduce((acc, cur) => {
      let location = get(cur, 'locationTitle', '');

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
    const filterButtonIsOn = get(fields, 'addFilterButton', false);
    const locationFilterButtonIsOn = get(fields, 'locationFilterButton', false);
    const blockEventType = get(fields, 'eventType', '');
    const allEvents = get(this.props, 'events', {});
    const customEvents = get(fields, 'events', []);
    let selectedEvents = customEvents.length
      ? customEvents.map(customEvent => {
          const id = get(customEvent, 'sys.id', '');
          return allEvents.find(event => event.id === id);
        })
      : allEvents.filter(event => {
          let eventType = get(event, 'eventType', '');

          if (!blockEventType || blockEventType === 'All Events') {
            return event;
          } else if (blockEventType === 'All Socials') {
            return eventType !== 'Ice Cream Classes';
          }

          return eventType === blockEventType;
        });
    let buttonLabels = this.getLocationButtonLabel(selectedEvents);

    locationFilterButtonIsOn && !this.state.activeFilter
      ? this.setState({ activeFilter: buttonLabels[0] })
      : null;

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
          <p
            dangerouslySetInnerHTML={{
              __html: marked(text)
            }}
            className="block-subheadline"
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
              const color = this.filterIsActive(label, i)
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
                active={
                  locationFilterButtonIsOn ? this.cardIsActive(event) : true
                }
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
  events: PropTypes.arrayOf(eventModel.propTypes)
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
  events: [eventModel.default]
};

export default EventsBlock;

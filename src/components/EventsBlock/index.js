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

  isActiveFilter = (filter, index) => {
    return (
      this.state.activeFilter === filter ||
      (!index &&
        !this.state.activeFilter &&
        this.setState({ activeFilter: filter }))
    );
  };

  isActiveCard = (filterByUpcomingOrPastIsOn, event) => {
    if (filterByUpcomingOrPastIsOn) {
      const today = moment(new Date()).format('X');
      const eventDate = moment(get(event, 'fields.date', '')).format('X');
      const eventInPast = today >= eventDate;
      const eventStatus = eventInPast ? 'Past' : 'Upcoming';

      return this.state.activeFilter === eventStatus;
    }

    const eventLocation = get(event, 'fields.location.fields.title', '');

    return this.state.activeFilter.slice(0, -3) === eventLocation;
  };

  getLocationButtonLabel = selectedEvents => {
    let locationButtonLabel = {};

    selectedEvents.forEach(event => {
      let location = get(event, 'fields.location.fields.title', '');

      locationButtonLabel[location]
        ? (locationButtonLabel[location] = ++locationButtonLabel[location])
        : (locationButtonLabel[location] = 1);
    });
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
    const filterByUpcomingOrPastIsOn = get(
      fields,
      'filterByUpcomingOrPast',
      true
    );
    const blockEventType = get(fields, 'eventType', '');
    const events = get(fields, 'events', []);
    let selectedEvents = events.length
      ? events
      : get(this.props, 'events', []).filter(event => {
          let eventType = get(event, 'fields.eventType', '');
          if (!blockEventType) {
            return event;
          }
          return eventType === blockEventType;
        });
    let buttonLabels = filterByUpcomingOrPastIsOn
      ? ['Upcoming', 'Past']
      : this.getLocationButtonLabel(selectedEvents);

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
        {filterButtonIsOn ? (
          <div
            className={cx(
              styles['EventsBlock__button-container'],
              'flex flex-wrap items-center justify-center mt3'
            )}
          >
            {buttonLabels.map((label, i) => {
              const color = this.isActiveFilter(label, i)
                ? 'clear-madison-blue-border'
                : 'madison-blue';

              return (
                <Button
                  className="m1"
                  color={color}
                  variant="primary-small"
                  key={label + i}
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
                  filterButtonIsOn
                    ? this.isActiveCard(filterByUpcomingOrPastIsOn, event)
                    : true
                }
                key={get(event, 'sys.id') + i}
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
      addFilterButton: PropTypes.bool,
      eventType: PropTypes.string,
      filterByUpcomingOrPastIsOn: PropTypes.bool,
      text: PropTypes.string,
      events: PropTypes.arrayOf(eventModel.propTypes)
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
      addFilterButton: false,
      eventType: '',
      filterByUpcomingOrPastIsOn: true,
      text: '',
      events: []
    }
  },
  events: [eventModel.default]
};

export default EventsBlock;

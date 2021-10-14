import React, { useState } from 'react';
import get from 'lodash/get';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { isAfter, isBefore, format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Image, Button } from 'components/base';
import styles from './EventsGrid.scss';

const defaultCategory = 'All';
const defaultLocation = 'Location';

const EventsGrid = ({ block, z, setRef, events }) => {
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const colorClass = `EventsGrid--${get(block, 'backgroundColor', 'white')}`;
  const [to, setTo] = useState(null);
  const [from, setFrom] = useState(null);
  const [toIsOpen, setToIsOpen] = useState(false);
  const [fromIsOpen, setFromIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);
  const [locationIsOpen, setLocationIsOpen] = useState(false);

  const toggleTo = () => {
    setToIsOpen(!toIsOpen);
    setFromIsOpen(false);
  };
  const toggleFrom = () => {
    setFromIsOpen(!fromIsOpen);
    setToIsOpen(false);
  };
  const toggleLocation = () => setLocationIsOpen(!locationIsOpen);

  const tileDisabledTo = ({ date }) => !!from && isAfter(date, from);
  const tileDisabledFrom = ({ date }) => !!to && isBefore(date, to);

  const categories = Object.values(events).reduce(
    (categories, event) => {
      // TO-DO: swap out Ice Cream Socials
      const category =
        event.eventType === 'Ice Cream Socials'
          ? 'Ample Hills Live'
          : event.eventType;

      return categories.includes(category)
        ? categories
        : [...categories, category];
    },
    [defaultCategory]
  );

  const locations = Object.values(events).reduce(
    (locations, event) => {
      const location = event.locationTitle;

      return locations.includes(location)
        ? locations
        : [...locations, location];
    },
    [defaultLocation]
  );

  const filteredEvents = Object.values(events).filter(event => {
    if (selectedCategory !== defaultCategory) {
      if (selectedCategory === 'Ample Hills Live') {
        if (event.eventType !== 'Ice Cream Socials') {
          return false;
        }
      } else {
        if (event.eventType !== selectedCategory) return false;
      }
    }

    if (
      selectedLocation !== defaultLocation &&
      selectedLocation !== event.locationTitle
    ) {
      return false;
    }

    if (!!to && !from) {
      const hasDateAfterTo = event.variants.some(variant =>
        isAfter(variant.datetime, to)
      );

      if (!hasDateAfterTo) return false;
    }

    if (!to && !!from) {
      const hasDateBeforeFrom = event.variants.some(variant =>
        isBefore(variant.datetime, from)
      );

      if (!hasDateBeforeFrom) return false;
    }

    if (!!to && !!from) {
      const hasDateWithinRange = event.variants.some(variant => {
        return (
          isAfter(variant.datetime, to) && isBefore(variant.datetime, from)
        );
      });

      if (!hasDateWithinRange) return false;
    }

    return true;
  }, []);

  console.log('DOFGID', block, events);

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['EventsGrid'],
        styles[colorClass],
        'flex flex-column items-center justify-center',
        {
          drip: dripIsOn,
          'upper-drip': upperDripIsOn
        }
      )}
    >
      <div
        className={cx(
          styles['EventsGrid__header'],
          'flex flex-column justify-center items-center col-12'
        )}
      >
        <h2 className="my3 block-headline">{block.title}</h2>
        <div className="col-12 flex justify-between items-center">
          <div
            className={cx(
              styles['EventsGrid__header-control'],
              styles['EventsGrid__header-control--date'],
              'col-4 flex items-center'
            )}
          >
            <div className="mr2 pr1 relative">
              <Button variant="underline-madison-blue" onClick={toggleTo}>
                <span className="mr1">{to ? format(to, 'L/dd/yy') : 'To'}</span>
                <Image
                  className={styles['EventsGrid__button-icon-small']}
                  src={`/assets/images/arrow-dropdown${
                    toIsOpen ? '' : '-active'
                  }.svg`}
                />
              </Button>
              {toIsOpen && (
                <div
                  className={cx(styles['EventsGrid__calendar'], 'absolute l0')}
                >
                  <Calendar
                    tileDisabled={tileDisabledTo}
                    onClickDay={date => {
                      setToIsOpen(false);
                      setTo(date);
                    }}
                    value={to}
                    minDetail="month"
                    maxDetail="month"
                    minDate={new Date()}
                  />
                </div>
              )}
            </div>
            <div className="mr2 pr1 relative">
              <Image
                className={styles['EventsGrid__calendar-icon']}
                src="/assets/images/icon-calendar.svg"
              />
            </div>
            <div className="mr2 pr1 relative">
              <Button variant="underline-madison-blue" onClick={toggleFrom}>
                <span className="mr1">
                  {from ? format(from, 'L/dd/yy') : 'From'}
                </span>
                <Image
                  className={styles['EventsGrid__button-icon-small']}
                  src={`/assets/images/arrow-dropdown${
                    fromIsOpen ? '' : '-active'
                  }.svg`}
                />
              </Button>
              {fromIsOpen && (
                <div
                  className={cx(styles['EventsGrid__calendar'], 'absolute l0')}
                >
                  <Calendar
                    tileDisabled={tileDisabledFrom}
                    onClickDay={date => {
                      setFromIsOpen(false);
                      setFrom(date);
                    }}
                    value={from}
                    minDetail="month"
                    maxDetail="month"
                  />
                </div>
              )}
            </div>
            {(to || from) && (
              <div className="mr2 pr1 relative">
                <Button
                  className="uppercase"
                  variant="tag"
                  onClick={() => {
                    setTo(null);
                    setFrom(null);
                    setToIsOpen(false);
                    setFromIsOpen(false);
                  }}
                >
                  Clear
                </Button>
              </div>
            )}
          </div>
          <div
            className={cx(
              styles['EventsGrid__header-control'],
              styles['EventsGrid__header-control--categories'],
              'col-12 lg-col-4 flex justify-center'
            )}
          >
            {categories.map(category => (
              <Button
                variant="primary-small"
                className="mx1 mb2"
                color={
                  category === selectedCategory
                    ? 'madison-blue'
                    : 'clear-madison-blue-border'
                }
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          <div
            className={cx(
              styles['EventsGrid__header-control'],
              styles['EventsGrid__header-control--location'],
              'col-4 flex justify-end'
            )}
          >
            <div className="relative">
              <div className="">
                <Button
                  variant="underline-madison-blue"
                  onClick={toggleLocation}
                >
                  <span className="mr1">{selectedLocation}</span>
                  <Image
                    className={styles['EventsGrid__button-icon-small']}
                    src={`/assets/images/arrow-dropdown${
                      locationIsOpen ? '' : '-active'
                    }.svg`}
                  />
                </Button>
              </div>
              {locationIsOpen && (
                <div
                  className={cx(
                    styles['EventsGrid__location-dropdown'],
                    'flex justify-end absolute'
                  )}
                >
                  {locations.map(location => (
                    <Button
                      className="mr1"
                      variant="primary-small"
                      color={
                        location === selectedLocation
                          ? 'madison-blue'
                          : 'clear-madison-blue-border'
                      }
                      onClick={() => setSelectedLocation(location)}
                    >
                      {location === 'Location' ? 'All' : location}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className={cx(
          styles['EventsGrid__events'],
          'flex flex-wrap justify-center'
        )}
      >
        {filteredEvents.map(event => {
          const firstValidVariant = event.variants.find(variant =>
            isAfter(variant.datetime, new Date())
          );

          return (
            <div
              key={event.id}
              className={cx(styles['EventsGrid__event'], 'col-12 md-col-6')}
            >
              <Link to={event.link} className="text-decoration-none no-hover">
                <div
                  className={cx(
                    styles['EventsGrid__event-inner'],
                    'card flex flex-wrap col-12 justify-center bg-white h100'
                  )}
                >
                  <div
                    className={cx(
                      styles['EventsGrid__event-image-container'],
                      'col-12 md-col-5 flex justify-center items-center'
                    )}
                    style={{ background: event.heroColor }}
                  >
                    <Image
                      className={cx(
                        styles['EventsGrid__event-image'],
                        'col-12'
                      )}
                      src={event.image.src}
                      alt={`${event.title} illustration.`}
                    />
                  </div>
                  <div className="col-12 md-col-7 p3 flex flex-column justify-between items-start">
                    <div className="mb2">
                      <span className="carter callout">{event.title}</span>
                      {!!event.frequency && (
                        <div className="mt1">
                          <strong className="text-peach small">
                            {event.frequency}
                          </strong>
                        </div>
                      )}
                    </div>
                    <div className="flex items-start flex-column justify-start">
                      <span className="small block mb1">
                        {event.variants.length} available times
                      </span>
                      {!!firstValidVariant && (
                        <span className="small">
                          <span>Next:</span>
                          <strong
                            className={cx(
                              styles['EventsGrid__card-timing'],
                              'relative inline-block ml1'
                            )}
                          >
                            {format(
                              firstValidVariant.datetime,
                              'MMM dd, yyyy - h:mm a'
                            )}
                          </strong>
                        </span>
                      )}
                    </div>
                    <div className="mt3">
                      <Button variant="primary" color="peach" to={event.link}>
                        More Info
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventsGrid;

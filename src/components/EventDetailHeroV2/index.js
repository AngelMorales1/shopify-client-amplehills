import React from 'react';
import cx from 'classnames';
import { compareAsc, format, parse, isSameDay, subMinutes } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import gtag from 'utils/gtag';

import { QuantitySelector, Button, Image } from 'components/base';
import styles from './EventDetailHeroV2.scss';

const knownPermutationsOfDateStrings = date => [
  format(date, 'M/d/yy'),
  format(date, 'MM/d/yy'),
  format(date, 'M/dd/yy'),
  format(date, 'MM/dd/yy'),
  format(date, 'M/d/yyyy'),
  format(date, 'MM/d/yyyy'),
  format(date, 'M/dd/yyyy'),
  format(date, 'MM/dd/yyyy')
];

class EventDetailHeroV2 extends React.Component {
  state = {
    selectedVariant: null,
    selectedDate: null,
    selectedTime: null,
    dateIsOpen: false,
    timeIsOpen: false,
    quantity: 1,
    imageLoaded: false
  };

  constructor(props) {
    super(props);

    const firstVariant = props.event.variants.find(variant => {
      return compareAsc(variant.datetime, new Date()) === 1;
    });

    if (firstVariant) this.state.selectedVariant = firstVariant;
  }

  openDateSelector = () => {
    this.setState({ dateIsOpen: true, timeIsOpen: false });
  };

  openTimeSelector = () => {
    this.setState({ dateIsOpen: false, timeIsOpen: true });
  };

  closeDateSelector = () => {
    this.setState({ dateIsOpen: false });
  };

  closeTimeSelector = () => {
    this.setState({ timeIsOpen: false });
  };

  addToCart = () => {
    const { selectedVariant, quantity } = this.state;
    const items = [{ quantity, variantId: selectedVariant.id }];

    gtag('event', 'add_to_cart', {
      send_to: 'AW-596545311',
      value: selectedVariant.price,
      items: items.map(item => ({
        id: item.variantId,
        google_business_verical: 'retail'
      }))
    });

    this.props.actions.addLineItems(this.props.checkout.id, items);
  };

  selectDate = date => {
    const dateStrings = knownPermutationsOfDateStrings(date);
    const selectedVariant = this.props.event.variants.find(variant => {
      return dateStrings.includes(variant.dateStr);
    });

    return this.setState({ selectedVariant, dateIsOpen: false });
  };

  selectVariant = time => {
    const selectedDate = this.state.selectedVariant.dateStr;

    const dateStr = `${selectedDate}, ${time}`;
    const selectedVariant = this.props.event.variants.find(
      variant => variant.date === dateStr
    );

    return this.setState({ selectedVariant, timeIsOpen: false });
  };

  tileClassName = ({ date }) => {
    const availableDates = this.props.event.variants
      .filter(variant => {
        const startTime = variant.datetime;
        const now = new Date();

        return compareAsc(startTime, now) === 1;
      })
      .map(variant => variant.datetime);

    if (availableDates.find(dDate => isSameDay(dDate, date))) {
      return 'react-calendar__tile--available';
    }
  };

  tileDisabled = ({ date }) => {
    const availableDates = this.props.event.variants
      .filter(variant => {
        const startTime = variant.datetime;
        const now = new Date();

        return compareAsc(startTime, now) === 1;
      })
      .map(variant => variant.datetime);

    return !availableDates.some(dDate => isSameDay(dDate, date));
  };

  render() {
    const { event } = this.props;
    const { selectedVariant, dateIsOpen, timeIsOpen, quantity } = this.state;

    const filteredVariants = event.variants.filter(variant => {
      const startTime = variant.datetime;
      const now = new Date();

      return compareAsc(startTime, now) === 1;
    });

    const timesByDate = event.variants.reduce((timesByDate, variant) => {
      const dateArr = variant.date.split(',');
      const time = (dateArr[1] || '').trim();

      if (time) {
        const dateStrings = knownPermutationsOfDateStrings(variant.datetime);
        dateStrings.forEach(date => {
          if (!!timesByDate[date]) {
            timesByDate[date] = timesByDate[date].includes(time)
              ? timesByDate[date]
              : [...timesByDate[date], time];
          } else {
            timesByDate[date] = [time];
          }
        });
      }

      return timesByDate;
    }, {});

    const doorsOpen = selectedVariant
      ? subMinutes(selectedVariant.datetime, 30)
      : null;
    const available = !!selectedVariant && selectedVariant.available;
    const price = !!selectedVariant
      ? selectedVariant.price
      : event.variants[0].price;

    return (
      <div
        className={cx(styles['EventDetailHeroV2'], 'drip col-12')}
        style={{ background: event.heroColor }}
      >
        <div
          className={cx(
            styles['EventDetailHeroV2__inner'],
            'flex justify-center items-center p1'
          )}
        >
          <div
            className={cx(
              styles['EventDetailHeroV2__image'],
              'col-12 md-col-6 p1',
              {
                [styles['EventDetailHeroV2__image--class']]:
                  event.eventType === 'Ice Cream Classes',
                [styles['EventDetailHeroV2__image--loaded']]: this.state
                  .imageLoaded
              }
            )}
          >
            <Image
              onImgLoad={() => this.setState({ imageLoaded: true })}
              className="col-12"
              src={event.image.src}
            />
          </div>
          <div
            className={cx(
              styles['EventDetailHeroV2__info'],
              'flex col-12 md-col-6'
            )}
          >
            <div
              className={cx(
                styles['EventDetailHeroV2__info-card'],
                'card bg-white portable-text'
              )}
            >
              <h1 className="block-headline mb3 mt2">{event.title}</h1>
              <strong className="small">{`${
                filteredVariants.length
              } Available Times`}</strong>
              <div
                className={cx(
                  styles['EventDetailHeroV2__button-container'],
                  'flex mt1 pb2 col-12'
                )}
              >
                <div className="relative col-12 mr2">
                  <button
                    className={styles['EventDetailHeroV2__hero-button']}
                    aria-label="Select Date."
                    onClick={
                      dateIsOpen
                        ? this.closeDateSelector
                        : this.openDateSelector
                    }
                  >
                    <Image
                      className={styles['EventDetailHeroV2__button-icon']}
                      src="/assets/images/icon-calendar.svg"
                    />
                    <strong className="ml1 text-peach avenir col-12 left-align">
                      {selectedVariant
                        ? format(
                            new Date(selectedVariant.datetime),
                            'MMMM dd, YYY'
                          )
                        : 'No Upcoming Dates'}
                    </strong>
                    <Image
                      className={styles['EventDetailHeroV2__button-icon-small']}
                      src="/assets/images/arrow-dropdown.svg"
                    />
                  </button>
                  {dateIsOpen && (
                    <div
                      className={cx(
                        styles['EventDetailHeroV2__calendar-container'],
                        'z-1'
                      )}
                    >
                      <Calendar
                        tileClassName={this.tileClassName}
                        tileDisabled={this.tileDisabled}
                        onClickDay={this.selectDate}
                        value={selectedVariant.datetime}
                        minDetail="month"
                        maxDetail="month"
                      />
                    </div>
                  )}
                </div>
                <div className="relative col-12">
                  {selectedVariant && (
                    <button
                      className={styles['EventDetailHeroV2__hero-button']}
                      aria-label="Select Time."
                      onClick={
                        timeIsOpen
                          ? this.closeTimeSelector
                          : this.openTimeSelector
                      }
                    >
                      <Image
                        className={styles['EventDetailHeroV2__button-icon']}
                        src="/assets/images/icon-clock.svg"
                      />
                      <strong className="ml1 text-peach avenir col-12 left-align">
                        {format(new Date(selectedVariant.datetime), 'h:mm a')}
                      </strong>
                      <Image
                        className={
                          styles['EventDetailHeroV2__button-icon-small']
                        }
                        src="/assets/images/arrow-dropdown.svg"
                      />
                    </button>
                  )}
                  {timeIsOpen && (
                    <div
                      className={cx(
                        styles['EventDetailHeroV2__time-container'],
                        'absolute t0'
                      )}
                    >
                      {timesByDate[selectedVariant.dateStr].map(time => (
                        <button
                          className={cx(
                            styles['EventDetailHeroV2__time-button'],
                            {
                              [styles[
                                'EventDetailHeroV2__time-button--active'
                              ]]: time === selectedVariant.timeStr
                            }
                          )}
                          onClick={() => this.selectVariant(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {doorsOpen && (
                <strong className="text-peach small uppercase mt3 mb1 block extra-small letter-spacing-1">
                  Doors Open {format(doorsOpen, 'h:mma')}
                </strong>
              )}
              <span className="copy">{event.heroDescription}</span>
              <div className="w100 flex flex-row justify-between items-center flex-wrap my3">
                <QuantitySelector
                  variant={
                    null
                    // this.state.currentBreakpoint === 'small' ? 'small' : null
                  }
                  className={cx(
                    styles['EventDetailHero__quantity-selector'],
                    'mr1 my2'
                  )}
                  quantity={quantity}
                  onChange={value => this.setState({ quantity: value })}
                />
                <Button
                  variant="primary"
                  className={cx(styles['EventDetailHero__action-button'])}
                  color="madison-blue"
                  disabled={!available}
                  onClick={this.addToCart}
                >
                  <span className="mr-auto">
                    {available ? 'Add to Cart' : 'Sold Out'}
                  </span>
                  <span className="ml2">
                    ${(parseInt(price) * quantity).toFixed(2)}
                  </span>
                </Button>
              </div>
              <div
                className={cx(
                  'col-12 mx-auto mt3 flex flex-column items-center'
                )}
              >
                <div
                  className={cx(
                    styles['EventDetailHeroV2__location-container'],
                    'bg-light-yellow flex w100 h100 py2 relative'
                  )}
                >
                  <div className={cx('flex col-12 md-col-3 items-center')}>
                    <span className="col-12 px2 block-subheadline carter nowrap">
                      Location
                    </span>
                  </div>
                  <div className="col-12 md-col-6">
                    <p
                      className={cx(
                        styles['EventDetailHeroV2__location-description'],
                        'col-12 px2 uppercase semi-bold flex flex-column justify-center mb0'
                      )}
                    >
                      <span className="center">{event.locationTitle}</span>
                      <span className="center">{event.locationAddress}</span>
                    </p>
                  </div>
                  <div
                    className={cx(
                      styles['EventDetailHeroV2__location-button'],
                      'col-4 md-col-3 px2 right-align flex flex-column justify-end'
                    )}
                  >
                    <div className="ml-auto">
                      <Button
                        variant="underline-peach"
                        to={`/locations/${event.locationSlug}`}
                        label="More Info"
                        className={cx(
                          'uppercase info-text-wide bold nowrap text-madison-blue'
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventDetailHeroV2;

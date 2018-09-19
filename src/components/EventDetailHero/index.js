import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FacebookShareButton } from 'react-share';
import get from 'utils/get';
import getShortTimeFormat from 'utils/getShortTimeFormat';
import cx from 'classnames';
import moment from 'moment';
import marked from 'marked';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import getLineItemPrice from 'utils/getLineItemPrice';
import eventModel from 'models/eventModel';

import { Button, Radio, Modal, Image } from 'components/base';
import styles from './EventDetailHero.scss';

class EventDetailHero extends Component {
  state = {
    selectedItem: '',
    selectedItemDateAndTime: '',
    modalIsOpen: false
  };

  componentDidMount() {
    const event = get(this, 'props.event', {});
    const eventDatesAndTimes = get(event, 'datesAndTimes', []);
    if (event.handle) {
      if (eventDatesAndTimes.length > 1) {
        const firstAvailableDateAndTime = eventDatesAndTimes.find(
          eventDateAndTime => {
            return get(eventDateAndTime, 'available', false) === true;
          }
        );

        this.setState({
          selectedItem: get(firstAvailableDateAndTime, 'id', ''),
          selectedItemDateAndTime: this.getDateAndTimeFormat(
            firstAvailableDateAndTime
          )
        });
      } else {
        const dateAndTime = get(event, 'datesAndTimes[0]', {});

        this.setState({
          selectedItem: get(event, 'id', ''),
          selectedItemDateAndTime: this.getDateAndTimeFormat(dateAndTime)
        });
      }
    }
  }

  getDateAndTimeFormat = dateAndTime => {
    const startTime = dateAndTime.Time.split('-')[0];
    const sortedDateAndTime = `${moment(dateAndTime.Date).format(
      'MM/DD/YY'
    )}- ${getShortTimeFormat(startTime)}`;

    return sortedDateAndTime;
  };

  getItemPrice = () => {
    const eventDatesAndTimes = get(this, 'props.event.datesAndTimes', []);

    if (eventDatesAndTimes.length > 1) {
      const item = eventDatesAndTimes.find(
        eventDateAndTime =>
          get(eventDateAndTime, 'id', '') ===
          get(this, 'state.selectedItem', '')
      );
      return getLineItemPrice(get(item, 'price', ''), 1);
    }
    return getLineItemPrice(get(this, 'props.event.price', 0), 1);
  };

  handleAddToCart = () => {
    const item = [
      {
        variantId: get(this, 'state.selectedItem', ''),
        quantity: 1,
        customAttributes: [
          {
            key: 'eventTime',
            value: get(this, 'state.selectedItemDateAndTime', '')
          }
        ]
      }
    ];

    this.props.actions.addLineItems(this.props.checkout.id, item);
  };

  render() {
    const { event } = this.props;
    const { selectedItem } = this.state;
    const eventIsAvailable = event.available;

    return (
      <div className={cx(styles['EventDetailHero'], 'flex flex-column mb4')}>
        <div className="flex flex-column justify-center items-center w100 mt4">
          <h2 className="block-headline">{event.title}</h2>
          <div className="mt3">
            <FacebookShareButton url={get(window, 'location.href', '')}>
              <Button
                className="inline-flex uppercase"
                variant="primary-small"
                color="clear-madison-blue-border"
                label="Share"
              />
            </FacebookShareButton>
          </div>
        </div>
        <div
          className={cx(
            styles['EventDetailHero__content-container'],
            'flex mt4'
          )}
        >
          <div
            className={cx(styles['EventDetailHero__image'], 'col-12 md-col-6')}
          >
            <div
              className="aspect-4-3 w100"
              style={{
                background: `url(${contentfulImgUtil(
                  event.image,
                  '1600'
                )}) no-repeat center`,
                backgroundSize: 'cover'
              }}
            />
          </div>
          <div
            className={cx(
              styles['EventDetailHero__text-container'],
              'col-12 md-col-6 flex flex-column items-center text-container-width mx-auto'
            )}
          >
            <div className="w100">
              {event.datesAndTimes.length > 1 ? (
                <div>
                  <p className="copy text-peach bold mb2">Date</p>
                  {event.datesAndTimes.map((dateAndTime, i) => {
                    const eventTime = this.getDateAndTimeFormat(dateAndTime);
                    const classIsAvailable = get(
                      dateAndTime,
                      'available',
                      false
                    );

                    return (
                      <Fragment key={get(dateAndTime, 'uuid', i)}>
                        {event.handle ? (
                          <Radio
                            disabled={classIsAvailable ? false : true}
                            className="block-sub-headline bold text-peach mb2 lowercase"
                            label={
                              classIsAvailable
                                ? eventTime
                                : `${eventTime} (Sold Out)`
                            }
                            onClick={() => {
                              this.setState({
                                selectedItem: dateAndTime.id,
                                selectedItemDateAndTime: eventTime
                              });
                            }}
                            color={classIsAvailable ? 'peach' : 'ghost-gray'}
                            checked={selectedItem === dateAndTime.id}
                          />
                        ) : (
                          <p className="block-sub-headline bold text-peach mb2 lowercase">
                            {eventTime}
                          </p>
                        )}
                      </Fragment>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <div>
                    <p className="copy">Date</p>
                    <p
                      className={cx(
                        styles['EventDetailHero__content-text'],
                        'mt1'
                      )}
                    >
                      {moment(get(event, 'datesAndTimes[0].Date', '')).format(
                        'dddd, MMMM Do'
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="copy mt3">Time</p>
                    <p
                      className={cx(
                        styles['EventDetailHero__content-text'],
                        'mt1'
                      )}
                    >
                      {get(event, 'datesAndTimes[0].Time', '')}
                    </p>
                  </div>
                  <div
                    className={cx(
                      styles['EventDetailHero__location-container'],
                      'flex mt3 w100'
                    )}
                  >
                    <div>
                      <p className="copy">Location</p>
                      <p
                        className={cx(
                          styles['EventDetailHero__content-text'],
                          'mt1'
                        )}
                      >
                        {event.locationTitle}
                      </p>
                    </div>
                    <div>
                      <Button
                        className={cx(
                          styles['EventDetailHero__map-button'],
                          'inline-flex'
                        )}
                        variant="primary-small"
                        color="clear-madison-blue-border"
                        to={`/locations/?location=${event.locationId}`}
                        label="Map"
                      />
                    </div>
                  </div>
                </div>
              )}
              <Button
                className={cx(styles['EventDetailHero__action-button'], 'my4')}
                color={event.handle ? 'madison-blue' : 'peach'}
                disabled={event.handle ? !eventIsAvailable : false}
                onClick={
                  event.handle
                    ? this.handleAddToCart
                    : () => this.setState({ modalIsOpen: true })
                }
              >
                <span className="mr-auto">
                  {event.handle ? 'Add to Cart' : 'Call to Action'}
                </span>
                {event.handle ? (
                  <span className="ml2">${this.getItemPrice()}</span>
                ) : null}
              </Button>
              {event.datesAndTimes.length > 1 && event.text ? (
                <p className="copy text-peach bold mb1">Details</p>
              ) : null}
              <div
                dangerouslySetInnerHTML={{
                  __html: marked(get(event, 'text', ''))
                }}
                className="markdown-block"
              />
            </div>
          </div>
        </div>
        {this.state.modalIsOpen ? (
          <Modal className="relative">
            <div className="relative wh100 flex flex-column mb3">
              <Button
                className="absolute r0 t0"
                variant="icon-small"
                onClick={() => this.setState({ modalIsOpen: false })}
              >
                <Image src="/assets/images/icon-close.svg" />
              </Button>
              <h2 className="sub-title m3 mx-auto center">
                {event.locationTitle}
              </h2>
              <p className="block-subheadline mx-auto">
                {event.locationNumber}
              </p>
            </div>
          </Modal>
        ) : null}
      </div>
    );
  }
}

EventDetailHero.propTypes = {
  event: eventModel.propTypes,
  actions: PropTypes.shape({
    getEvents: PropTypes.func
  })
};

EventDetailHero.defaultProps = {
  event: eventModel.default,
  actions: {
    getEvents: () => {}
  }
};

export default EventDetailHero;

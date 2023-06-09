import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'utils/get';
import isValidEmailAddress from 'utils/isValidEmailAddress';
import cx from 'classnames';
import marked from 'marked';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import getLineItemPrice from 'utils/getLineItemPrice';
import eventModel from 'models/eventModel';
import ContactUsForm from 'constants/forms/ContactUs';
import Global from 'constants/Global';
import { PENDING, FULFILLED, REJECTED } from 'constants/Status';

import {
  Button,
  Radio,
  Image,
  FormFlash,
  TextField,
  QuantitySelector,
  PortableText
} from 'components/base';
import styles from './EventDetailHero.scss';

class EventDetailHero extends Component {
  state = {
    selectedItem: '',
    selectedItemDateAndTime: '',
    modalIsOpen: false,
    selectedAddress: ContactUsForm.ADDRESSES.PARTIES.bucket,
    name: '',
    email: '',
    phone: '',
    message: '',
    quantity: 1,
    currentBreakpoint: Global.breakpoints.small.label
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateWindow);
    this.updateWindow();

    const event = get(this, 'props.event', {});
    const shoppableItem = !!event.id;
    const eventVariant = get(event, 'variants', []);

    if (shoppableItem) {
      const firstAvailableDateAndTime = eventVariant.find(variant => {
        return get(variant, 'available', false) === true;
      });

      this.setState({
        selectedItem: get(firstAvailableDateAndTime, 'id', ''),
        selectedItemDateAndTime: get(firstAvailableDateAndTime, 'date', '')
      });
    } else {
      const firstDateAndTime = get(event, 'datesAndTimes[0]', {});

      this.setState({
        selectedItem: get(firstDateAndTime, 'uuid', ''),
        selectedItemDateAndTime: `${get(
          firstDateAndTime,
          'sortedDate',
          ''
        )}, ${get(firstDateAndTime, 'sortedTime', '')}`
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindow);
  }

  updateWindow = () => {
    const { small, medium } = Global.breakpoints;
    const currentBreakpoint =
      window.innerWidth <= medium.lowerbound ? small.label : medium.label;

    if (this.state.currentBreakpoint !== currentBreakpoint)
      this.setState({ currentBreakpoint });
  };

  getItemPrice = itemId => {
    const eventVariants = get(this, 'props.event.variants', {});
    const selectedEvent = eventVariants.find(variant => variant.id === itemId);

    return getLineItemPrice(get(selectedEvent, 'price', 0), 1);
  };

  handleAddToCart = () => {
    const item = [
      {
        variantId: get(this, 'state.selectedItem', ''),
        quantity: this.state.quantity,
        customAttributes: []
      }
    ];

    this.props.actions.addLineItems(this.props.checkout.id, item);
  };

  formHasErrors = () => {
    const { name, email, message } = this.state;

    if (!name) {
      const error = 'Please enter your full name.';
      this.setState({ error });
      return true;
    }

    if (!email || !isValidEmailAddress(email)) {
      const error = 'Please enter a valid email address.';
      this.setState({ error });
      return true;
    }

    if (!message) {
      const error = 'Please write a message.';
      this.setState({ error });
      return true;
    }

    return false;
  };

  submitContactForm = () => {
    const eventLocation = get(this, 'props.event.locationTitle', '');
    if (this.formHasErrors()) return null;

    const { selectedAddress, name, email, phone, message } = this.state;

    const messageWithEventInfo = `Event location: ${eventLocation}, Event time: ${
      this.state.selectedItemDateAndTime
    }  Message: ${message}`;

    this.setState({ error: '' });
    this.props.actions.sendContactForm({
      selectedAddress,
      name,
      email,
      phone,
      message: messageWithEventInfo
    });
  };

  render() {
    const { event, formStatus } = this.props;
    const { selectedItem, error, quantity } = this.state;
    const eventVariants = get(event, 'variants', []);
    const selectedEvent = eventVariants.find(
      variant => variant.id === this.state.selectedItem
    );
    const selectedEventIsAvailable = get(selectedEvent, 'available', false);
    const shoppableItemLabel = selectedEventIsAvailable
      ? 'Add to Cart'
      : 'Sold Out';
    const shoppableItem = !!event.id;

    return (
      <div className={cx(styles['EventDetailHero'], 'flex flex-column mb4')}>
        <div className="flex flex-column justify-center items-center w100 my4 px3">
          <h2 className="block-headline center">{event.title}</h2>
        </div>
        <div
          className={cx(
            styles['EventDetailHero__content-container'],
            'flex mt3'
          )}
        >
          <div
            className={cx(styles['EventDetailHero__image'], 'col-12 md-col-6')}
          >
            <div
              className="aspect-4-3 w100"
              style={{
                background: `url(${event.image.src}?w=1200) no-repeat center`,
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
              {get(event, 'datesAndTimes', []).length > 1 ||
              get(event, 'variants', []).length > 1 ? (
                <div>
                  <p className="copy text-peach bold mb2">Date</p>
                  {event.datesAndTimes.map((dateAndTime, i) => {
                    const eventTime = `${dateAndTime.sortedDate}, ${
                      dateAndTime.sortedTime
                    }`;
                    const eventVariants = get(event, 'variants', []);
                    const eventVariant = eventVariants[i];
                    const eventIsAvailable = get(
                      eventVariant,
                      'available',
                      false
                    );
                    const currentItemId = shoppableItem
                      ? eventVariant.id
                      : dateAndTime.uuid;

                    return (
                      <Radio
                        key={get(dateAndTime, 'uuid', i)}
                        disabled={
                          eventIsAvailable || !shoppableItem ? false : true
                        }
                        className="block-sub-headline bold text-peach mb2 lowercase"
                        label={
                          eventIsAvailable || !shoppableItem
                            ? eventTime
                            : `${eventTime} (Sold Out)`
                        }
                        onClick={() => {
                          this.setState({
                            selectedItem: currentItemId,
                            selectedItemDateAndTime: `${get(
                              dateAndTime,
                              'date',
                              ''
                            )}, ${get(dateAndTime, 'time', '')}`
                          });
                        }}
                        color={
                          eventIsAvailable || !shoppableItem
                            ? 'peach'
                            : 'ghost-gray'
                        }
                        checked={selectedItem === currentItemId}
                      />
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
                      {get(event, 'datesAndTimes[0].sortedDate', '')}
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
                      {get(event, 'datesAndTimes[0].time', '')}
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
              <div className="w100 flex flex-row justify-between items-center flex-wrap my4">
                {shoppableItem ? (
                  <QuantitySelector
                    variant={
                      this.state.currentBreakpoint === 'small' ? 'small' : null
                    }
                    className={cx(
                      styles['EventDetailHero__quantity-selector'],
                      'mr1 my2'
                    )}
                    quantity={quantity}
                    onChange={value => this.setState({ quantity: value })}
                  />
                ) : null}
                <Button
                  variant={
                    this.state.currentBreakpoint === 'small'
                      ? 'primary-small'
                      : 'primary'
                  }
                  className={cx(styles['EventDetailHero__action-button'])}
                  color={shoppableItem ? 'madison-blue' : 'peach'}
                  disabled={shoppableItem ? !selectedEventIsAvailable : false}
                  onClick={
                    shoppableItem
                      ? this.handleAddToCart
                      : () => this.setState({ modalIsOpen: true })
                  }
                >
                  <span className="mr-auto">
                    {shoppableItem ? shoppableItemLabel : 'RSVP'}
                  </span>
                  {shoppableItem && selectedEventIsAvailable ? (
                    <span className="ml2">
                      $
                      {(
                        this.getItemPrice(this.state.selectedItem) * quantity
                      ).toFixed(2)}
                    </span>
                  ) : null}
                </Button>
              </div>
              {event.datesAndTimes.length > 1 && event.text ? (
                <p className="copy text-peach bold mb1">Details</p>
              ) : null}
              <div className="portable-text">
                <PortableText blocks={event.text} />
              </div>
            </div>
          </div>
        </div>
        {this.state.modalIsOpen ? (
          <div
            className={cx(
              styles['EventDetailHero__modal'],
              'overflow-scroll fixed-cover bg-white-wash flex justify-center items-center transition-fade-in'
            )}
          >
            <div
              className={cx(
                styles['EventDetailHero__modal-content-container'],
                'relative flex items-center justify-center bg-white drop-shadow transition-slide-up-large-long'
              )}
            >
              <div className="wh100 m-auto flex flex-column mb3 justify-center">
                <Button
                  className={cx(
                    styles['EventDetailHero__modal-close-button'],
                    'absolute r0 t0'
                  )}
                  variant="icon-small"
                  onClick={() => this.setState({ modalIsOpen: false })}
                >
                  <Image src="/assets/images/icon-close.svg" />
                </Button>
                <h2 className="block-headline m3 pt3 mx-auto center">RSVP</h2>
                <div className="transition-slide-up flex flex-column justify-center items-center">
                  <form className="flex flex-wrap justify-center text-container-width">
                    <div className="w100 flex flex-column">
                      {Object.values(ContactUsForm.FIELDS).map(field => (
                        <TextField
                          key={field.label}
                          className={cx(
                            styles['EventDetailHero__text-field'],
                            'm1'
                          )}
                          variant={
                            field.type === 'textarea'
                              ? 'light-gray-tall'
                              : 'light-gray'
                          }
                          type={field.type}
                          value={this.state[field.id]}
                          onChange={value =>
                            this.setState({ [field.id]: value })
                          }
                          placeholder={field.label}
                        />
                      ))}
                    </div>
                    <div className="w100 flex flex-wrap text-container-width my2 px1">
                      {error || formStatus === REJECTED ? (
                        <FormFlash
                          className="w100 mb2"
                          error={true}
                          message={
                            error
                              ? error
                              : 'There was an unexpected problem while submitting your message. Please reach out directly to info@amplehills.com'
                          }
                        />
                      ) : null}
                      {formStatus === FULFILLED ? (
                        <FormFlash
                          className="w100 mb2"
                          success={true}
                          message="Your message has been sent!"
                        />
                      ) : null}
                      <Button
                        disabled={formStatus === PENDING}
                        label="Send Us a Message"
                        color="madison-blue"
                        className="my1"
                        onClick={this.submitContactForm}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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

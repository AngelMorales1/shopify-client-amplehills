import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import get from 'utils/get';
import moment from 'moment';
import {
  openNewsletterModal,
  closeNewsletterModal
} from 'state/actions/ui/newsletterModalActions';
import { klaviyoSignup } from 'state/actions/klaviyoActions';
import alertIsActive from 'state/selectors/alertIsActive';

import { Image, Button, TextField, FormFlash } from 'components/base';
import { FULFILLED, REJECTED } from 'constants/Status';
import styles from './NewsletterModal.scss';

class NewsletterModal extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      emailAddress: ''
    };
  }

  componentDidMount() {
    const { actions, renewModalDate } = this.props;

    if (!renewModalDate) setTimeout(actions.openNewsletterModal, 5000);
  }

  handleClose = () => {
    const { actions } = this.props;
    const oneWeekLater = moment().add(1, 'weeks');

    actions.closeNewsletterModal(oneWeekLater);
  };

  render() {
    const {
      alertIsActive,
      globalSettings,
      modalIsActive,
      klaviyoSignupStatus,
      actions
    } = this.props;

    const subscribeNewsletterTitle = get(
      globalSettings,
      'subscribeNewsletterTitle',
      'Subscribe to our newsletter!'
    );
    const subscribeNewsletterDescription = get(
      globalSettings,
      'subscribeNewsletterDescription',
      ''
    );
    const showSubscribeNewsletterModal = get(
      globalSettings,
      'showSubscribeNewsletterModal',
      false
    );

    if (!showSubscribeNewsletterModal) return null;

    if (klaviyoSignupStatus === FULFILLED && modalIsActive) {
      const oneMonthLater = moment().add(1, 'months');
      setTimeout(() => actions.closeNewsletterModal(oneMonthLater), 0);
    }

    return (
      <div
        className={cx(
          styles['NewsletterModal'],
          'fixed z-nav bg-white card drop-shadow-xlarge px1 py2 mx2 r0',
          {
            [styles['NewsletterModal--active']]: modalIsActive,
            [styles['NewsletterModal--alert-active']]: alertIsActive
          }
        )}
        aria-hidden={!modalIsActive}
      >
        <div className="flex flex-row items-center justify-between">
          <p className={cx(styles['NewsletterModal__title'], 'px1 text-peach')}>
            {subscribeNewsletterTitle}
          </p>
          <Button
            ariaLabel="Close the newsletter subscribe popup"
            variant="style-none"
            onClick={this.handleClose}
            className={cx(styles['NewsletterModal__close'], 'mx1')}
          >
            <Image
              alt="Close button"
              src="/assets/images/close-icon-navy.svg"
            />
          </Button>
        </div>
        {subscribeNewsletterDescription ? (
          <p
            className={cx(
              styles['NewsletterModal__description'],
              'pl1 pr3 mt1'
            )}
          >
            {subscribeNewsletterDescription}
          </p>
        ) : null}
        <div className="mt3 flex flex-column">
          <div className="flex flex-row items-center">
            <div
              className={cx(
                styles['NewsletterModal__text-field'],
                'px1 relative flex items-center'
              )}
            >
              <TextField
                value={this.state.emailAddress}
                onChange={emailAddress => this.setState({ emailAddress })}
                className="w100"
                placeholder="Email address"
                variant="madison-blue-border-round-small"
                ariaLabel="Enter your email address to subscribe"
              />
            </div>
            <Button
              className="px2"
              label="Submit"
              variant="primary-small"
              color="madison-blue"
              shadow={true}
              onClick={() => actions.klaviyoSignup(this.state.emailAddress)}
            />
          </div>
          {klaviyoSignupStatus === REJECTED && (
            <FormFlash
              className="z-1 mt2 mx1"
              error={true}
              message="There was an error while attempting to subscribe. Please try again later."
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globalSettings: get(state, 'applicationUI.globalSettings.items[0].fields'),
    alertIsActive: alertIsActive(state),
    modalIsActive: get(state, 'session.newsletterModal.modalIsActive', false),
    renewModalDate: get(state, 'session.newsletterModal.renewModalDate', null),
    klaviyoSignupStatus: get(state, 'status.klaviyoSignup')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        openNewsletterModal,
        closeNewsletterModal,
        klaviyoSignup
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterModal);

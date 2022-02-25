import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import get from 'utils/get';
import moment from 'moment';
import { closeNewsletterModal } from 'state/actions/ui/newsletterModalActions';
import { klaviyoListSignup } from 'state/actions/klaviyoActions';

import { Image, Button, TextField, FormFlash } from 'components/base';
import { FULFILLED, REJECTED } from 'constants/Status';
import styles from './NewsletterModal.scss';

class NewsletterModal extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      emailAddress: '',
      isActive: false
    };
  }

  componentDidMount() {
    const { votingIsActive, actions, renewModalDate } = this.props;

    if (!localStorage.getItem('ff_newsletter_signup') && votingIsActive) {
      actions.closeNewsletterModal(renewModalDate);
      setTimeout(() => this.setState({ isActive: true }), 5000);
    }
  }

  handleClose = () => {
    const oneDayLater = moment().add(1, 'days');

    localStorage.setItem('ff_newsletter_signup', oneDayLater);
    this.setState({ isActive: false });
  };

  render() {
    const { votingIsActive, klaviyoListSignupStatus, actions } = this.props;
    const { isActive } = this.state;

    if (!votingIsActive) return null;

    if (klaviyoListSignupStatus === FULFILLED && isActive) {
      const oneMonthLater = moment().add(1, 'months');
      localStorage.setItem('ff_newsletter_signup', oneMonthLater);
      this.setState({ isActive: false });
    }

    return (
      <div
        className={cx(
          styles['NewsletterModal'],
          'fixed z-nav bg-white card drop-shadow-xlarge px1 py2 mx2 r0',
          {
            [styles['NewsletterModal--active']]: isActive
          }
        )}
        aria-hidden={!isActive}
      >
        <div className="flex flex-row items-center justify-between">
          <p className={cx(styles['NewsletterModal__title'], 'px1 text-peach')}>
            Flavor Frenzy 2022
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
        <p
          className={cx(styles['NewsletterModal__description'], 'pl1 pr3 mt1')}
        >
          Want to know when the next round opens and the winner is declared?
          Enter your email below!
        </p>
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
              onClick={() =>
                actions.klaviyoListSignup(this.state.emailAddress, 'WW9nrp')
              }
            />
          </div>
          {klaviyoListSignupStatus === REJECTED && (
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
    renewModalDate: get(state, 'session.newsletterModal.renewModalDate', null),
    klaviyoListSignupStatus: get(state, 'status.klaviyoListSignup')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeNewsletterModal,
        klaviyoListSignup
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterModal);

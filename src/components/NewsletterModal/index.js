import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cx from 'classnames';

import get from 'utils/get';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import moment from 'moment';
import { hideNewsletterModal } from 'state/actions/ui/newsletterModalActions';
import alertIsActive from 'state/selectors/alertIsActive';

import { Image, Button, TextField, FormFlash } from 'components/base';
import styles from './NewsletterModal.scss';

class NewsletterModal extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      emailAddress: '',
      newsletterModalIsActive: false
    };

    this.date = moment();

    const { hideNewsletterModalUntil, actions } = props;

    if (
      hideNewsletterModalUntil !== null &&
      moment().isAfter(moment(hideNewsletterModalUntil))
    ) {
      actions.hideNewsletterModal(null);
    }
  }

  componentDidMount() {
    const { actions, hideNewsletterModalUntil } = this.props;

    if (!hideNewsletterModalUntil) {
      setTimeout(() => {
        this.setState({ newsletterModalIsActive: true });
      }, 5000);
    }
  }

  handleClose = () => {
    const { actions } = this.props;
    const weekLater = this.date.add(7, 'days');

    this.setState({ newsletterModalIsActive: false });
    actions.hideNewsletterModal(weekLater);
  };

  render() {
    const {
      alertIsActive,
      globalSettings,
      hideNewsletterModalUntil,
      actions
    } = this.props;

    const { newsletterModalIsActive } = this.state;
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

    const url = process.env.REACT_APP_MAILCHIMP_URL;

    if (!showSubscribeNewsletterModal) return null;

    return (
      <div
        className={cx(
          styles['NewsletterModal'],
          'fixed z-nav bg-white card drop-shadow-xlarge px1 py2 mx2 r0',
          {
            [styles['NewsletterModal--active']]: this.state
              .newsletterModalIsActive,
            [styles['NewsletterModal--alert-active']]: alertIsActive
          }
        )}
      >
        <div className="flex flex-row items-center justify-between">
          <p className={cx(styles['NewsletterModal__title'], 'px1 text-peach')}>
            {subscribeNewsletterTitle}
          </p>
          <Button
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
          <p className="block-subheadline pl1 pr3">
            {subscribeNewsletterDescription}
          </p>
        ) : null}
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => {
            if (status === 'success' && newsletterModalIsActive) {
              const monthLater = this.date.add(30, 'days');
              this.setState({ newsletterModalIsActive: false });
              actions.hideNewsletterModal(monthLater);
            }

            return (
              <div className="mt2 flex flex-column">
                <div className="flex flex-row items-center">
                  <div
                    className={cx(
                      styles['NewsletterModal__text-field'],
                      'px1 relative flex items-center'
                    )}
                  >
                    <TextField
                      value={this.state.emailAddress}
                      onChange={value => this.setState({ emailAddress: value })}
                      className="w100"
                      placeholder="Email address"
                      variant="madison-blue-border-round-small"
                    />
                  </div>
                  <Button
                    className="px2"
                    label="Submit"
                    variant="primary-small"
                    color="madison-blue"
                    shadow={true}
                    onClick={() =>
                      subscribe({ EMAIL: this.state.emailAddress })
                    }
                  />
                </div>
                {status === 'error' ? (
                  <FormFlash
                    className="z-1 mt2 mx1"
                    error={true}
                    message={message}
                  />
                ) : null}
              </div>
            );
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    globalSettings: get(state, 'applicationUI.globalSettings.items[0].fields'),
    alertIsActive: alertIsActive(state),
    hideNewsletterModalUntil: get(
      state,
      'session.newsletterModal.hideNewsletterModalUntil'
    )
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ hideNewsletterModal }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterModal);

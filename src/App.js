import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'what-input';

import { initializeApplication } from 'state/actions/applicationActions';
import { unsetFlashMessage } from 'state/actions/ui/applicationUIActions';
import locations from 'state/selectors/locations';
import checkout from 'state/selectors/checkout';
import alertIsActive from 'state/selectors/alertIsActive';

import { IDLE, FULFILLED, REJECTED } from 'constants/Status';
import get from 'utils/get';
import isProd from 'utils/isProd';
import isContentfulPreview from 'utils/isContentfulPreview';
import Routes from 'routes';
import locationModel from 'models/locationModel';

import Loader from 'components/Loader';
import ErrorPage from 'components/ErrorPage';
import Nav from 'components/Nav';
import MiniCart from 'components/MiniCart';
import CartMaxModal from 'components/CartMaxModal';
import MobileNavModal from 'components/MobileNavModal';
import Footer from 'components/Footer';
import FooterNewsletter from 'components/FooterNewsletter';
import FooterNav from 'components/FooterNav';
import Alert from 'components/Alert';
import NewsletterModal from 'components/NewsletterModal';
import { FormFlash } from 'components/base';

import 'basscss/css/basscss.min.css';
import './styles/app.scss';

class App extends Component {
  componentDidMount() {
    const {
      applicationStatus,
      checkout,
      actions: { initializeApplication }
    } = this.props;

    if (applicationStatus === IDLE) {
      const checkoutId = get(checkout, 'id', false);
      const isPreview = isContentfulPreview();

      initializeApplication(checkoutId, isPreview);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const {
      actions,
      applicationStatus,
      locations,
      globalSettings,
      flashMessages,
      alertIsActive
    } = this.props;

    const facebookLink = get(globalSettings, 'facebookLink');
    const instagramLink = get(globalSettings, 'instagramLink');
    const twitterLink = get(globalSettings, 'twitterLink');
    const footerIllustration = get(globalSettings, 'footerIllustration');
    const footerNav = get(globalSettings, 'footerNav');
    const forceErrorPage = get(globalSettings, 'forceErrorPage');
    const forceErrorPageOnProduction = get(
      globalSettings,
      'forceErrorPageOnProduction'
    );
    const facebookIcon = get(globalSettings, 'facebookIcon');
    const instagramIcon = get(globalSettings, 'instagramIcon');
    const twitterIcon = get(globalSettings, 'twitterIcon');
    const profileIcon = get(globalSettings, 'profileIcon');
    const logo = get(globalSettings, 'logo');

    const alert = Object.values(
      get(globalSettings, 'alertBanner.simpleFragments[0]', '')
    );

    if (
      applicationStatus === FULFILLED &&
      !forceErrorPage &&
      !(forceErrorPageOnProduction && isProd())
    ) {
      return (
        <div className="App">
          {alertIsActive && (
            <Alert
              alert={{
                alertCopy: 'Our online store is back open!'
              }}
            />
          )}
          <Nav
            alertIsActive={alertIsActive}
            logo={logo}
            profileIcon={profileIcon}
          />
          {flashMessages && flashMessages.length ? (
            <div className="FlashMessages fixed w100 px2 z-nav">
              {flashMessages.map(flash => (
                <FormFlash
                  error={true}
                  message={flash.message}
                  unsetFlash={() => {
                    return actions.unsetFlashMessage(flash.uuid);
                  }}
                />
              ))}
            </div>
          ) : null}
          <MiniCart />
          <CartMaxModal />
          <MobileNavModal />
          <NewsletterModal />
          <div className="content-wrapper">
            <Routes location={get(this, 'props.location')} />
            <FooterNewsletter pathname={get(this, 'props.location.pathname')} />
            <FooterNav
              pathname={get(this, 'props.location.pathname')}
              items={footerNav}
            />
            <Footer
              locations={locations}
              footerIllustration={footerIllustration}
              footerLinks={{ facebookLink, instagramLink, twitterLink }}
              footerIcons={{ facebookIcon, instagramIcon, twitterIcon }}
            />
          </div>
        </div>
      );
    }
    if (
      applicationStatus === REJECTED ||
      forceErrorPage ||
      (forceErrorPageOnProduction && isProd())
    ) {
      return <ErrorPage />;
    }

    return <Loader />;
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    applicationStatus: get(state, 'status.initializeApplication'),
    checkout: checkout(state),
    locations: locations(state),
    globalSettings: get(state, 'applicationUI.globalSettings.items[0].fields'),
    alertIsActive: alertIsActive(state),
    flashMessages: get(state, 'applicationUI.flashMessages')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        initializeApplication,
        unsetFlashMessage
      },
      dispatch
    )
  };
};

App.propTypes = {
  globalSettings: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    twitterLink: PropTypes.string,
    footerNav: PropTypes.object
  }),
  locations: PropTypes.arrayOf(locationModel.propTypes),
  forceErrorPage: PropTypes.bool
};

App.defaultProps = {
  globalSettings: null,
  locations: [],
  forceErrorPage: false
};

export { App };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

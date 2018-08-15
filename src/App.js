import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import 'what-input';

import { initializeApplication } from 'state/actions/applicationActions';
import locations from 'state/selectors/locations';
import checkout from 'state/selectors/checkout';
import alertIsActive from 'state/selectors/alertIsActive';

import { IDLE, FULFILLED, REJECTED } from 'constants/Status';
import get from 'utils/get';
import isContentfulPreview from 'utils/isContentfulPreview';
import Routes from 'routes';
import locationModel from 'models/locationModel';

import Loader from 'components/Loader';
import ErrorPage from 'components/ErrorPage';
import Nav from 'components/Nav';
import MiniCart from 'components/MiniCart';
import Footer from 'components/Footer';
import FooterNewsletter from 'components/FooterNewsletter';
import Alert from 'components/Alert';

import 'basscss/css/basscss.min.css';
import './styles/app.scss';

class App extends Component {
  componentWillMount() {
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
      applicationStatus,
      locations,
      globalSettings,
      alertIsActive
    } = this.props;
    const {
      facebookLink,
      instagramLink,
      twitterLink,
      footerIllustration,
      forceErrorPage
    } = globalSettings;
    const alert = get(globalSettings, 'alert', {});

    if (applicationStatus === FULFILLED && !forceErrorPage) {
      return (
        <div className="App">
          {alertIsActive ? <Alert alert={alert} /> : null}
          <Nav alertIsActive={alertIsActive} />
          <MiniCart />
          <div className="content-wrapper">
            <Routes location={get(this, 'props.location')} />
            <FooterNewsletter pathname={get(this, 'props.location.pathname')} />
            <Footer
              locations={locations}
              footerIllustration={footerIllustration}
              footerLinks={{ facebookLink, instagramLink, twitterLink }}
            />
          </div>
        </div>
      );
    }
    if (applicationStatus === REJECTED || forceErrorPage) {
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
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    ),
    alertIsActive: alertIsActive(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        initializeApplication
      },
      dispatch
    )
  };
};

export { App };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
  globalSettings: PropTypes.shape({
    facebookLink: PropTypes.string,
    instagramLink: PropTypes.string,
    twitterLink: PropTypes.string
  }),
  locations: PropTypes.arrayOf(locationModel.propTypes),
  forceErrorPage: PropTypes.bool
};

App.defaultProps = {
  globalSettings: {},
  locations: [],
  forceErrorPage: false
};

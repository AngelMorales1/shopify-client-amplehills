import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { initializeApplication } from 'state/actions/applicationActions';

import { IDLE, FULFILLED } from 'constants/Status';
import get from 'utils/get';
import Routes from 'routes';

import Loader from 'components/Loader';
import Nav from 'components/Nav';
import MiniCart from 'components/MiniCart';
import Footer from 'components/Footer';
import FooterNewsletter from 'components/FooterNewsletter';

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
      initializeApplication(get(checkout, 'id', false));
    }
  }

  render() {
    const { applicationStatus } = this.props;
    const {
      facebookLink,
      instagramLink,
      twitterLink
    } = this.props.globalSettings;
    if (applicationStatus === FULFILLED) {
      return (
        <div className="App">
          <Nav />
          <MiniCart />
          <Routes location={get(this, 'props.location')} />
          <FooterNewsletter />
          <Footer
            locations={this.props.locations}
            footerIllustration={this.props.globalSettings.footerIllustration}
            footerLinks={{ facebookLink, instagramLink, twitterLink }}
          />
        </div>
      );
    }

    return <Loader />;
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    applicationStatus: get(state, 'status.initializeApplication'),
    checkout: get(state, 'session.checkout'),
    locations: get(state, 'applicationUI.locations', {}),
    globalSettings: get(
      state,
      'applicationUI.globalSettings.items[0].fields',
      {}
    )
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
  locations: PropTypes.object
};

App.defaultProps = {
  globalSettings: {},
  locations: {}
};

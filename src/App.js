import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { initializeApplication } from 'state/actions/applicationActions';
import { getLocationData } from 'state/actions/ui/applicationUIActions';

import { fetchProducts } from 'state/actions/productsActions';
import { IDLE, FULFILLED } from 'constants/Status';
import get from 'utils/get';
import Routes from 'routes';

import Loader from 'components/Loader';
import Nav from 'components/Nav';
import Cart from 'components/Cart';
import Footer from 'components/Footer';

import 'basscss/css/basscss.min.css';
import './styles/app.scss';

class App extends Component {
  componentWillMount() {
    const {
      applicationStatus,
      checkout,
      actions: {
        initializeApplication,
        fetchProducts
      }
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
          <Cart />
          <Routes location={get(this, 'props.location')} />
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
    locations: get(state, 'applicationUI.locations'),
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
        initializeApplication,
        fetchProducts
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
  facebookLink: PropTypes.string,
  instagramLink: PropTypes.string,
  twitterLink: PropTypes.string
};

App.defaultProps = {
  facebookLink: 'https://www.facebook.com/',
  instagramLink: 'https://www.instagram.com/',
  twitterLink: 'https://twitter.com/'
};

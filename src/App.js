import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeApplication } from 'state/actions/applicationActions';
import { getLocationData } from 'state/actions/ui/applicationUIActions';
import { getCheckout } from 'state/actions/checkoutActions';

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
      actions: { initializeApplication, getLocationData }
    } = this.props;
    if (applicationStatus === IDLE) {
      initializeApplication(get(checkout, 'id', false));
      getLocationData();
    }
  }

  render() {
    const { applicationStatus } = this.props;
    if (applicationStatus === FULFILLED) {
      return (
        <div className="App">
          <Nav />
          <Cart />
          <Routes location={get(this, 'props.location')} />
          <Footer locations={this.props.locations} />
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
    checkout: get(state, 'session.checkout')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        initializeApplication,
        getLocationData,
        getCheckout
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

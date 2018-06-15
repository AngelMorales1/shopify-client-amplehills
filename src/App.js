import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initializeApplication } from 'state/actions/applicationActions';
import { fetchProducts } from 'state/actions/productsActions';
import { getLocationData } from 'state/actions/ui/applicationUIActions';
import { IDLE, FULFILLED } from 'constants/Status';
import get from 'utils/get';
import Routes from 'routes';

import Loader from 'components/Loader';
import Nav from 'components/Nav';
import Footer from 'components/Footer';

import 'basscss/css/basscss.min.css';
import './styles/app.scss';

class App extends Component {
  componentWillMount() {
    const {
      applicationStatus,
      actions: { initializeApplication, fetchProducts, getLocationData }
    } = this.props;
    if (applicationStatus === IDLE) {
      initializeApplication();
      getLocationData();
    }
  }

  render() {
    const { applicationStatus } = this.props;
    if (applicationStatus === FULFILLED) {
      return (
        <div className="App">
          <Nav />
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
    locations: get(state, 'applicationUI.locations')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        initializeApplication,
        fetchProducts,
        getLocationData
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

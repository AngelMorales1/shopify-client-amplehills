import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { initializeApplication } from "state/actions/applicationActions";
import { fetchProducts } from "state/actions/productsActions";
import { IDLE } from "constants/Status";
import get from "utils/get";

import ProductGrid from "components/ProductGrid";

import "basscss/css/basscss.min.css";
import "./styles/app.scss";

class App extends Component {
  componentWillMount() {
    const {
      applicationStatus,
      actions: { initializeApplication, fetchProducts }
    } = this.props;
    if (applicationStatus === IDLE) {
      initializeApplication();
      fetchProducts();
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Hello, Ample World!</h1>
        {this.props.products && <ProductGrid products={this.props.products} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    applicationStatus: get(state, "status.initializeApplication")
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

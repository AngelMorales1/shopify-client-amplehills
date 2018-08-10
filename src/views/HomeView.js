import React, { Component } from 'react';
import { Redirect } from 'react-router';

class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <Redirect to="/products/the-mickey-mouse-collection" />;
  }
}

export default HomeView;

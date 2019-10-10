import React, { Component } from 'react';
import { Redirect } from 'react-router';

import ErrorPage from 'components/ErrorPage';

class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <ErrorPage />;

    return <Redirect to="/products/the-mickey-mouse-collection" />;
  }
}

export default HomeView;

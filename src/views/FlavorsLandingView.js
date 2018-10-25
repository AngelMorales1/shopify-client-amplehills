import React, { Component } from 'react';
import get from 'utils/get';
import FlavorsLanding from 'components/FlavorsLanding';

class FlavorLandingView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const flavors = get(this, 'props.flavors', {});

    return <FlavorsLanding flavors={flavors} />;
  }
}

export default FlavorLandingView;

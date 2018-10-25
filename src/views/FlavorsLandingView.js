import React, { Component } from 'react';
import get from 'utils/get';

import FlavorCard from 'components/FlavorCard';

class FlavorLandingView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const flavors = get(this, 'props.flavors', {});

    return (
      <div className="bg-pastel-green py4 px3">
        <div className="mx-auto flex flex-column justify-center">
          <h2 className="block-headline center mb3">Our Flavors</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {get(flavors, 'flavors', []).map((flavor, i) => (
              <FlavorCard key={get(flavor, 'id', i)} flavor={flavor} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default FlavorLandingView;

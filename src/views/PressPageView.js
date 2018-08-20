import React, { Component } from 'react';
import get from 'utils/get';

import PressGrid from 'components/PressGrid';

class PressPageView extends Component {
  render() {
    const { model, pressBlocks } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div>
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">Press</p>
          </div>
        </div>
        <div>
          {pressBlocks.map(pressBlock => <PressGrid pressBlock={pressBlock} />)}
        </div>
      </div>
    );
  }
}

export default PressPageView;

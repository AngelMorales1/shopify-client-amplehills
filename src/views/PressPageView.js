import React, { Component } from 'react';
import get from 'utils/get';

import { Image } from 'components/base';
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
        <div className="mx-auto my4 px2 col-12 md-col-6 flex flex-column items-center">
          <span className="block-headline text-peach center">{`"${get(
            pressBlocks[0],
            'fields.quote',
            ''
          )}"`}</span>
          <Image
            className="col-3 my2"
            src={get(pressBlocks[0], 'fields.image.fields.file.url', '')}
          />
        </div>
        <div className="p3 flex flex-row justify-center flex-wrap">
          {pressBlocks.map((pressBlock, i) => (
            <PressGrid
              key={get(pressBlock, 'sys.id', '') + i}
              pressBlock={pressBlock}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PressPageView;

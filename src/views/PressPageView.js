import React, { Component } from 'react';
import get from 'utils/get';

import { Image } from 'components/base';
import PressCard from 'components/PressCard';

class PressPageView extends Component {
  render() {
    const { model, pressCards } = this.props;

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
            pressCards[0],
            'fields.quote',
            ''
          )}"`}</span>
          <Image
            className="col-3 my2"
            src={get(pressCards[0], 'fields.logoImage.fields.file.url', '')}
          />
        </div>
        <div className="p3 flex flex-row justify-center flex-wrap">
          {pressCards.map((pressCard, i) => (
            <PressCard
              key={get(pressCard, 'sys.id', '') + i}
              pressCard={pressCard}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PressPageView;

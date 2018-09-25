import React, { Component } from 'react';
import get from 'utils/get';

import { Image } from 'components/base';
import PressCard from 'components/PressCard';

class PressPageView extends Component {
  render() {
    const { model, pressItems } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const pressItemsId = get(pressItems, 'fragments', []).map(fragment =>
      get(fragment[0], 'value', '')
    );
    const firstPressItem = get(
      pressItems,
      `simpleFragments.${pressItemsId[0]}`,
      {}
    );

    return (
      <div>
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">Press</p>
          </div>
        </div>
        <div className="mx-auto my4 px2 col-12 md-col-6 flex flex-column items-center">
          <span className="block-headline text-peach center">{`"${get(
            firstPressItem,
            'quote',
            ''
          )}"`}</span>
          <Image
            className="col-3 mt4 mb2"
            src={get(firstPressItem, 'logoImage.data', '')}
          />
        </div>
        <div className="p3 flex flex-row justify-center flex-wrap">
          {pressItemsId.map((pressItemId, i) => (
            <PressCard
              key={pressItemId}
              pressCard={get(pressItems, `simpleFragments.${pressItemId}`, {})}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PressPageView;

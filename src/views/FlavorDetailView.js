import React, { Component } from 'react';
import get from 'utils/get';
import CardsBlock from 'components/CardsBlock';

import BlockSwitch from 'components/BlockSwitch';

class FlavorDetailView extends Component {
  render() {
    const { model, flavor, cardsBlock } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const blocks = get(flavor, 'contentBlocks', []);
    const cardsBlockHasData = Object.values(cardsBlock).length;

    return (
      <div className="FlavorDetailView">
        {blocks &&
          blocks.map((block, i) => (
            <BlockSwitch
              key={get(block, 'sys.id', i)}
              block={block}
              z={blocks.length - i}
              {...this.props}
            />
          ))}
        {cardsBlockHasData ? <CardsBlock cardsBlock={cardsBlock} /> : null}
      </div>
    );
  }
}

export default FlavorDetailView;

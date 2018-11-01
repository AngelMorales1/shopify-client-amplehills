import React, { Component } from 'react';
import get from 'utils/get';
import CardsBlock from 'components/CardsBlock';

import BlockSwitch from 'components/BlockSwitch';
import EventDetailHero from 'components/EventDetailHero';

class EventDetailView extends Component {
  render() {
    const { model, event, cardsBlock } = this.props;
    const blocks = get(event, 'contentBlocks', []);

    if (model.isError) return <h1>Error</h1>;
    const cardsBlockHasData = Object.values(cardsBlock).length;

    return (
      <div className="EventDetailView">
        <EventDetailHero event={event} {...this.props} />
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

export default EventDetailView;

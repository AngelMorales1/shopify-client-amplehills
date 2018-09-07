import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import EventDetailHero from 'components/EventDetailHero';

class EventDetailView extends Component {
  render() {
    const { model, event } = this.props;
    const blocks = get(event, 'contentBlocks', []);

    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="EventDetailView">
        <EventDetailHero event={event} {...this.props} />
        {blocks &&
          blocks.map((block, i) => (
            <BlockSwitch
              key={`${i}-${get(block, 'sys.id', i)}`}
              block={block}
              z={blocks.length - i}
              {...this.props}
            />
          ))}
      </div>
    );
  }
}

export default EventDetailView;

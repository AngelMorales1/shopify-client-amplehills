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
          blocks.map((block, i) => {
            const isUpperDripOn = get(block, 'fields.upperDrip', false);
            const additionalZIndex = isUpperDripOn ? 1 : 0;

            return (
              <BlockSwitch
                key={get(block, 'sys.id', i)}
                block={block}
                z={blocks.length - i + additionalZIndex}
                {...this.props}
              />
            );
          })}
      </div>
    );
  }
}

export default EventDetailView;

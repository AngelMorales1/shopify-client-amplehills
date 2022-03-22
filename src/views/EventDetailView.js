import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import EventDetailHero from 'components/EventDetailHero';
import EventDetailHeroV2 from 'components/EventDetailHeroV2';
import Meta from 'components/Meta';
import ErrorPage from 'components/ErrorPage';

class EventDetailView extends Component {
  render() {
    const { model, event } = this.props;
    const blocks = get(event, 'contentBlocks', []);

    if (model.isError) return <ErrorPage />;

    console.log('EEE', event);

    return (
      <div className="EventDetailView">
        <Meta
          title={event.seoTitle}
          description={event.seoDescription}
          image={event.seoImage}
        />
        {/* <EventDetailHero event={event} {...this.props} /> */}
        <EventDetailHeroV2 event={event} {...this.props} />
        {blocks &&
          blocks.map((block, i) => {
            const upperDripIsOn = get(block, 'fields.upperDrip', false);
            const additionalZIndex = upperDripIsOn ? 1 : 0;

            return (
              <BlockSwitch
                setRef={f => f}
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

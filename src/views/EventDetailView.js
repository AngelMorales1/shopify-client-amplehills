import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class EventDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="EventDetailView">
        <div>
          {/* {blocks &&
            blocks.map((block, i) => (
              <BlockSwitch
                key={`${i}-${get(block, 'sys.id', i)}`}
                block={block}
                z={blocks.length - i}
                {...this.props}
              />
            ))} */}
        </div>
      </div>
    );
  }
}

export default EventDetailView;

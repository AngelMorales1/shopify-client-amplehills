import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class FlavorDetailView extends Component {
  render() {
    const { model, flavor } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const blocks = get(flavor, 'contentBlocks', []);

    return (
      <div className="FlavorDetailView">
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

export default FlavorDetailView;

import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class FlavorDetailView extends Component {
  render() {
    const { model, flavor } = this.props;
    const blocks = get(flavor, 'contentBlocks', []);

    if (model.isError) return <h1>Error</h1>;

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
      </div>
    );
  }
}

export default FlavorDetailView;

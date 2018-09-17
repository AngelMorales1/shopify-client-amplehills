import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class GenericPageView extends Component {
  render() {
    const { model, blocks } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div>
        <div>
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
      </div>
    );
  }
}

export default GenericPageView;

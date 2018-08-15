import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';

class GenericPageView extends Component {
  render() {
    const { model, blocks } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const title = get(this.props, 'genericPage[0].fields.title', '');

    return (
      <div>
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">{title}</p>
          </div>
        </div>
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

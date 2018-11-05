import React, { Component, Fragment } from 'react';
import get from 'utils/get';

import MerchDetails from 'components/MerchDetails';
import BlockSwitch from 'components/BlockSwitch';

class MerchDetailView extends Component {
  render() {
    const { model, merch, actions, checkout } = this.props;
    if (model.isError) return <h1>Error</h1>;
    const blocks = get(merch, 'contentBlocks', []);

    return (
      <Fragment>
        <MerchDetails merch={merch} actions={actions} checkout={checkout} />
        {blocks &&
          blocks.map((block, i) => (
            <BlockSwitch
              key={get(block, 'sys.id', i)}
              block={block}
              z={blocks.length - i}
              {...this.props}
            />
          ))}
      </Fragment>
    );
  }
}

export default MerchDetailView;

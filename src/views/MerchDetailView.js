import React, { Component, Fragment } from 'react';
import get from 'utils/get';

import MerchDetails from 'components/MerchDetails';
import BlockSwitch from 'components/BlockSwitch';
import ErrorPage from 'components/ErrorPage';

class MerchDetailView extends Component {
  render() {
    const { model, merch, actions, checkout } = this.props;
    if (model.isError) return <ErrorPage />;
    const blocks = get(merch, 'contentBlocks', []);

    return (
      <Fragment>
        <MerchDetails merch={merch} actions={actions} checkout={checkout} />
        {blocks &&
          blocks.map((block, i) => {
            const upperDripIsOn = get(block, 'fields.upperDrip', false);
            const additionalZIndex = upperDripIsOn ? 1 : 0;

            return (
              <BlockSwitch
                key={get(block, 'sys.id', i)}
                block={block}
                z={blocks.length - i + additionalZIndex}
                {...this.props}
              />
            );
          })}
      </Fragment>
    );
  }
}

export default MerchDetailView;

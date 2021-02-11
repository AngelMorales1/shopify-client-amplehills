import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import ErrorPage from 'components/ErrorPage';

class FlavorFrenzyView extends Component {
  render() {
    const { model, flavor } = this.props;

    if (model.isError) return <ErrorPage />;

    console.log('MODEL', model);
    const blocks = get(flavor, 'contentBlocks', []);

    return (
      <div className="FlavorFrenzyView">
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
      </div>
    );
  }
}

export default FlavorFrenzyView;

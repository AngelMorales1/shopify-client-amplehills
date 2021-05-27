import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import Meta from 'components/Meta';
import ErrorPage from 'components/ErrorPage';

class FlavorDetailView extends Component {
  render() {
    const { model, flavor } = this.props;

    if (model.isError) return <ErrorPage />;

    const blocks = get(flavor, 'contentBlocks', []);

    return (
      <div className="FlavorDetailView">
        <Meta
          title={flavor.seoTitle}
          description={flavor.seoDescription}
          image={flavor.seoImage}
        />
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

export default FlavorDetailView;

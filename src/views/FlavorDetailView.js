import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import Meta from 'components/Meta';
import ErrorPage from 'components/ErrorPage';

class FlavorDetailView extends Component {
  render() {
    const { model, flavor } = this.props;

    if (model.isError) return <ErrorPage />;

    console.log('FLAV', flavor);

    return (
      <div className="FlavorDetailView">
        <Meta
          title={flavor.seoTitle}
          description={flavor.seoDescription}
          image={flavor.seoImage}
        />
        {flavor.blocks &&
          flavor.blocks.map((block, i) => {
            const upperDripIsOn = get(block, 'fields.upperDrip', false);
            const additionalZIndex = upperDripIsOn ? 1 : 0;

            return (
              <BlockSwitch
                key={get(block, '_key', i)}
                block={block}
                z={flavor.blocks.length - i + additionalZIndex}
                {...this.props}
              />
            );
          })}
      </div>
    );
  }
}

export default FlavorDetailView;

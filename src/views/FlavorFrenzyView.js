import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import ErrorPage from 'components/ErrorPage';
import FlavorFrenzyCarousel from 'components/FlavorFrenzyCarousel';

class FlavorFrenzyView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <ErrorPage />;

    const flavorFrenzy = get(model, 'flavorFrenzy');
    const votes = get(model, 'votes');
    const blocks = get(model, 'genericPage.items[0].fields.contentBlocks', []);

    if (!flavorFrenzy) return <ErrorPage />;

    return (
      <div className="FlavorFrenzyView">
        <FlavorFrenzyCarousel flavorFrenzy={flavorFrenzy} votes={votes} />
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

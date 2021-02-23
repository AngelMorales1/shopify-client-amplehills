import React, { Component, createRef } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';

import SCROLL_OPTIONS from 'constants/SubNavScrollOption';

import BlockSwitch from 'components/BlockSwitch';
import ErrorPage from 'components/ErrorPage';
import FlavorFrenzyCarousel from 'components/FlavorFrenzyCarousel';
import FlavorFrenzyPredictions from 'components/FlavorFrenzyPredictions';
import GenericHero from 'components/GenericHero';
import { Button } from 'components/base';

class FlavorFrenzyView extends Component {
  constructor(props) {
    super(props);

    const { model } = props;
    const blocks = get(model, 'genericPage.items[0].fields.contentBlocks', []);
    this.blockRefs = blocks.map(createRef);
    this.bracketIndex = blocks.findIndex(block => {
      const type = get(block, 'sys.contentType.sys.id');

      return type === 'blockFullWidthImages';
    });
  }

  render() {
    const { model } = this.props;

    if (model.isError) return <ErrorPage />;

    const flavorFrenzy = get(model, 'flavorFrenzy');
    const votes = get(model, 'votes');
    const blocks = get(model, 'genericPage.items[0].fields.contentBlocks', []);
    const predictionsAreActive = get(
      flavorFrenzy,
      'predictions.isActive',
      false
    );
    const winner = get(flavorFrenzy, 'winner');
    const votingIsActive = !predictionsAreActive && !winner;

    if (!flavorFrenzy) return <ErrorPage />;

    return (
      <div className="FlavorFrenzyView">
        <GenericHero
          block={{
            fields: {
              title: get(flavorFrenzy, 'hero.title', flavorFrenzy.name),
              text: get(flavorFrenzy, 'hero.description'),
              drip: true,
              color: 'pink'
            }
          }}
          renderButton={() => (
            <div className="flex justify-center">
              <Button
                ariaLabel="Scroll to Flavor Frenzy"
                variant="primary"
                color="madison-blue"
                type="button"
                onClick={() =>
                  scrollTo(this.blockRefs[this.bracketIndex].current, {
                    ...SCROLL_OPTIONS,
                    offset: -200
                  })
                }
              >
                {get(flavorFrenzy, 'hero.buttonText', 'Let the Games Begin!')}
              </Button>
            </div>
          )}
        />
        {predictionsAreActive && (
          <FlavorFrenzyPredictions flavorFrenzy={flavorFrenzy} />
        )}
        {votingIsActive && (
          <FlavorFrenzyCarousel flavorFrenzy={flavorFrenzy} votes={votes} />
        )}
        {blocks &&
          blocks.map((block, i) => {
            const upperDripIsOn = get(block, 'fields.upperDrip', false);
            const additionalZIndex = upperDripIsOn ? 1 : 0;

            return (
              <BlockSwitch
                blockRef={this.blockRefs[i]}
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

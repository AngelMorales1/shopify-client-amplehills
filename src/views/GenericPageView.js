import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';

import BlockSwitch from 'components/BlockSwitch';
import { SubNav } from 'components/base';

class GenericPageView extends Component {
  $blocks = {};

  render() {
    const { model, blocks, subNavIsOn } = this.props;

    const menuList = blocks.reduce((acc, cur) => {
      const blockType = get(cur, 'sys.contentType.sys.id', '');
      if (blockType === 'blockGenericHero') {
        return acc;
      }

      const title = get(cur, 'fields.title', '');
      acc.push(title);

      return acc;
    }, []);

    if (model.isError) return <h1>Error</h1>;

    return (
      <Fragment>
        {subNavIsOn ? (
          <SubNav
            onClick={menuTitle =>
              scrollTo(this.$blocks[menuTitle], {
                ease: 'inOutQuint',
                duration: 1000
              })
            }
            menuList={menuList}
          />
        ) : null}
        <div>
          {blocks &&
            blocks.map((block, i) => {
              const title = get(block, 'fields.title', '');

              return (
                <BlockSwitch
                  setRef={$block => (this.$blocks[title] = $block)}
                  key={`${i}-${get(block, 'sys.id', i)}`}
                  block={block}
                  z={blocks.length - i}
                  {...this.props}
                />
              );
            })}
        </div>
      </Fragment>
    );
  }
}

export default GenericPageView;

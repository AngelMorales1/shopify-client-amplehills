import React, { Component } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';

import BlockSwitch from 'components/BlockSwitch';
import { SubNav } from 'components/base';

class GenericPageView extends Component {
  state = {
    selectedMenu: ''
  };

  $blocks = {};

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedMenu !== this.state.selectedMenu) {
      scrollTo(this.$blocks[this.state.selectedMenu], {
        duration: 1000
      });
    }
  };

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
      <div>
        {subNavIsOn ? (
          <SubNav
            onClick={menuTitle => this.setState({ selectedMenu: menuTitle })}
            menuList={menuList}
          />
        ) : null}
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
    );
  }
}

export default GenericPageView;

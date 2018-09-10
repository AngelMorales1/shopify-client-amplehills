import React, { Component } from 'react';
import get from 'utils/get';

import BlockSwitch from 'components/BlockSwitch';
import { SubNav } from 'components/base';

class GenericPageView extends Component {
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
        {subNavIsOn ? <SubNav menuList={menuList} /> : null}
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
    );
  }
}

export default GenericPageView;

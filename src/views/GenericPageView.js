import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';
import SubNavScrollOption from 'constants/SubNavScrollOption';

import BlockSwitch from 'components/BlockSwitch';
import { SubNav } from 'components/base';

class GenericPageView extends Component {
  refBlocks = {};

  render() {
    const { model, blocks, subNavIsOn } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const menuList = get(this, 'props.blocks', []).reduce((menu, block) => {
      const blockType = get(block, 'sys.contentType.sys.id', '');
      const fields = get(block, 'fields', false);

      if (blockType === 'blockGenericHero' || fields === false) {
        return menu;
      }

      const title = get(block, 'fields.title', '');
      menu.push(title);

      return menu;
    }, []);
    console.log(this.props);
    return (
      <Fragment>
        {subNavIsOn ? (
          <SubNav
            onClick={menuTitle =>
              scrollTo(this.refBlocks[menuTitle], SubNavScrollOption)
            }
            menuList={menuList}
            className="subnav"
          />
        ) : null}
        <div>
          {blocks &&
            blocks.map((block, i) => {
              const title = get(block, 'fields.title', '');

              return (
                <BlockSwitch
                  setRef={refBlock => (this.refBlocks[title] = refBlock)}
                  key={get(block, 'sys.id', i)}
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

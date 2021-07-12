import React, { Component, Fragment } from 'react';
import get from 'utils/get';
import scrollTo from 'react-scroll-to-component';
import SubNavScrollOption from 'constants/SubNavScrollOption';

import BlockSwitch from 'components/BlockSwitch';
import Meta from 'components/Meta';
import ErrorPage from 'components/ErrorPage';
import { SubNav } from 'components/base';

class GenericPageView extends Component {
  refBlocks = {};

  render() {
    const { model, pageNotFound } = this.props;

    if (model.isError) return <ErrorPage />;

    if (pageNotFound) return <ErrorPage errorIs404={true} />;

    const genericPage = model.genericPage;
    const blocks = get(genericPage, 'blocks', []);
    const showSubnav = get(genericPage, 'showSubnav', false);

    const menuList = blocks.reduce((menu, block) => {
      const blockType = get(block, '_type', '');
      const title = get(block, 'title', '') || get(block, 'name', '');

      if (blockType !== 'genericHero' && !!title) menu.push(title);

      return menu;
    }, []);

    const slug = get(genericPage, 'slug', '');
    const seoTitle = get(genericPage, 'seoTitle', '')
      ? get(genericPage, 'seoTitle', '')
      : slug === '/'
      ? 'Ample Hills Creamery – Order Online'
      : `${get(
          model,
          'genericPage.items[0].fields.title',
          ''
        )} - Ample Hills Creamery`;

    const seoDescription = get(genericPage, 'seoDescription', '');
    const seoImage = get(model, 'seoImage', '');

    return (
      <Fragment>
        <Meta title={seoTitle} description={seoDescription} image={seoImage} />
        {showSubnav ? (
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
              const title = get(block, 'title', '') || get(block, 'name', '');
              const upperDripIsOn = get(block, 'upperDrip', false);
              const additionalZIndex = upperDripIsOn ? 1 : 0;

              return (
                <BlockSwitch
                  setRef={refBlock => (this.refBlocks[title] = refBlock)}
                  key={get(block, 'sys.id', i)}
                  block={block}
                  z={blocks.length - i + additionalZIndex}
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

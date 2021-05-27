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
    const { model, blocks, subNavIsOn, pageNotFound } = this.props;

    if (model.isError) return <ErrorPage />;

    if (pageNotFound) return <ErrorPage errorIs404={true} />;

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

    const slug = get(model, 'genericPage.items[0].fields.slug', '');
    const seoTitle = get(model, 'genericPage.items[0].fields.seoTitle', '')
      ? get(model, 'genericPage.items[0].fields.seoTitle', '')
      : slug === '/'
      ? 'Ample Hills Creamery – Order Online'
      : `${get(
          model,
          'genericPage.items[0].fields.title',
          ''
        )} - Ample Hills Creamery`;

    const seoDescription = get(
      model,
      'genericPage.items[0].fields.seoDescription',
      ''
    );
    const seoImage = get(
      model,
      'genericPage.items[0].fields.seoImage.fields.file.url',
      ''
    );

    return (
      <Fragment>
        <Meta title={seoTitle} description={seoDescription} image={seoImage} />
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
              const upperDripIsOn = get(block, 'fields.upperDrip', false);
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

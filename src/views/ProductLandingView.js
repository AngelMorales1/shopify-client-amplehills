import React, { Component } from 'react';
import marked from 'marked';
import scrollTo from 'react-scroll-to-component';
import SubNavScrollOption from 'constants/SubNavScrollOption';

import { SubNav } from 'components/base';
import get from 'utils/get';
import ProductGrid from 'components/ProductGrid';
import WholesaleInfoBlock from 'components/WholesaleInfoBlock';

class ProductLandingView extends Component {
  refBlocks = {};

  render() {
    const { model, products, allMerchandise } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const content = get(model, 'landing.items[0].fields', {});
    const iceCreamTitle = get(content, 'iceCreamTitle', '');
    const merchandiseTitle = get(content, 'merchandiseTitle', '');

    const iceCreamGridProducts = get(content, 'iceCreamProducts', []).map(
      product => {
        const handle = get(product, 'fields.productHandle', '');
        return products[handle];
      }
    );

    const merchandiseGridProducts = get(content, 'merchandiseProducts', []).map(
      product => {
        const handle = get(product, 'fields.handle', '');
        return allMerchandise[handle];
      }
    );

    const subNavIsOn = get(content, 'subNavigation', false);
    const menuList = () => {
      const menu = [];

      if (iceCreamTitle) {
        menu.push(iceCreamTitle);
      }

      if (merchandiseTitle) {
        menu.push(merchandiseTitle);
      }

      return menu;
    };

    return (
      <div className="ProductLanding mb3 transition-slide-up">
        {subNavIsOn ? (
          <div className="drip w100 bg-pastel-peach py4">
            <SubNav
              onClick={menuTitle =>
                scrollTo(this.refBlocks[menuTitle], SubNavScrollOption)
              }
              menuList={menuList()}
              className="subnav"
            />
          </div>
        ) : null}
        <div className="my4 px3 text-container-width mx-auto center">
          <h2 className="block-headline text-peach mb2">{iceCreamTitle}</h2>
          <p
            ref={refBlock => (this.refBlocks[iceCreamTitle] = refBlock)}
            dangerouslySetInnerHTML={{
              __html: marked(get(content, 'iceCreamDescription', ''))
            }}
            className="markdown-block"
          />
        </div>
        <ProductGrid products={iceCreamGridProducts} />
        <div className="my4 pt4 px3 text-container-width mx-auto center">
          <h2 className="block-headline text-peach mb2">{merchandiseTitle}</h2>
          <p
            ref={refBlock => (this.refBlocks[merchandiseTitle] = refBlock)}
            dangerouslySetInnerHTML={{
              __html: marked(get(content, 'merchandiseDescription', ''))
            }}
            className="markdown-block"
          />
        </div>
        <ProductGrid
          products={merchandiseGridProducts}
          productIsMerchandise={true}
        />
        {!get(content, 'hideWholesaleBlock', false) ? (
          <WholesaleInfoBlock
            image={get(content, 'wholesaleImage.fields.file.url', '')}
            title={get(content, 'wholesaleTitle', '')}
            description={get(content, 'wholesaleDescription', '')}
          />
        ) : null}
      </div>
    );
  }
}

export default ProductLandingView;

import React from 'react';

import get from 'utils/get';

import ProductHero from 'components/ProductHero';
import ProductDetails from 'components/ProductDetails';
import ImageText from 'components/ImageText';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';
import ProductWhatsIncluded from 'components/ProductWhatsIncluded';

const BlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');
  // const { block, product, z } = props;
  // const contentType = get(block, 'sys.contentType.sys.id');
  // const fields = get(block, 'fields');
  // const { block, product, z } = props;
  // const contentType = get(block, 'sys.contentType.sys.id');
  // const fields = get(block, 'fields');
  const productDetailBlocks = get(block, 'fields.productDetails', []);

  // const {
  //   addLineItemsStatus,
  //   globalSettings,
  //   ourPledge,
  //   checkout,
  //   shippingDates,
  //   actions: { addLineItems }
  // } = props;

  switch (type) {
    case 'blockProductHero':
      return <ProductHero {...props} />;
    case 'blockProductDetails':
      const viewWhatsIncluded = get(block, 'fields.whatsIncluded', false);
      if ('blockProductDetails' && viewWhatsIncluded) {
        return (
          <React.Fragment>
            <ProductWhatsIncluded productDetails={productDetailBlocks} />
            <ProductDetails {...props} />
          </React.Fragment>
        );
      }
      return <ProductDetails {...props} />;
    case 'blockImageText':
      return <ImageText {...props} />;
    case 'blockChooseYourOwnStory':
      return <ChooseYourOwnStory {...props} />;
    default:
      return null;
  }
};

export default BlockSwitch;

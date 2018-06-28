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
  const productDetailBlocks = get(block, 'fields.productDetails', []);
  const viewWhatsIncluded = get(block, 'fields.whatsIncluded', false);

  switch (type) {
    case 'blockProductHero':
      return <ProductHero {...props} />;
    case 'blockProductDetails':
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

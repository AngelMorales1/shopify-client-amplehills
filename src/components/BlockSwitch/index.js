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

  switch (type) {
    case 'blockProductHero':
      return <ProductHero {...props} />;
    case 'blockProductDetails':
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

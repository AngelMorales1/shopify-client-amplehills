import React from 'react';

import get from 'utils/get';

import ProductHero from 'components/ProductHero';
import ProductDetails from 'components/ProductDetails';

const BlockSwitch = props => {
  const { block } = props;
  const contentType = get(block, 'sys.contentType.sys.id');
  const fields = get(block, 'fields');

  switch (contentType) {
    case 'blockProductHero':
      return <ProductHero data={fields} />;
    case 'blockProductDetails':
      return <ProductDetails data={fields} />;
    default:
      return null;
  }
};

export default BlockSwitch;

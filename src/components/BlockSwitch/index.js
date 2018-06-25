import React from 'react';

import get from 'utils/get';

import ProductHero from 'components/ProductHero';
import ProductDetails from 'components/ProductDetails';
import ImageText from 'components/ImageText';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';

const BlockSwitch = props => {
  const { block, product, z } = props;
  const contentType = get(block, 'sys.contentType.sys.id');
  const fields = get(block, 'fields');
  const {
    addLineItemsStatus,
    globalSettings,
    ourPledgeBlocks,
    checkout,
    shippingDates,
    actions: { addLineItems }
  } = props;

  console.log('o', props.ourPledge, ourPledgeBlocks);
  switch (contentType) {
    case 'blockProductHero':
      return (
        <ProductHero
          data={fields}
          product={product}
          z={z}
          addLineItems={addLineItems}
          addLineItemsStatus={addLineItemsStatus}
          shippingDates={shippingDates}
          checkout={checkout}
          globalSettings={globalSettings}
          ourPledge={ourPledgeBlocks}
        />
      );
    case 'blockProductDetails':
      return <ProductDetails data={fields} z={z} />;
    case 'blockImageText':
      return <ImageText data={fields} z={z} />;
    case 'blockChooseYourOwnStory':
      return (
        <ChooseYourOwnStory ourPledge={ourPledgeBlocks} data={fields} z={z} />
      );
    default:
      return null;
  }
};

export default BlockSwitch;

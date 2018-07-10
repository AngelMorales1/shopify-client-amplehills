import React from 'react';

import PropTypes from 'prop-types';
import get from 'utils/get';

import ProductHero from 'components/ProductHero';
import ProductDetails from 'components/ProductDetails';
import ImageText from 'components/ImageText';
import ImageDoubleText from 'components/ImageDoubleText';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';
import ProductWhatsIncluded from 'components/ProductWhatsIncluded';

const BlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');

  switch (type) {
    case 'blockProductHero':
      return <ProductHero {...props} />;
    case 'blockWhatsIncluded':
      return <ProductWhatsIncluded {...props} />;
    case 'blockProductDetails':
      return <ProductDetails {...props} />;
    case 'blockImageText':
      return <ImageText {...props} />;
    case 'blockImageDoubleText':
      return <ImageDoubleText {...props} />;
    case 'blockChooseYourOwnStory':
      return <ChooseYourOwnStory {...props} />;
    default:
      return null;
  }
};

export default BlockSwitch;

BlockSwitch.propTypes = {
  actions: PropTypes.shape({
    addLineItems: PropTypes.func,
    fetchOutPledge: PropTypes.func
  }),
  addLineItemsStatus: PropTypes.string,
  block: PropTypes.object,
  checkout: PropTypes.string,
  globalSettings: PropTypes.shape({
    facebookLink: PropTypes.string,
    footerIllustration: PropTypes.shape({
      fields: PropTypes.object,
      sys: PropTypes.object
    }),
    instagramLink: PropTypes.string,
    ourPledgeIcon: PropTypes.shape({
      fields: PropTypes.object,
      sys: PropTypes.object
    }),
    shipping2: PropTypes.string,
    shippingDates: PropTypes.string,
    title: PropTypes.string,
    twitterLink: PropTypes.string
  }),
  history: PropTypes.shape({
    action: PropTypes.string,
    block: PropTypes.func,
    createHref: PropTypes.func,
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    length: PropTypes.number,
    listen: PropTypes.func,
    location: PropTypes.object,
    push: PropTypes.func,
    replace: PropTypes.func
  }),
  location: PropTypes.object,
  match: PropTypes.object,
  model: PropTypes.object,
  ourPledge: PropTypes.object,
  product: PropTypes.object,
  products: PropTypes.object,
  shippingDates: PropTypes.array,
  view: PropTypes.func
};

BlockSwitch.defaultProps = {
  actions: {
    addLineItems: () => {},
    fetchOutPledge: () => {}
  },
  addLineItemsStatus: '',
  block: {},
  checkout: '',
  globalSettings: {
    facebookLink: '',
    footerIllustration: {
      fields: {},
      sys: {}
    },
    instagramLink: '',
    ourPledgeIcon: {
      fields: {},
      sys: {}
    },
    shipping2: '',
    shippingDates: '',
    title: '',
    twitterLink: ''
  },
  history: {
    action: '',
    block: () => {},
    createHref: () => {},
    go: () => {},
    goBack: () => {},
    goForward: () => {},
    length: 0,
    listen: () => {},
    location: {},
    push: () => {},
    replace: () => {}
  },
  location: {},
  match: {},
  model: {},
  ourPledge: {},
  product: {},
  products: {},
  shippingDates: [],
  view: () => {}
};

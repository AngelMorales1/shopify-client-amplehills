import React from 'react';

import get from 'utils/get';

import ProductDetails from 'components/ProductDetails';
import ImageText from 'components/ImageText';
import ImageDoubleText from 'components/ImageDoubleText';
import ChooseYourOwnStory from 'components/ChooseYourOwnStory';
import ComicStrip from 'components/ComicStrip';
import MarkdownBlock from 'components/MarkdownBlock';
import GenericHero from 'components/GenericHero';

const BlockSwitch = props => {
  const { block } = props;
  const type = get(block, 'sys.contentType.sys.id');

  switch (type) {
    case 'blockProductDetails':
      return <ProductDetails {...props} />;
    case 'blockImageText':
      return <ImageText {...props} />;
    case 'blockImageDoubleText':
      return <ImageDoubleText {...props} />;
    case 'blockChooseYourOwnStory':
      return <ChooseYourOwnStory {...props} />;
    case 'blockComicStrip':
      return <ComicStrip {...props} />;
    case 'blockMarkdown':
      return <MarkdownBlock {...props} />;
    case 'blockGenericHero':
      return <GenericHero {...props} />;
    default:
      return null;
  }
};

export default BlockSwitch;

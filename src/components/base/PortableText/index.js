import React, { Fragment } from 'react';
import BlockContent from '@sanity/block-content-to-react';

import TwoUpCardLinks from 'components/TwoUpCardLinks';

const PortableText = ({ blocks }) => {
  if (!Array.isArray(blocks)) return null;

  const Block = (block, i) => {
    switch (block._type) {
      case 'block':
        return <BlockContent blocks={[block]} />;
      case 'twoUpCardLinks':
        return <TwoUpCardLinks block={block} />;
      default:
        return null;
    }
  };

  return <Fragment>{blocks.map(Block)}</Fragment>;
};

export default PortableText;

import React from 'react';
import BlockContent from '@sanity/block-content-to-react';

const PortableText = ({ blocks }) => <BlockContent blocks={blocks} />;

export default PortableText;

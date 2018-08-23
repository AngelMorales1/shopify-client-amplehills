import React from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import { Image, Button } from 'components/base';

const HorizontalCarousel = ({ block, z }) => {
  const fields = get(block, 'fields', {});
  const contentBlocks = get(fields, 'contentBlocks', []);

  return (
    <div className="bg-bees-wax">
      <div>
        <span>{get(fields, 'title', '')}</span>
        <Button label={get(fields, 'buttonLabel', '')} />
      </div>
      <div>
        {contentBlocks.map(contentBlock => {
          return <div>block</div>;
        })}
      </div>
    </div>
  );
};

export default HorizontalCarousel;

import React, { Component } from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Image } from 'components/base';
import BlockSwitch from 'components/BlockSwitch';

class OurStoryPageView extends Component {
  render() {
    const { title, image, color, blocks } = this.props;
    const heroClasses = `${
      color === 'yellow' ? 'bg-bees-wax' : null
    } flex flex-column items-center py4 px2 drip z-sub-nav`;

    return (
      <div>
        <div className={heroClasses}>
          <h2 className="block-headline my3">{title}</h2>
          <Image
            className="col-8 md-col-6 mt4"
            alt={`${title} image`}
            src={contentfulImgUtil(
              get(image, 'fields.file.url', ''),
              '1400',
              'png'
            )}
          />
        </div>
        {blocks &&
          blocks.map((block, i) => (
            <BlockSwitch
              key={`${i}-${get(block, 'sys.id', i)}`}
              block={block}
              z={blocks.length - i}
            />
          ))}
      </div>
    );
  }
}

export default OurStoryPageView;

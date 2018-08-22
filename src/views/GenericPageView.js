import React, { Component } from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import BlockSwitch from 'components/BlockSwitch';
import { Image } from 'components/base';

class GenericPageView extends Component {
  render() {
    const { model, blocks } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const title = get(this.props, 'genericPage[0].fields.title', '');
    const image = get(this.props, 'genericPage[0].fields.image', null);
    return (
      <div>
        <div className="bg-iceberg pb2 drip z-sub-nav">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">{title}</p>
            {image ? (
              <Image
                className="col-8 md-col-6 mt4"
                alt={`${title} image`}
                src={contentfulImgUtil(
                  get(image, 'fields.file.url', ''),
                  '1400',
                  'png'
                )}
              />
            ) : null}
          </div>
        </div>
        <div className="drip-padding-on-children">
          {blocks &&
            blocks.map((block, i) => (
              <BlockSwitch
                key={`${i}-${get(block, 'sys.id', i)}`}
                block={block}
                z={blocks.length - i}
                {...this.props}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default GenericPageView;

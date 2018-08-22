import React, { Component } from 'react';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';
import cx from 'classnames';

import BlockSwitch from 'components/BlockSwitch';
import { Image } from 'components/base';

class GenericPageView extends Component {
  render() {
    const { model, blocks } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div>
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
    );
  }
}

export default GenericPageView;

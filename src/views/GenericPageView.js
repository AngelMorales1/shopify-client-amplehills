import React, { Component } from 'react';
import get from 'utils/get';

import MarkdownBlock from 'components/MarkdownBlock';

class GenericPageView extends Component {
  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    const title = get(this.props, 'genericPage[0].fields.title', '');
    const content = get(this.props, 'genericPage[0].fields.contentBlock', '');

    return (
      <div>
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">{title}</p>
          </div>
        </div>
        <MarkdownBlock content={content} />
      </div>
    );
  }
}

export default GenericPageView;

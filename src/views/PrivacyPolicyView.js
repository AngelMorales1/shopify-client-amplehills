import React, { Component } from 'react';
import marked from 'marked';

import get from 'utils/get';

class PrivacyPolicyView extends Component {
  createMarkup() {
    return { __html: marked(get(this.props.privacyPolicy, 'content', '')) };
  }

  render() {
    const { model } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="PrivacyPolicy">
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">Privacy Policy</p>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={this.createMarkup()}
          className="container-width transition-slide-up mx-auto my3 px3"
        />
      </div>
    );
  }
}

export default PrivacyPolicyView;

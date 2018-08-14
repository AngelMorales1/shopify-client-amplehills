import React, { Component } from 'react';

import PrivacyPolicy from 'components/PrivacyPolicy';

class PrivacyPolicyView extends Component {
  render() {
    const { model, privacyPolicy } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div>
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">Privacy Policy</p>
          </div>
        </div>
        <PrivacyPolicy privacyPolicy={privacyPolicy} />
      </div>
    );
  }
}

export default PrivacyPolicyView;

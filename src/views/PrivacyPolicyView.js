import React, { Component } from 'react';

class PrivacyPolicy extends Component {
  render() {
    const { model, privacyPolicy } = this.props;

    if (model.isError) return <h1>Error</h1>;

    return (
      <div className="PrivacyPolicy">
        <div className="bg-iceberg drip pb2">
          <div className="transition-slide-up container-width mx-auto pt4 px2 center">
            <p className="block-headline pt3 pb4">Privacy Policy</p>
          </div>
        </div>
        <div className="container-width transition-slide-up mx-auto my3 px3">
          {privacyPolicy.privacyPolicyContent}
        </div>
      </div>
    );
  }
}

export default PrivacyPolicy;

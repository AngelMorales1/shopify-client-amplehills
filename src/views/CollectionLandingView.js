import React, { Component } from "react";
import get from "utils/get";

class CollectionLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="CollectionLanding">CollectionLanding</div>;
  }
}

export default CollectionLandingView;

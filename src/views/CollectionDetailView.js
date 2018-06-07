import React, { Component } from "react";
import get from "utils/get";

class CollectionDetailView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="CollectionDetail">CollectionDetail</div>;
  }
}

export default CollectionDetailView;

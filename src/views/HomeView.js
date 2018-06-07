import React, { Component } from "react";
import get from "utils/get";

class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="Home">Welcome Home!</div>;
  }
}

export default HomeView;

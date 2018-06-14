import React, { Component } from 'react';

class HomeView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    return <div className="Home">Welcome Home!</div>;
  }
}

export default HomeView;

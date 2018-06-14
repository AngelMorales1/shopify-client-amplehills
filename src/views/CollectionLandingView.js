import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

class CollectionLandingView extends Component {
  render() {
    const { model } = this.props;
    if (model.isError) return <h1>Error</h1>;

    const collections = model.value;

    return (
      <div className="CollectionLanding">
        <h1 className="mb2">CollectionLanding</h1>
        {collections.map(collection => (
          <NavLink exact to={`/collections/${collection.handle}`}>
            <li key={collection.id}>{collection.title}</li>
          </NavLink>
        ))}
      </div>
    );
  }
}

export default CollectionLandingView;

import React from "react";
import { Route, Switch } from "react-router-dom";

import HomeContainer from "containers/HomeContainer";
import ProductLandingContainer from "containers/ProductLandingContainer";
import ProductDetailContainer from "containers/ProductDetailContainer";
import CollectionLandingContainer from "containers/CollectionLandingContainer";
import CollectionDetailContainer from "containers/CollectionDetailContainer";

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/products/:product_id" component={ProductDetailContainer} />
    <Route path="/products" component={ProductLandingContainer} />
    <Route
      path="/collections/:collection_id"
      component={CollectionDetailContainer}
    />
    <Route path="/collections" component={CollectionLandingContainer} />
  </Switch>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import ProductLandingContainer from 'containers/ProductLandingContainer';
import ProductDetailContainer from 'containers/ProductDetailContainer';
import CollectionLandingContainer from 'containers/CollectionLandingContainer';
import CollectionDetailContainer from 'containers/CollectionDetailContainer';
import ContactUsContainer from 'components/ContactUs';

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomeContainer} />
    <Route path="/products/:productHandle" component={ProductDetailContainer} />
    <Route path="/products" component={ProductLandingContainer} />
    <Route
      path="/collections/:collectionHandle"
      component={CollectionDetailContainer}
    />
    <Route path="/collections" component={CollectionLandingContainer} />
    <Route path="/contact" component={ContactUsContainer} />
  </Switch>
);

export default Routes;

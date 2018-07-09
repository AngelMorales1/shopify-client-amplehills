import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import ProductLandingContainer from 'containers/ProductLandingContainer';
import ProductDetailContainer from 'containers/ProductDetailContainer';
import ProfileContainer from 'containers/ProfileContainer';
import ContactUsContainer from 'components/ContactUs';
import Cart from 'components/Cart';

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomeContainer} />
    <Route
      exact
      path="/products/:productHandle"
      component={ProductDetailContainer}
    />
    <Route path="/products" component={ProductLandingContainer} />
    <Route path="/profile" component={ProfileContainer} />
    <Route path="/contact" component={ContactUsContainer} />
    <Route path="/cart" component={Cart} />
  </Switch>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeContainer from 'containers/HomeContainer';
import ProductLandingContainer from 'containers/ProductLandingContainer';
import ProductDetailContainer from 'containers/ProductDetailContainer';
import ProfileContainer from 'containers/ProfileContainer';
import SignInContainer from 'containers/SignInContainer';
import SignUpContainer from 'containers/SignUpContainer';
import LocationsLandingContainer from 'containers/LocationsLandingContainer';
import ContactUsContainer from 'containers/ContactUsContainer';
import Cart from 'components/Cart';

const Routes = ({ location, alertIsActive }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomeContainer} />
    <Route
      exact
      path="/products/:productHandle"
      component={ProductDetailContainer}
    />
    <Route path="/products" component={ProductLandingContainer} />
    <Route path="/profile" component={ProfileContainer} />
    <Route path="/sign-in" component={SignInContainer} />
    <Route path="/sign-up" component={SignUpContainer} />
    <Route path="/locations" component={LocationsLandingContainer} />
    <Route path="/contact" component={ContactUsContainer} />
    <Route path="/cart" component={Cart} />
  </Switch>
);

export default Routes;

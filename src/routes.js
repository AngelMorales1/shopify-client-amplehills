import React from 'react';
import { Route, Switch } from 'react-router-dom';
import isStaging from 'utils/isStaging';

import HomeContainer from 'containers/HomeContainer';
import ProductLandingContainer from 'containers/ProductLandingContainer';
import ProductDetailContainer from 'containers/ProductDetailContainer';
import ProfileContainer from 'containers/ProfileContainer';
import SignInContainer from 'containers/SignInContainer';
import SignUpContainer from 'containers/SignUpContainer';
import LocationsLandingContainer from 'containers/LocationsLandingContainer';
import ContactUsContainer from 'containers/ContactUsContainer';
import Cart from 'components/Cart';
import GenericPageContainer from 'containers/GenericPageContainer';
import PressPageContainer from 'containers/PressPageContainer';
import OurStoryPageContainer from 'containers/OurStoryPageContainer';

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
    <Route path="/sign-in" component={SignInContainer} />
    <Route path="/sign-up" component={SignUpContainer} />
    <Route path="/locations" component={LocationsLandingContainer} />
    <Route path="/contact" component={ContactUsContainer} />
    <Route path="/cart" component={Cart} />
    <Route path="/privacy-policy" component={GenericPageContainer} />
    <Route path="/web-accessibility" component={GenericPageContainer} />
    <Route path="/our-story" component={GenericPageContainer} />
    <Route path="/press" component={PressPageContainer} />
    {isStaging() ? (
      <Route path="/style-guide" component={GenericPageContainer} />
    ) : null}
    <Route path="/our-story" component={OurStoryPageContainer} />
  </Switch>
);

export default Routes;

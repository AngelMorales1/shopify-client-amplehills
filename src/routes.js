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
import EventDetailContainer from 'containers/EventDetailContainer';
import LocationDetailContainer from 'containers/LocationDetailContainer';
import PartyRequestFormContainer from 'containers/PartyRequestFormContainer';
import ArticlesLandingContainer from 'containers/ArticlesLandingContainer';
import ArticleDetailContainer from 'containers/ArticleDetailContainer';

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={HomeContainer} />
    <Route
      exact
      path="/products/:productHandle"
      component={ProductDetailContainer}
    />
    <Route exact path="/events/:eventHandle" component={EventDetailContainer} />
    <Route
      exact
      path="/location/:locationId"
      component={LocationDetailContainer}
    />
    <Route
      exact
      path="/news/:articleHandle"
      component={ArticleDetailContainer}
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
    <Route path="/press" component={PressPageContainer} />
    {isStaging() ? (
      <Route path="/style-guide" component={GenericPageContainer} />
    ) : null}
    <Route path="/our-story" component={GenericPageContainer} />
    <Route path="/press" component={PressPageContainer} />
    <Route path="/classes-and-socials" component={GenericPageContainer} />
    <Route path="/ice-cream-classes" component={GenericPageContainer} />
    <Route path="/ice-cream-socials" component={GenericPageContainer} />
    <Route path="/events" component={GenericPageContainer} />
    <Route path="/weddings" component={GenericPageContainer} />
    <Route path="/parties" component={GenericPageContainer} />
    <Route path="/field-trips" component={GenericPageContainer} />
    <Route path="/pints-and-postcards" component={GenericPageContainer} />
    <Route path="/catering" component={GenericPageContainer} />
    <Route path="/bike-party" component={GenericPageContainer} />
    <Route path="/scoop-tab-party" component={GenericPageContainer} />
    <Route path="/ice-cream-cakes" component={GenericPageContainer} />
    <Route path="/party-request-form" component={PartyRequestFormContainer} />
    <Route path="/faq" component={GenericPageContainer} />
    <Route path="/news" component={ArticlesLandingContainer} />
    <Route path="/wholesale" component={GenericPageContainer} />
  </Switch>
);

export default Routes;

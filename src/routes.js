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
import EventDetailContainer from 'containers/EventDetailContainer';
import LocationDetailContainer from 'containers/LocationDetailContainer';
import PartyRequestFormContainer from 'containers/PartyRequestFormContainer';
import CakeRequestFormContainer from 'containers/CakeRequestFormContainer';
import ArticlesLandingContainer from 'containers/ArticlesLandingContainer';
import ArticleDetailContainer from 'containers/ArticleDetailContainer';
import MerchDetailContainer from 'containers/MerchDetailContainer';
import FlavorDetailContainer from 'containers/FlavorDetailContainer';
import InStoresContainer from 'containers/InStoresContainer';

const Routes = ({ location }) => (
  <Switch location={location}>
    <Route exact path="/" component={GenericPageContainer} />
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
    <Route
      exact
      path="/merchandise/:merchHandle"
      component={MerchDetailContainer}
    />
    <Route
      exact
      path="/flavors/:flavorHandle"
      component={FlavorDetailContainer}
    />
    <Route exact path="/products" component={ProductLandingContainer} />
    <Route exact path="/profile" component={ProfileContainer} />
    <Route exact path="/sign-in" component={SignInContainer} />
    <Route exact path="/sign-up" component={SignUpContainer} />
    <Route exact path="/locations" component={LocationsLandingContainer} />
    <Route exact path="/contact" component={ContactUsContainer} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/privacy-policy" component={GenericPageContainer} />
    <Route exact path="/web-accessibility" component={GenericPageContainer} />
    <Route exact path="/press" component={GenericPageContainer} />
    <Route exact path="/our-story" component={GenericPageContainer} />
    <Route exact path="/classes-and-socials" component={GenericPageContainer} />
    <Route exact path="/ice-cream-classes" component={GenericPageContainer} />
    <Route exact path="/ice-cream-socials" component={GenericPageContainer} />
    <Route exact path="/events" component={GenericPageContainer} />
    <Route exact path="/weddings" component={GenericPageContainer} />
    <Route exact path="/parties" component={GenericPageContainer} />
    <Route exact path="/field-trips" component={GenericPageContainer} />
    <Route exact path="/pints-and-postcards" component={GenericPageContainer} />
    <Route exact path="/catering" component={GenericPageContainer} />
    <Route exact path="/ice-cream-cakes" component={GenericPageContainer} />
    <Route exact path="/faq" component={GenericPageContainer} />
    <Route exact path="/news" component={ArticlesLandingContainer} />
    <Route exact path="/wholesale" component={GenericPageContainer} />
    <Route exact path="/flavors" component={GenericPageContainer} />
    <Route exact path="/in-stores" component={InStoresContainer} />
    <Route exact path="/bike-party" component={GenericPageContainer} />
    <Route exact path="/scoop-tab-party" component={GenericPageContainer} />
    <Route exact path="/jobs" component={GenericPageContainer} />
    <Route
      exact
      path="/party-request-form"
      component={PartyRequestFormContainer}
    />
    <Route
      exact
      path="/cake-request-form"
      component={CakeRequestFormContainer}
    />
    {isStaging() ? (
      <Route exact path="/style-guide" component={GenericPageContainer} />
    ) : null}
  </Switch>
);

export default Routes;

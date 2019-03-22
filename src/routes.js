import React from 'react';
import { Route, Switch } from 'react-router-dom';
import isStaging from 'utils/isStaging';

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
import ErrorPage from 'components/ErrorPage';

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
    <Route exact path="/:genericPageSlug" component={GenericPageContainer} />
    <Route exact path="/news" component={ArticlesLandingContainer} />
    <Route exact path="/in-stores" component={InStoresContainer} />
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
    <Route path="*" render={() => <ErrorPage errorIs404={true} />} />
  </Switch>
);

export default Routes;

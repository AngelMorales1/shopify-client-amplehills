import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import Raven from 'raven-js';
import packageJSON from '../package.json';

import isProd from 'utils/isProd';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createRavenMiddleware from 'raven-for-redux';

import reducers from 'state/reducers';
import session from 'state/reducers/session';

import isContentfulPreview from 'utils/isContentfulPreview';

const middleware = [thunk, promiseMiddleware()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Only load sentry on production */
if (isProd()) {
  Raven.config(
    'https://1d555991ae8a4e51b29c702028ca3a67@sentry.io/1265500'
  ).install({
    release: packageJSON.version
  });
  middleware.push(createRavenMiddleware(Raven));
}

/* Flush Localstorage when PackageJSON version changes */
if (typeof localStorage === 'object') {
  try {
    if (
      localStorage.getItem('_ample_version') !== packageJSON.version ||
      isContentfulPreview()
    ) {
      localStorage.removeItem('persist:root');
      localStorage.setItem('_ample_version', packageJSON.version);
    }
  } catch (e) {
    Storage.prototype._setItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function() {};
  }
}

const persistConfig = {
  key: 'root',
  storage,
  debug: process.env.NODE_ENV === 'development',
  whitelist: ['session', 'customer']
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    ...reducers,
    session,
    router: routerReducer
  })
);

export const history = createHistory();
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

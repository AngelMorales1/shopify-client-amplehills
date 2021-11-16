import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';
import packageJSON from '../package.json';

import isProd from 'utils/isProd';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import createSentryMiddleware from 'redux-sentry-middleware';

import reducers from 'state/reducers';
import session from 'state/reducers/session';

import isContentfulPreview from 'utils/isContentfulPreview';
import customLocalStorage from 'utils/customLocalStorage';
import resetLocalStorage from 'utils/resetLocalStorage';

const middleware = [thunk, promiseMiddleware()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

console.warn(
  `AH App Version: v${packageJSON.version} ${new Date().toISOString()}`
);

/* Only load sentry on production */
if (isProd()) {
  Sentry.init({
    dsn:
      'https://db9966e6d2fb47a89b74e8ebf20fff75@o1059639.ingest.sentry.io/6048440',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0
  });

  middleware.push(createSentryMiddleware(Sentry));
}

/* Flush Localstorage when PackageJSON version changes */
try {
  if (
    localStorage.getItem('_ample_version') !== packageJSON.version ||
    isContentfulPreview()
  ) {
    resetLocalStorage();
    localStorage.setItem('_ample_version', packageJSON.version);
  }
} catch (e) {
  const localStorage = new customLocalStorage();

  if (
    localStorage.getItem('_ample_version') !== packageJSON.version ||
    isContentfulPreview()
  ) {
    resetLocalStorage();
    localStorage.setItem('_ample_version', packageJSON.version);
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

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import packageJSON from '../package.json';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducers from 'state/reducers';
import session from 'state/reducers/session';

const middleware = [thunk, promiseMiddleware()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (localStorage.getItem('_ample_version') !== packageJSON.version) {
  localStorage.removeItem('persist:root');
  localStorage.setItem('_ample_version', packageJSON.version);
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

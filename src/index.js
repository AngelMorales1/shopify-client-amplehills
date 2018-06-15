import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';
import { store, history, persistor } from 'store';
import App from 'App';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

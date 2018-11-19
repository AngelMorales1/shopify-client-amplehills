import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';

import { client } from 'lib/Apollo';
import { ApolloProvider } from 'react-apollo';

import { PersistGate } from 'redux-persist/integration/react';
import { store, history, persistor } from 'store';
import App from 'App';

import applyPolyfills from 'utils/applyPolyfills/polyfills';

applyPolyfills();

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Route component={App} />
        </ConnectedRouter>
      </PersistGate>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";
import { store, history } from "store";

import App from "App";
import registerServiceWorker from "registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route component={App} />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();

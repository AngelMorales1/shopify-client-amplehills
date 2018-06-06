import React from "react";
import ReactDOM from "react-dom";
import Client from "shopify-buy";

import App from "App";
import registerServiceWorker from "registerServiceWorker";

const client = Client.buildClient({
  storefrontAccessToken: "b87a1b888ce7ee3394e288497ba76914",
  domain: "ampletest.myshopify.com"
});

ReactDOM.render(<App client={client} />, document.getElementById("root"));

registerServiceWorker();

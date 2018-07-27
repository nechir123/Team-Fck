import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App.js";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import history from "./history";
import store from "./store";
import registerServiceWorker from "./register-service-worker";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("App")
);

registerServiceWorker();

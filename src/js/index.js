import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App";

import reduxThunk from "redux-thunk";
import reducers from "./reducers";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById("app")
);

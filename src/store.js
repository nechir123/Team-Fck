import reducers from "./store/Reducers";
import rootSaga from "./saga/index";

import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(reducers, enhancers);

sagaMiddleware.run(rootSaga);

export default store;

import reducers from "./reducers";
import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxSaga from "redux-saga";
import rootSaga from "./sagas";

const reduxSagaMiddleware = reduxSaga();

const rootReducers = combineReducers({ ...reducers });

export const store = createStore(
  rootReducers, 
  (applyMiddleware(reduxSagaMiddleware))
);

reduxSagaMiddleware.run(rootSaga);  
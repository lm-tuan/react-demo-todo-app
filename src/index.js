import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import  store  from "./stores";
// import myReducer from './reducers';
// import rootSaga from './sagas'
// import createSagaMiddleware from 'redux-saga'
// import { createStore, applyMiddleware, compose } from 'redux';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
//     myReducer,
//     composeEnhancers(
//         applyMiddleware(sagaMiddleware),
//     )
// );

// sagaMiddleware.run(rootSaga);
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);

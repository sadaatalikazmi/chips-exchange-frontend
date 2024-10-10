import React from 'react';
import { render } from 'react-dom';
import { logger } from 'redux-logger';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './app';
import rootSaga from './store/sagas';
import rootReducer from './store/reducers';
import reportWebVitals from './reportWebVitals';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);
render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
if (module.hot) { module.hot.accept(App); }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

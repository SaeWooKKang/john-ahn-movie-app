import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import 'antd/dist/antd.min.css';

import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise'; // promise 처리
import ReduxThunk from 'redux-thunk'; // function 처리
import Reducer from './_reducers/index.js';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <Provider 
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Reducers from "./reducers/index";
import thunkMiddleware from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Routes from "./routes";

const store = createStore(combineReducers(Reducers.createReducers()), applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>, document.getElementById('root'));

registerServiceWorker();

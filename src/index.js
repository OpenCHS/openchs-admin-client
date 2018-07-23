import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import 'jquery';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Routes from "./routes";

ReactDOM.render(
  <Router>
    <Routes />
  </Router>, document.getElementById('root'));

registerServiceWorker();
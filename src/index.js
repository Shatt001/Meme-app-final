import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import AppRouter from './routers/AppRoute';
// Application own styles instance 
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<AppRouter />, document.querySelector('main'));


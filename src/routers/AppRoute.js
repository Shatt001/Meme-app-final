import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import NotFoundPage from '../components/NotFoundPage';

export default () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route path="/" component={Home} exact={true} />
          <Route component={NotFoundPage} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
};


import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import Home from './../pages/Home';

const RouterComponent = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/webvr' component={Home} />
    </Switch>
  </Router>
);

export default RouterComponent;

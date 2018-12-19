import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router';
import Home from './../pages/Home';
import HomeWebvr from './../pages/HomeWebvr';

const RouterComponent = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/webvr' component={HomeWebvr} />
    </Switch>
  </Router>
);

export default RouterComponent;

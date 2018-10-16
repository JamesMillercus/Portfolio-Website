import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router';
import Home from './../pages/Home';

const RouterComponent = () => (
  <Router>
    <Route exact path='/' component={Home} />
  </Router>
);

export default RouterComponent;

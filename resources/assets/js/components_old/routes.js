import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import SiteWrapper from './commons/SiteWrapper';

const routes = (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:lang" component={SiteWrapper} />
    </Switch>
  </Router>
);

export default routes;

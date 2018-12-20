import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./views/Home";
import SiteWrapper from "./commons/SiteWrapper";
import ScrollToTop from "./commons/ScrollToTop";

const routes = (
  <Router>
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/" component={SiteWrapper} />
        <Route exact path="/:downloadId" component={Home} />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default routes;

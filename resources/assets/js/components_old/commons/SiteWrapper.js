import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Footer from "./Footer";
import FAQ from "../views/FAQ";
import AboutUs from "../views/AboutUs";
import TermsOfUse from "../views/TermsOfUse";
import PrivacyPolicy from "../views/PrivacyPolicy";
import Advertisement from "../views/Advertisement";
import HowSendgbWorks from "../views/HowSendgbWorks";
import SocialResponsibility from "../views/SocialResponsibility";

const SiteWrapper = props => {
  console.log("props in site wrapper is", props);
  const matchPath = props.match.path;
  return (
    <Fragment>
      <Switch>
        <Route
          path={`${matchPath}/social-responsibility`}
          component={SocialResponsibility}
        />
        <Route path={`${matchPath}/terms-of-use`} component={TermsOfUse} />
        <Route path={`${matchPath}/advertisement`} component={Advertisement} />
        <Route path={`${matchPath}/privacy-policy`} component={PrivacyPolicy} />
        <Route path={`${matchPath}/faq`} component={FAQ} />
        <Route path={`${matchPath}/about-us`} component={AboutUs} />
        <Route
          path={`${matchPath}/how-does-it-work`}
          component={HowSendgbWorks}
        />
      </Switch>
      <Footer />
    </Fragment>
  );
};

export default SiteWrapper;

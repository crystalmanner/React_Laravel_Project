import React from "react";
import { Route, Switch } from "react-router-dom";

import FAQ from "../views/FAQ";
import AboutUs from "../views/AboutUs";
import ContactUs from "../views/ContactUs";
import TermsOfUse from "../views/TermsOfUse";
import PrivacyPolicy from "../views/PrivacyPolicy";
import Advertisement from "../views/Advertisement";
import HowSendgbWorks from "../views/HowSendgbWorks";
import SocialResponsibility from "../views/SocialResponsibility";
import WithFooter from "./WithFooter";
import Home from "../views/Home/Home";

const SiteWrapper = props => {
  return (
    <Switch>
      <Route
        exact
        path={`/social-responsibility`}
        render={props => (
          <WithFooter {...props} Component={SocialResponsibility} />
        )}
      />
      <Route
        exact
        path={`/terms-of-use`}
        render={props => <WithFooter {...props} Component={TermsOfUse} />}
      />
      <Route
        exact
        path={`/advertisement`}
        render={props => <WithFooter {...props} Component={Advertisement} />}
      />
      <Route
        exact
        path={`/privacy-policy`}
        render={props => <WithFooter {...props} Component={PrivacyPolicy} />}
      />
      <Route
        exact
        path={`/faq`}
        render={props => <WithFooter {...props} Component={FAQ} />}
      />
      <Route
        exact
        path={`/about-us`}
        render={props => <WithFooter {...props} Component={AboutUs} />}
      />
      <Route
        exact
        path={`/contact-us`}
        render={props => <WithFooter {...props} Component={ContactUs} />}
      />
      <Route
        exact
        path={`/how-does-it-work`}
        render={props => <WithFooter {...props} Component={HowSendgbWorks} />}
      />
      <Route render={props => <Home {...props} isNoMatch={true} />} />
    </Switch>
  );
};

export default SiteWrapper;

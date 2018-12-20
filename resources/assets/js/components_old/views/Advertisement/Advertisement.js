import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Header from "../../commons/Header";

const Advertisement = () => (
  <Fragment>
    <Header title="ADVERTISEMENT" />
    <section id="content" style={{ marginBottom: "190px" }}>
      <div className="content-wrap">
        <div className="container clearfix">
          <div className="col_full">
            <blockquote>
              As We Sendgb, we support our social responsibility projects with
              our wide and powerfull background. At the same time, we give the
              institutions an opportunity to reach a global audience in the most
              impressive way. If you would like to share your brand or your
              product with a active and more effective area, please{" "}
              <Link to="contact-us">contact us.</Link>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  </Fragment>
);

export default Advertisement;

import React, { Component, Fragment } from "react";

import Header from "../../commons/Header";

class SocialResponsibility extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Fragment>
        <Header title="SOCIAL RESPONSIBILITY" />
        <section id="content" style={{ marginBottom: "190px" }}>
          <div className="content-wrap">
            <div className="container clearfix">
              <div className="col_full">
                <p>
                  In addition to changing the way people share their contents,
                  SendGB uses the advertising based model by a model focused on
                  social responsibility
                  <br />
                  <br />
                  Thanks to this new way of doing, SendGB enables users, while
                  waiting for their files to be uploaded/downloaded, to discover
                  in social responsibility campaigns.
                  <br />
                  <br />
                  SendGB wishes to contribute in the making of a more social
                  responsibility.
                  <br />
                  <br />
                  At SendGB we want to promote social responsibiliy campaigns.
                  We dedicate 70% of our ad inventory (the big photographs on
                  the background of the side) to up and coming social
                  responsibiliy who can't afford paying for advertising.
                  <br />
                  <br />
                  SendGB also supports illustrators,designers and photographers.
                  <br />
                  <br />
                  We can promote your works for free!
                  <br />
                  <br />
                  SendGB is supporter of Photo Nightscape Awards 2016,2017 and
                  2018
                  <br />
                  <br />
                  Your works can be part of our large background!
                  <br />
                  <br />
                  If you want your social responsibility campaign or your
                  artworks, photographs to be considered for promotion please
                  contact us at{" "}
                  <a href="mailto:info@sendgb.com">info@sendgb.com</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default SocialResponsibility;

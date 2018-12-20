import React, { Component, Fragment } from 'react';

import footerLogo from '../../../images/footer-logo.png';

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <footer id="footer" className="dark">
          <div id="copyrights">
            <div className="container clearfix">
              <div className="col_one_third">
                <a href="/">
                  <img src={footerLogo} alt="Sendgb" className="footer-logo" />
                </a>
                © 2015-2018 All Rights Reserved. Free File Hosting. Free File
                Sharing. Send Big Files
              </div>
              <div className="col_two_third col_last tright">
                <div className="copyrights-menu copyright-links fright clearfix">
                  <a href="/">Send Big File</a>/
                  <a href="privacy-policy.html">Privacy Policy</a>/
                  <a href="terms-of-use.html">Terms of Use</a>/
                  <a href="advertisement.html">Advertisement</a>
                </div>
                <div className="fright clearfix" style={{ clear: 'both' }}>
                  <a
                    href="https://www.facebook.com/sendgb"
                    target="_blank"
                    className="social-icon si-small si-borderless nobottommargin si-facebook"
                  >
                    <i className="fa fa-facebook" />
                    <i className="fa fa-facebook" />
                  </a>
                  <a
                    href="https://twitter.com/sendgb"
                    target="_blank"
                    className="social-icon si-small si-borderless nobottommargin si-twitter"
                  >
                    <i className="fa fa-twitter" />
                    <i className="fa fa-twitter" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/sendgb"
                    target="_blank"
                    className="social-icon si-small si-borderless nobottommargin si-linkedin"
                  >
                    <i className="fa fa-linkedin" />
                    <i className="fa fa-linkedin" />
                  </a>
                  <a
                    href="https://plus.google.com/+sendgb"
                    target="_blank"
                    className="social-icon si-small si-borderless nobottommargin si-gplus"
                  >
                    <i className="fa fa-google-plus" />
                    <i className="fa fa-google-plus" />
                  </a>
                  <a
                    href="https://www.instagram.com/sendgb/"
                    target="_blank"
                    className="social-icon si-small si-borderless nobottommargin si-instagram"
                  >
                    <i className="fa fa-instagram" />
                    <i className="fa fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <div className="scroll-top-wrapper">
          <span className="scroll-top-inner">
            <i className="fa fa-angle-up" />
          </span>
        </div>
      </Fragment>
    );
  }
}

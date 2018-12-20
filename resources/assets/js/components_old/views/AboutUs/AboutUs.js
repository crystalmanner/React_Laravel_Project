import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import sosyal from "../../../../images/sosyal.png";
import imac from "../../../../images/sendgb-imac.png";
import macbookpro from "../../../../images/sendgb-macbook.png";

import Header from "../../commons/Header";

const AboutUs = () => (
  <Fragment>
    <Header />
    <div className="banner">
      <div className="parallax">
        <div className="banner-info">
          <h2>Send large files up to 4GB</h2>
          <Link to="/" className="btn btn-simple">
            SEND NOW
          </Link>
        </div>
      </div>
    </div>
    <div className="content-wrap">
      <div className="container clearfix">
        <div className="row">
          <div className="col-sm-4 nobottommargin text-center">
            <div className="feature-box fbox-effect">
              <div className="fbox-icon">
                <Link to="#">
                  <i className="fa fa-thumbs-up" />
                </Link>
              </div>
              <div className="fbox-text">
                <h3>EASY</h3>
                <p>
                  Just add files and start file sharing. No sign up related
                  hassle is involved.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 nobottommargin text-center">
            <div className="feature-box fbox-effect">
              <div className="fbox-icon">
                <Link to="#">
                  <i className="fa fa-paper-plane" />
                </Link>
              </div>
              <div className="fbox-text">
                <h3>FAST</h3>
                <p>
                  Multiple threads and high bandwidth servers allow you to
                  transfer your files as fast as possible.
                </p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 nobottommargin text-center">
            <div className="feature-box fbox-effect">
              <div className="fbox-icon">
                <Link to="#">
                  <i className="fa fa-lock" />
                </Link>
              </div>
              <div className="fbox-text">
                <h3>SECURE</h3>
                <p>
                  All transfers are done over an encrypted line. Password
                  protect files to keep them safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section nobottommargin">
        <div className="container clearfix">
          <div className="col_half nobottommargin">
            <img src={imac} alt="Sendgb" className="center-block" />
          </div>
          <div
            className="col_half col_last nobottommargin"
            style={{ zIndex: 1 }}
          >
            <div className="heading-block">
              <h2>Send big files up to 4GB for free</h2>
              <span />
            </div>
            <p>
              With Sendgb, anyone can securely upload, send and share large
              files up to 4GB for free. Users can send large attachments via
              email or create short links to share easily. Users can transfer
              big files such as documents, photos, HD videos and more...{" "}
            </p>
            <p>
              You can transfer files by selecting your files or drag and drop.
              You can send files to anywhere in the world with SendGB, which
              offers 10 languages.
            </p>
            <Link
              to="/"
              className="button button-border button-rounded button-large button-dark noleftmargin"
            >
              SEND NOW
            </Link>
          </div>
        </div>
      </div>
      <div
        className="section notopmargin nobottommargin"
        style={{ background: "#FFF", marginTop: "0px" }}
      >
        <div className="container clearfix">
          <div className="col_half nobottommargin">
            <img src={macbookpro} alt="Sendgb" className="center-block" />
          </div>
          <div className="col_half nobottommargin col_last">
            <div className="heading-block">
              <h2>No membershIp &amp; Free</h2>
              <span>
                You do not have to be a member to share files! Fast file
                transfer without losing time with membership.
              </span>
            </div>
            <p>
              <b>SendGB is a completely free file upload site</b>
              <br />
              <br />
              SendGB does not let you down on large file sharing. If your
              internet connection is disconnected while you are uploading files,
              the upload will continue as soon as your connection comes. Thus
              your large file uploads will not be canceled due to the
              interrupted internet connection.
              <br />
              <br />
              You can also stop the process if you want to upload the file and
              then let it continue from where you left off.
              <br />
              <br />
              An important feature that distinguishes SendGB from its
              competitors is the fact that you complete your transaction in
              large file transfers. If the computer you are using runs out of
              charge or if you have to interrupt the transfer immediately. When
              you add the files you want to upload, your process will resume
              where you left off.
              <br />
              <br />
              <b>Easy sending from all devices.</b>
              <br />
              <br />
              With SendGB you can send files quickly with your desktop or mobile
              devices. There is no need to download the application. All you
              have to do is to enter SendGB.com on your desktop or mobile device
              (mobile phone or tablet). Do not waste any time to download and
              install the program or application.
            </p>
            <Link
              to="/"
              className="button button-border button-rounded button-large button-dark noleftmargin"
            >
              SEND NOW
            </Link>
          </div>
        </div>
      </div>
      <div
        className="section dark notopmargin"
        style={{ paddingTop: "60px", marginBottom: "0px" }}
      >
        <div className="container clearfix">
          <div className="heading-block center">
            <h3>SECURE SHARING</h3>
            <span />
          </div>
          <p className="divcenter center" style={{ maxWidth: "800px" }}>
            SendGB gives you secure sharing without members. You can specify a
            password when sending files. Thus, when downloading the opposite
            party file, you can download it by typing the password you specify.
            Easy, fast and safe.
          </p>
          <div className="heading-block center">
            <h3>COMPATIBLE WITH ALL DEVICES</h3>
            <span />
          </div>
          <div className="col_full center topmargin nobottommargin">
            <a
              href="#"
              className="social-icon si-appstore si-large si-rounded si-colored inline-block"
              title="iOS App Store"
            >
              <i className="fa fa-apple" />
              <i className="fa fa-apple" />
            </a>
            <a
              href="#"
              className="social-icon si-android si-large si-rounded si-colored inline-block"
              title="Android Store"
            >
              <i className="fa fa-android" />
              <i className="fa fa-android" />
            </a>
            <a
              href="#"
              className="social-icon si-gplus si-large si-rounded si-colored inline-block"
              title="Windows Store"
            >
              <i className="fa fa-windows" />
              <i className="fa fa-windows" />
            </a>
          </div>
          <div className="clear" />
          <br />
          <div className="heading-block center">
            <h3>WHY SENDGB ?</h3>
            <span />
          </div>
          <p className="divcenter center" style={{ maxWidth: "800px" }}>
            The difference of SendGB is not just fast, easy file transfer.
            Supporting social responsibility projects at the same time. Using
            SendGB, you can make sure that social campaigns in the background
            reach more people.
            <br />
            <br />
            We are assertive with our speed. It should be as fast as easy to
            send large files. That's why we constantly invest in infrastructure.
            By providing fast file transfer, we save our users time.
          </p>
          <div className="clear" />
        </div>
      </div>
      <div className="section" style={{ background: "#FFF" }}>
        <div className="container clearfix">
          <div className="heading-block center">
            <h2>SOCIAL RESPONSIBILITY SUPPORT</h2>
          </div>
          <div
            style={{
              position: "relative",
              marginBottom: "-60px",
              height: "415px"
            }}
            data-height-lg="415"
            data-height-md="342"
            data-height-sm="262"
            data-height-xs="160"
            data-height-xxs="102"
          >
            <img
              src={sosyal}
              style={{ position: "absolute", top: 0, left: 0 }}
              data-animate="fadeInUp"
              alt="Sosyal"
              className="fadeInUp animated"
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

export default AboutUs;

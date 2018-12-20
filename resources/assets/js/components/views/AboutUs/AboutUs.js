import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import sosyal from '../../assets/images/sosyal.png';
import imac from '../../assets/images/sendgb-imac.png';
import macbookpro from '../../assets/images/sendgb-macbook.png';

import Header from '../../commons/Header';
import localize from "../../commons/LanguageHOC";

const AboutUs = ({messages}) => {
  document.title = 'SendGB | File transfer & File Hosting & File Sharing';

  return (
    <Fragment>
      <Header />
      <div className="banner">
        <div className="parallax">
          <div className="banner-info">
            <h2>{messages.send_lg_files}</h2>
            <Link to="/" className="btn btn-simple">
                {messages.send_now}
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
                  <h3>{messages.easy_title}</h3>
                  <p>
                      {messages.easy_desc}
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
                  <h3>{messages.fast_title}</h3>
                  <p>
                      {messages.fast_desc}
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
                  <h3>{messages.sec_title}</h3>
                  <p>
                      {messages.sec_desc}
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
                <h2>{messages.send_lg_free}</h2>
                <span />
              </div>
              <p>
                  {messages.send_lg_free_desc_1}{' '}
              </p>
              <p>
                  {messages.send_lg_free_desc_2}
              </p>
              <Link
                to="/"
                className="button button-border button-rounded button-large button-dark noleftmargin"
              >
                  {messages.send_now}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="section notopmargin nobottommargin"
          style={{ background: '#FFF', marginTop: '0px' }}
        >
          <div className="container clearfix">
            <div className="col_half nobottommargin">
              <img src={macbookpro} alt="Sendgb" className="center-block" />
            </div>
            <div className="col_half nobottommargin col_last">
              <div className="heading-block">
                <h2>{messages.no_membership}</h2>
                <span>
                  {messages.no_membership_desc}
                </span>
              </div>
              <p>
                <b>{messages.no_membership_desc_1}</b>
                <br />
                <br />
                  {messages.no_membership_desc_2}
                <br />
                <br />
                  {messages.no_membership_desc_3}
                <br />
                <br />
                  {messages.no_membership_desc_4}
                <br />
                <br />
                <b>{messages.accross_devices}</b>
                <br />
                <br />
                  {messages.accross_devices_desc}
              </p>
              <Link
                to="/"
                className="button button-border button-rounded button-large button-dark noleftmargin"
              >
                  {messages.send_now}
              </Link>
            </div>
          </div>
        </div>
        <div
          className="section dark notopmargin"
          style={{ paddingTop: '60px', marginBottom: '0px' }}
        >
          <div className="container clearfix">
            <div className="heading-block center">
              <h3>{messages.sec_sharing}</h3>
              <span />
            </div>
            <p className="divcenter center" style={{ maxWidth: '800px' }}>
                {messages.sec_sharing_desc}
            </p>
            <div className="heading-block center">
              <h3>{messages.compatible}</h3>
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
              <h3>{messages.why_us}</h3>
              <span />
            </div>
            <p className="divcenter center" style={{ maxWidth: '800px' }}>
                {messages.why_us_desc}
              <br />
              <br />
                {messages.why_us_desc_1}
            </p>
            <div className="clear" />
          </div>
        </div>
        <div className="section" style={{ background: '#FFF' }}>
          <div className="container clearfix">
            <div className="heading-block center">
              <h2>{messages.soc_res_support}</h2>
            </div>
            <div
              style={{
                position: 'relative',
                marginBottom: '-60px',
                height: '415px'
              }}
              data-height-lg="415"
              data-height-md="342"
              data-height-sm="262"
              data-height-xs="160"
              data-height-xxs="102"
            >
              <img
                src={sosyal}
                style={{ position: 'absolute', top: 0, left: 0 }}
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
};

export default localize(AboutUs);

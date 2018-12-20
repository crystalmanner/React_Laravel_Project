import $ from "jquery";
import { Link } from "react-router-dom";
import React, { Component, Fragment } from "react";

import en from "../../../images/en.png";
import tr from "../../../images/tr.png";
import de from "../../../images/de.png";
import fr from "../../../images/fr.png";
import nl from "../../../images/nl.png";
import es from "../../../images/es.png";
import it from "../../../images/it.png";
import hr from "../../../images/hr.png";
import ro from "../../../images/ro.png";
import ru from "../../../images/ru.png";
import pt from "../../../images/pt.png";
import logo from "../../../images/logo.png";
import sendNow from "../../../images/send_en.png";

/**
 * If title is not passed breadcrum bar will not display. like in About us page
 */
export default class Header extends Component {
  componentDidMount() {
    $(window).on("load", function() {
      //Stickybar
      if ($("#header").length) {
        var stickyNavTop = $("#header").offset().top;
        var stickyNav = function() {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > stickyNavTop) {
            $("#header").addClass("sticky");
          } else {
            $("#header").removeClass("sticky");
          }
        };
        stickyNav();
        $(window).scroll(function() {
          stickyNav();
        });
      }

      $(window).scroll(function() {
        if ($(this).scrollTop() > 1) {
          $(".scroll-top-wrapper").addClass("show");
        } else {
          $(".scroll-top-wrapper").removeClass("show");
        }
      });
      $(".scroll-top-wrapper").on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    });
  }

  render() {
    return (
      <Fragment>
        <div className="sendnow">
          <a href="/">
            <img src={sendNow} />
          </a>
        </div>
        <div id="top-bar">
          <div className="container-fullwidth clearfix">
            <div className="col_half nobottommargin">
              <div className="top-links">
                <ul
                  className="sf-js-enabled clearfix"
                  style={{ touchAction: "auto" }}
                >
                  <li className="language-main">
                    <a href="#" className="sf-with-ul">
                      <img src={en} alt="English" /> EN
                      <i className="icon-angle-down" />
                    </a>
                    <ul className="language-list">
                      <li className="">
                        <a href="/en/">
                          <img src={en} alt="English" /> EN
                        </a>
                      </li>
                      <li>
                        <a href="/tr/">
                          <img src={tr} alt="Türkçe" /> TR
                        </a>
                      </li>
                      <li>
                        <a href="/de/">
                          <img src={de} alt="Deutsch" /> DE
                        </a>
                      </li>
                      <li>
                        <a href="/fr/">
                          <img src={fr} alt="Français" /> FR
                        </a>
                      </li>
                      <li>
                        <a href="/nl/">
                          <img src={nl} alt="Nederlands" /> NL
                        </a>
                      </li>
                      <li>
                        <a href="/es/">
                          <img src={es} alt="Español" /> ES
                        </a>
                      </li>
                      <li>
                        <a href="/it/">
                          <img src={it} alt="Italiano" /> IT
                        </a>
                      </li>
                      <li>
                        <a href="/hr/">
                          <img src={hr} alt="Hrvatska" /> HR
                        </a>
                      </li>
                      <li>
                        <a href="/ro/">
                          <img src={ro} alt="Român" /> RO
                        </a>
                      </li>
                      <li>
                        <a href="/ru/">
                          <img src={ru} alt="Russian" /> RU
                        </a>
                      </li>
                      <li>
                        <a href="/pt/">
                          <img src={pt} alt="Português" /> PT
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="/en/">HOME</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col_half fright col_last nobottommargin">
              <div id="top-social">
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/sendgb"
                      target="_blank"
                      className="si-facebook"
                    >
                      <span className="ts-icon">
                        <i className="fa fa-facebook" />
                      </span>
                      <span className="ts-text">Facebook</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/sendgb"
                      target="_blank"
                      className="si-twitter"
                    >
                      <span className="ts-icon">
                        <i className="fa fa-twitter" />
                      </span>
                      <span className="ts-text">Twitter</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/sendgb"
                      target="_blank"
                      className="si-linkedin"
                    >
                      <span className="ts-icon">
                        <i className="fa fa-linkedin" />
                      </span>
                      <span className="ts-text">Linkedin</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://plus.google.com/+sendgb"
                      target="_blank"
                      className="si-gplus"
                    >
                      <span className="ts-icon">
                        <i className="fa fa-google-plus" aria-hidden="true" />
                      </span>
                      <span className="ts-text">Google+</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/sendgb/"
                      target="_blank"
                      className="si-instagram"
                    >
                      <span className="ts-icon">
                        <i className="fa fa-instagram" aria-hidden="true" />
                      </span>
                      <span className="ts-text">Instagram</span>
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@sendgb.com" className="si-email3">
                      <span className="ts-icon">
                        <i className="fa fa-envelope" aria-hidden="true" />
                      </span>
                      <span className="ts-text">info@sendgb.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <header id="header" className="full-header dark">
          <div id="header-wrap" className="">
            <div className="container clearfix">
              <div id="primary-menu-trigger">
                <i className="fa fa-bars" />
              </div>

              <div id="logo">
                <a href="/" className="standard-logo" data-dark-logo={logo}>
                  <img src={logo} alt="Sendgb" />
                </a>
              </div>

              <nav id="primary-menu">
                <ul className="sf-js-enabled">
                  <li>
                    <a href="/">
                      <div>SEND BIG FILE</div>
                    </a>
                  </li>
                  <li>
                    <a href="aboutus.html">
                      <div>ABOUT US</div>
                    </a>
                  </li>
                  <li>
                    <a href="how-does-it-work.html">
                      <div>HOW SENDGB WORKS?</div>
                    </a>
                  </li>
                  <li>
                    <a href="faq.html">
                      <div>FAQ</div>
                    </a>
                  </li>
                  <li>
                    <a href="social-responsibility.html">
                      <div>SOCIAL RESPONSIBILITY</div>
                    </a>
                  </li>
                  <li>
                    <a href="contact-us.html">
                      <div>CONTACT US</div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
        {this.props.title && (
          <section id="page-title" className="page-title-mini">
            <div className="container clearfix">
              <h1>{this.props.title}</h1>
              <span>
                SendGB.com is the easiest and fastest way to send large files.
              </span>
              <ol className="breadcrumb">
                <li>
                  <Link to="/">SEND BIG FILE</Link>
                </li>
                <li className="active">{this.props.title}</li>
              </ol>
            </div>
          </section>
        )}
      </Fragment>
    );
  }
}

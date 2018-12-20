import $ from "jquery";
import { Link } from "react-router-dom";
import React, { Component, Fragment } from "react";

import en from "../assets/images/en.png";
import tr from "../assets/images/tr.png";
import de from "../assets/images/de.png";
import fr from "../assets/images/fr.png";
import nl from "../assets/images/nl.png";
import es from "../assets/images/es.png";
import it from "../assets/images/it.png";
import hr from "../assets/images/hr.png";
import ro from "../assets/images/ro.png";
import ru from "../assets/images/ru.png";
import pt from "../assets/images/pt.png";
import logo from "../assets/images/logo.png";
import sendNow from "../assets/images/send_en.png";

import localize from "./LanguageHOC";
import emitLanguageChangeEvent from "../utils/events";
import { getCurrentlySelectedLanguage } from "../config/lang";

/**
 * If title is not passed breadcrum bar will not display. like in About us page
 */
class Header extends Component {
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

    let lang = getCurrentlySelectedLanguage().toLowerCase();
    return (
      <Fragment>
        <div className="sendnow">
          <Link to="/">
            <img src={require(`../assets/images/send_${lang}.png`)} alt="SendGb" />
          </Link>
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
                      <div
                        className={`bg-${getCurrentlySelectedLanguage().toLowerCase()} flag-image`}
                      />
                      {getCurrentlySelectedLanguage().toUpperCase()}
                      <i className="icon-angle-down" />
                    </a>
                    <ul className="language-list">
                      <li className="">
                        <span onClick={() => emitLanguageChangeEvent("en")}>
                          <img src={en} alt="English" /> EN
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("tr")}>
                          <img src={tr} alt="Türkçe" /> TR
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("de")}>
                          <img src={de} alt="Deutsch" /> DE
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("fr")}>
                          <img src={fr} alt="Français" /> FR
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("nl")}>
                          <img src={nl} alt="Nederlands" /> NL
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("es")}>
                          <img src={es} alt="Español" /> ES
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("it")}>
                          <img src={it} alt="Italiano" /> IT
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("hr")}>
                          <img src={hr} alt="Hrvatska" /> HR
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("ro")}>
                          <img src={ro} alt="Român" /> RO
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("ru")}>
                          <img src={ru} alt="Russian" /> RU
                        </span>
                      </li>
                      <li>
                        <span onClick={() => emitLanguageChangeEvent("pt")}>
                          <img src={pt} alt="Português" /> PT
                        </span>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/">HOME</Link>
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
                      rel="noopener noreferrer"
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
                      rel="noopener noreferrer"
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
                      rel="noopener noreferrer"
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
                      rel="noopener noreferrer"
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
                      rel="noopener noreferrer"
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
          <div id="header-wrap">
            <div className="container clearfix">
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#primary-menu"
                aria-controls="primary-menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fa fa-bars" aria-hidden="true" />
              </button>

              <div id="logo">
                <Link to="/" className="standard-logo" data-dark-logo={logo}>
                  <img src={logo} alt="Sendgb" />
                </Link>
              </div>

              <nav id="primary-menu" className="navbar-collapse">
                <ul className="sf-js-enabled">
                  <li>
                    <Link to="/">
                      <div>{this.props.messages.send_big_file}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="about-us">
                      <div>{this.props.messages.about_us}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="how-does-it-work">
                      <div>{this.props.messages.how_it_works}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="faq">
                      <div>{this.props.messages.faq}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="social-responsibility">
                      <div>{this.props.messages.social_responsibility}</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="contact-us">
                      <div>{this.props.messages.contact_us}</div>
                    </Link>
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

export default localize(Header);

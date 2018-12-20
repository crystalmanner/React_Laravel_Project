import ReCAPTCHA from "react-google-recaptcha";
import React, { PureComponent, Fragment } from "react";

import Header from "../../commons/Header";
import Map from "./Map";
import { isValidEmail } from "../../utils/validation";

class ContactUs extends PureComponent {
  constructor() {
    super();

    document.title = 'Sendgb.com | Contact Us';

    this.state = {
      captchaPass: null,
      data: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      errors: {
        name: null,
        email: null,
        subject: null,
        message: null
      }
    };

    this._handleInput = this._handleInput.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
    this._validate = this._validate.bind(this);
    this._setErrorState = this._setErrorState.bind(this);
  }

  render() {
    return (
      <Fragment>
        <Header title="CONTACT US" />
        <section id="map-overlay">
          <Map />
          <div className="container clearfix">
            <div id="contact-form-overlay-mini" className="clearfix">
              <div className="fancy-title title-dotted-border">
                <h3>Send Your Message</h3>
              </div>
              <div className="contact-widget">
                <div className="contact-form-result" />

                <form
                  className="nobottommargin"
                  id="template-contactform"
                  name="template-contactform"
                  // action="/c/include/sendemail.php"
                  onSubmit={this._sendMessage}
                >
                  <div className="col_full">
                    <label htmlFor="template-contactform-name">
                      Name <small>*</small>
                    </label>
                    <input
                      type="text"
                      id="template-contactform-name"
                      name="name"
                      value={this.state.data.name}
                      className="sm-form-control"
                      aria-required="true"
                      onChange={this._handleInput}
                      style={{
                        border:
                          this.state.errors.name === "error"
                            ? "1px solid red"
                            : null
                      }}
                    />
                  </div>

                  <div className="col_full">
                    <label htmlFor="template-contactform-email">
                      Email <small>*</small>
                    </label>
                    <input
                      type="email"
                      id="template-contactform-email"
                      name="email"
                      value={this.state.data.email}
                      className="required email sm-form-control"
                      aria-required="true"
                      onChange={this._handleInput}
                      style={{
                        border:
                          this.state.errors.email === "error"
                            ? "1px solid red"
                            : null
                      }}
                    />
                  </div>

                  <div className="col_full">
                    <label htmlFor="template-contactform-subject">
                      Subject <small>*</small>
                    </label>
                    <input
                      type="text"
                      id="template-contactform-subject"
                      name="subject"
                      value={this.state.data.subject}
                      className="required sm-form-control"
                      aria-required="true"
                      onChange={this._handleInput}
                      style={{
                        border:
                          this.state.errors.subject === "error"
                            ? "1px solid red"
                            : null
                      }}
                    />
                  </div>

                  <div className="col_full">
                    <label htmlFor="template-contactform-message">
                      Message <small>*</small>
                    </label>
                    <textarea
                      className="required sm-form-control"
                      id="template-contactform-message"
                      name="message"
                      rows="6"
                      cols="30"
                      aria-required="true"
                      value={this.state.data.message}
                      onChange={this._handleInput}
                      style={{
                        border:
                          this.state.errors.message === "error"
                            ? "1px solid red"
                            : null
                      }}
                    />
                  </div>

                  <div className="col_full hidden">
                    <ReCAPTCHA
                      sitekey="6LdkpW0UAAAAANiVw9DoBxz6FY266DNjpsxg8hRB"
                      onChange={e => this.setState({ captchaPass: e })}
                    />
                  </div>

                  <div className="col_full">
                    <button
                      className="button button-3d nomargin"
                      type="submit"
                      id="template-contactform-submit"
                      name="template-contactform-submit"
                      value="submit"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }

  _handleInput(e) {
    let name = e.target.name;
    let value = e.target.value;

    let data = { ...this.state.data };
    let errors = { ...this.state.errors };
    errors[name] = null;
    data[name] = value;
    this.setState({ data, errors });
  }

  _sendMessage(e) {
    e.preventDefault();

    if (this._validate() && this.state.captchaPass !== null) {
      console.log("api call here");
    }
  }

  _validate() {
    let isValid = true;

    if (this.state.data.name === "") {
      this.setState(this._setErrorState("name"));
      isValid = false;
    }

    if (!isValidEmail(this.state.data.email)) {
      this.setState(this._setErrorState("email"));
      isValid = false;
    }

    if (this.state.data.subject === "") {
      this.setState(this._setErrorState("subject"));
      isValid = false;
    }

    if (this.state.data.message === "") {
      this.setState(this._setErrorState("message"));
      isValid = false;
    }

    return isValid;
  }

  _setErrorState(field) {
    return (previousState, currentState) => {
      let errors = { ...previousState.errors };
      errors[field] = "error";
      return { ...previousState, errors };
    };
  }
}

export default ContactUs;

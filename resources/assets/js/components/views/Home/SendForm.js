import $ from 'jquery';
import React, { Fragment, Component } from 'react';

import Filename from 'react-fine-uploader/filename';
import FileInput from 'react-fine-uploader/file-input';
import CancelButton from 'react-fine-uploader/cancel-button';

import roundToPlace from '../../utils/roundDecimals';

class SendForm extends Component {
  constructor(props) {
    super(props);

    this.sendToEmailInputRef = React.createRef();
    this.messageInputRef = React.createRef();
  }

  componentDidMount() {
    $('#messageInput').bind('input propertychange', () => {
      if (this.props.isSendMail) {
        $('#messageInput').css('height', 'auto');
        $('#messageInput').css('padding', '0');
        $('#messageInput').css(
          'height',
          $('#messageInput').prop('scrollHeight') + 'px'
        );
      } else {
        if ($('#messageInput').prop('scrollHeight') < 147) {
          return true;
        } else {
          $('#messageInput').css('height', 'auto');
          $('#messageInput').css('padding', '0');
          $('#messageInput').css(
            'height',
            $('#messageInput').prop('scrollHeight') + 'px'
          );
        }
      }
    });
  }

  focusSendToEmailInput() {
    this.sendToEmailInputRef.current.focus();
  }

  render() {
    return (
      <Fragment>
        <div className="form__block">
          <div className="formContent">
            {this.props.submittedFiles &&
              this.props.submittedFiles.map(id => (
                <div key={id} className="uploadedFile">
                  <span>
                    <Filename
                      id={id}
                      uploader={this.props.uploader}
                      className="uploaded-file-name"
                    />

                    <div className="uploaded-file-size">
                      <span>
                        <strong>
                          {roundToPlace(
                            this.props.uploader.methods.getSize(id) / 1000,
                            2
                          )}
                        </strong>{' '}
                        KB
                      </span>
                    </div>
                  </span>
                  <CancelButton
                    id={id}
                    uploader={this.props.uploader}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      background: 'inherit'
                    }}
                  >
                    <i className="fa fa-times-circle" />
                  </CancelButton>
                </div>
              ))}
            <div
              id="container-one"
              className={
                this.props.submittedFiles.length === 0
                  ? 'tooltip-container upload-section upload-empty'
                  : 'tooltip-container upload-section upload-full'
              }
            >
              <div className="tooltip collapse" id="tooltip1">
                {this.props.triedToSubmitMoreThan4GB
                  ? "You can't transfer the files more than 4GB!"
                  : this.props.messages.max_file_uploads}
              </div>
              {!(
                this.props.submittedFiles && this.props.submittedFiles.length
              ) ? (
                <Fragment>
                  <FileInput
                    multiple
                    accept="*"
                    uploader={this.props.uploader}
                    className="upload-btn main-btn file-input-button block-button"
                  >
                    <svg viewBox="24 0 72 72">
                      <path
                        d="M60.493 72C79.883 72 96 55.882 96 36.493 96 16.118 79.882 0 60.493 0 40.118 0 24 16.118 24 36.493 24 55.883 40.118 72 60.493 72z"
                        fillRule="evenodd"
                      />
                      <path
                        d="M58 34h-9c-.553 0-1 .452-1 1.01v1.98c0 .567.448 1.01 1 1.01h9v9c0 .553.452 1 1.01 1h1.98c.567 0 1.01-.448 1.01-1v-9h9c.553 0 1-.452 1-1.01v-1.98c0-.567-.448-1.01-1-1.01h-9v-9c0-.553-.452-1-1.01-1h-1.98c-.567 0-1.01.448-1.01 1v9z"
                        fill="#FFF"
                        fillRule="evenodd"
                      />
                    </svg>
                    <h2>{this.props.messages.select_files}</h2>
                    <p className="upload-info">
                      {this.props.messages.max_upload_size}
                    </p>
                  </FileInput>
                </Fragment>
              ) : (
                <div className="uploadMore" style={{ display: 'block' }}>
                  <FileInput
                    multiple
                    accept="*"
                    uploader={this.props.uploader}
                    className="upload-btn secondary-btn file-input-button"
                  >
                    <svg viewBox="24 0 72 72">
                      <path
                        d="M60.493 72C79.883 72 96 55.882 96 36.493 96 16.118 79.882 0 60.493 0 40.118 0 24 16.118 24 36.493 24 55.883 40.118 72 60.493 72z"
                        fillRule="evenodd"
                      />
                      <path
                        d="M58 34h-9c-.553 0-1 .452-1 1.01v1.98c0 .567.448 1.01 1 1.01h9v9c0 .553.452 1 1.01 1h1.98c.567 0 1.01-.448 1.01-1v-9h9c.553 0 1-.452 1-1.01v-1.98c0-.567-.448-1.01-1-1.01h-9v-9c0-.553-.452-1-1.01-1h-1.98c-.567 0-1.01.448-1.01 1v9z"
                        fill="#FFF"
                        fillRule="evenodd"
                      />
                    </svg>
                  </FileInput>
                  <div className="upload-text">
                    <label>{this.props.messages.add_more}</label>
                    <p>
                      {(this.props.submittedFiles &&
                        this.props.submittedFiles.length) ||
                        0}{' '}
                      {this.props.messages.files} added,
                      <i>
                        (
                        {Math.round((4096 * 1000 - this.props.totalFileGigaBytes * 1000000) * 100) /
                          100}{' '}
                        kb {this.props.messages.msg_remaining})
                      </i>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: this.props.isSendMail ? 'block' : 'none' }}>
              <div
                id="container-two"
                className={
                  !this.props.emailsToSendTo.length
                    ? 'tooltip-container form-element is-empty'
                    : 'tooltip-container form-element first-element not-empty'
                }
              >
                <div className="tooltip w-200 py-1" id="tooltip2">
                  {this.props.messages.tt_recipient}
                </div>
                <div
                  className="fake-email-send-input"
                  style={{
                    display:
                      this.props.emailsToSendTo &&
                      this.props.emailsToSendTo.length &&
                      !this.props.isShowEmailsToSendList
                        ? 'block'
                        : 'none'
                  }}
                  onClick={() => {
                    this.props.toggleIsShowEmailsToSendList();
                    setTimeout(() => {
                      this.focusSendToEmailInput();
                    });
                  }}
                >
                  {this.props.emailsToSendTo[0]}
                  {this.props.emailsToSendTo.length > 1 ? (
                    <span
                      style={{
                        marginLeft: '4px',
                        color: '#2c3e50',
                        background: '#E8EBED',
                        borderRadius: '0.7857142857em',
                        padding: '2px 6px'
                      }}
                    >
                      +{this.props.emailsToSendTo.length - 1} other
                    </span>
                  ) : (
                    ''
                  )}
                </div>

                <div
                  className={
                    this.props.isnewEmailToSendToInvalid ? 'invalid-email' : ''
                  }
                  style={{
                    display:
                      this.props.emailsToSendTo &&
                      this.props.emailsToSendTo.length &&
                      !this.props.isShowEmailsToSendList
                        ? 'none'
                        : 'block'
                  }}
                >
                  <ul className="send-to-emails-list">
                    {this.props.emailsToSendTo &&
                      this.props.emailsToSendTo.map((email, i) => (
                        <li key={i + 1}>
                          <button
                            className="trash-btn"
                            onMouseDown={e => {
                              // onMouseDown is clicked because it fires before onBlur but onClick doesn't
                              // need to prevent blur event from firing
                              e.preventDefault();
                              this.props.removeEmailToSendTo(i);
                            }}
                            style={{
                              border: 'none',
                              color: '#f1592a',
                              cursor: 'pointer',
                              background: 'transparent'
                            }}
                          >
                            <span>
                              <i className="fa fa-trash" />
                            </span>
                          </button>
                          <span className="email_name">{email}</span>{' '}
                        </li>
                      ))}
                  </ul>
                  <input
                    type="email"
                    name="newEmailToSendTo"
                    value={this.props.newEmailToSendTo}
                    ref={this.sendToEmailInputRef}
                    onKeyPress={e => {
                      if (e.key.toLocaleLowerCase() === 'enter') {
                        e.preventDefault();
                        this.props.addEmailToSendTo();
                      }
                    }}
                    onBlur={this.props.onSendToEmailInputBlur}
                    onChange={this.props.handleInputChange}
                    className="form-control"
                    style={
                      this.props.isnewEmailToSendToInvalid &&
                      this.props.newEmailToSendTo
                        ? {
                            boxShadow:
                              'inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px red',
                            marginTop: '9px'
                          }
                        : {}
                    }
                  />
                  <label>{this.props.messages.enter_email}</label>
                  {this.props.isnewEmailToSendToInvalid ? (
                    <span
                      className="invalid-feedback"
                      style={{
                        display: 'block'
                      }}
                    >
                      {this.props.sendToEmailInvalidMessage}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div
                id="container-three"
                // this.props.isOwnEmailInvalid ? "invalid-email" : ""
                className={`
                  ${
                    !this.props.ownEmail
                      ? 'tooltip-container form-element is-empty'
                      : 'tooltip-container form-element not-empty'
                  }
                  ${this.props.isOwnEmailInvalid ? 'invalid-email' : ''}`}
              >
                <div className="tooltip w-200 py-1 tooltip-three" id="tooltip3">
                  {this.props.messages.tt_yourmail}
                </div>
                <input
                  name="ownEmail"
                  value={this.props.ownEmail}
                  onChange={this.props.handleInputChange}
                  type="email"
                  className="form-control"
                  onBlur={this.props.setOwnEmailValidity}
                />
                <label>{this.props.messages.enter_own_email}</label>
                {this.props.isOwnEmailInvalid ? (
                  <span
                    className="invalid-feedback"
                    style={{
                      display: 'block'
                    }}
                  >
                    {this.props.ownEmail
                      ? this.props.messages.msg_wrongem
                      : this.props.messages.msg_peyem}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>

            <div
              id="container-four"
              className={`${
                !this.props.messageToSend
                  ? 'tooltip-container form-element textarea is-empty'
                  : 'tooltip-container form-element textarea not-empty'
              } ${this.props.isSendMail ? '' : 'tall-form'}`}
            >
              <div className="tooltip w-200 py-1" id="tooltip4">
                {this.props.messages.tt_message}
              </div>
              <textarea
                style={{ resize: 'none' }}
                id="messageInput"
                name="messageToSend"
                value={this.props.messageToSend}
                onChange={this.props.handleInputChange}
                className="form-control"
                maxLength="2000"
              />
              <label>
                {this.props.messages.message_receiver} (
                {this.props.messages.msg_optional})
              </label>
            </div>
            <div
              id="container-five"
              className={
                !this.props.password
                  ? 'tooltip-container form-element is-empty'
                  : 'tooltip-container form-element not-empty'
              }
            >
              <div className="tooltip w-200 py-1" id="tooltip5">
                {this.props.messages.password_text}
              </div>
             <input
                name="password"
                autoComplete="off"
                value={this.props.password}
                onChange={this.props.handleInputChange}
                type="text"
                className="form-control"
                maxLength="20"
              />
              <label>
                {this.props.messages.password} (
                {this.props.messages.msg_optional})
              </label>
            </div>
            <div
              id="container-six"
              className="tooltip-container checkbox-block"
            >
              <div className="tooltip w-200 py-1" id="tooltip6">
                {this.props.messages.destruct_text}
              </div>
              <i className="float-left fa fa-question-circle" />
              <div className="custom-checkbox pull-left">
                <input
                  name="isDestructFile"
                  value={this.props.isDestructFile}
                  onChange={this.props.handleInputChange}
                  type="checkbox"
                  className="custom-control-input"
                />
                <label className="custom-control-label">
                  {this.props.messages.destruct_file}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="button__block float-left">
          <div className="float-left btn-group">
            <i
              className="fa fa-question-circle tooltip-container"
              id="container-seven"
            >
              <div className="tooltip w-200 py-1" id="tooltip7">
                {this.props.messages.share_type_text}
              </div>
            </i>
            <button
              type="btn"
              className={
                'btn-orange btn-sm br-left icon-buttons' +
                (this.props.isSendMail ? ' active-link' : '')
              }
              onClick={() => this.props.setIsSendMail(true)}
            >
              <svg
                style={{ width: '14px' }}
                data-prefix="far"
                data-icon="envelope"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-envelope fa-w-16 fa-2x"
              >
                <path
                  fill="currentColor"
                  d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                  className=""
                />
              </svg>
            </button>
            <button
              type="btn"
              className={
                'btn-orange btn-sm br-right icon-buttons' +
                (!this.props.isSendMail ? ' active-link' : '')
              }
              onClick={() => this.props.setIsSendMail(false)}
            >
              <svg
                style={{ width: '12.7px' }}
                data-prefix="fas"
                data-icon="link"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="svg-inline--fa fa-link fa-w-16 fa-2x"
              >
                <path
                  fill="currentColor"
                  d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
                  className=""
                />
              </svg>
            </button>
          </div>
          <div className="float-right">
            <button
              type="button"
              className={`btn btn-orange btn-block btn-sm btn-upload ${
                this.props.submittedFiles &&
                this.props.submittedFiles.length &&
                (!this.props.isSendMail ||
                  (this.props.ownEmail &&
                    this.props.emailsToSendTo &&
                    this.props.emailsToSendTo.length))
                  ? ''
                  : 'disabled'
              }`}
              onClick={this.props.shareFiles}
            >
              {this.props.messages.share_files}
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default SendForm;

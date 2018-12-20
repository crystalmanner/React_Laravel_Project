import React, { Fragment } from 'react';

import Filesize from 'react-fine-uploader/filesize';
import Filename from 'react-fine-uploader/filename';
import FileInput from 'react-fine-uploader/file-input';
import CancelButton from 'react-fine-uploader/cancel-button';

const SendForm = ({
  ownEmail,
  isSendMail,
  emailsToSendTo,
  newEmailToSendTo,
  messageToSend,
  password,
  isDestructFile,
  addEmailToSendTo,
  removeEmailToSendTo,
  handleInputChange,
  shareFiles,
  uploader,
  submittedFiles,
  totalFileGigaBytes,
  toggleIsSendMail,
  messages
}) => {
  return (
    <Fragment>
      <div className="form__block">
        <div className="formContent">
          <div className="tooltip-container upload-section upload-full">
            <div className="tooltip">Maximum total file size is 4GB.</div>
            {!(submittedFiles && submittedFiles.length) ? (
              <Fragment>
                <FileInput
                  multiple
                  accept="*"
                  uploader={uploader}
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
                  <h2>{messages.select_files}</h2>
                  <p className="upload-info">{messages.max_upload_size}</p>
                </FileInput>
              </Fragment>
            ) : (
              <div className="uploadMore" style={{ display: 'block' }}>
                {submittedFiles &&
                  submittedFiles.map(id => (
                    <div key={id} className="uploadedFile">
                      <span>
                        <Filename
                          id={id}
                          uploader={uploader}
                          className="uploaded-file-name"
                        />
                        <Filesize
                          id={id}
                          uploader={uploader}
                          className="uploaded-file-size"
                        />
                      </span>
                      <CancelButton
                        id={id}
                        uploader={uploader}
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
                <FileInput
                  multiple
                  accept="*"
                  uploader={uploader}
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
                  <label>{messages.add_more}</label>
                  <p>
                    {(submittedFiles && submittedFiles.length) || 0}{' '}
                    {messages.files}
                    added,
                    <i>
                      ({Math.round((4 - totalFileGigaBytes) * 100) / 100} gb
                      remaining)
                    </i>
                  </p>
                </div>
              </div>
            )}
          </div>
          {isSendMail ? (
            <Fragment>
              <div className="tooltip-container form-element tooltipcontainer-two">
                <div className="tooltip w-200">{messages.tt_recipient}</div>
                <ul className="send-to-emails-list">
                  {emailsToSendTo &&
                    emailsToSendTo.map((email, i) => (
                      <li key={i}>
                        <span>{email}</span>{' '}
                        <button
                          onClick={() => removeEmailToSendTo(i)}
                          style={{
                            border: 'none',
                            color: '#e8e8e8',
                            cursor: 'pointer',
                            borderRadius: '50%',
                            width: '18px',
                            height: '18px',
                            backgroundColor: '#cf0101'
                          }}
                        >
                          <span>x</span>
                        </button>
                      </li>
                    ))}
                </ul>
                <input
                  type="email"
                  name="newEmailToSendTo"
                  value={newEmailToSendTo}
                  onKeyPress={e => {
                    if (e.key.toLocaleLowerCase() === 'enter') {
                      e.preventDefault();
                      addEmailToSendTo();
                    }
                  }}
                  onBlur={addEmailToSendTo}
                  onChange={handleInputChange}
                  className="form-control"
                />
                <label>{messages.enter_email}</label>
              </div>
              <div className="tooltip-container form-element">
                <div className="tooltip w-200 tooltip-three">
                  {messages.tt_yourmail}
                </div>
                <input
                  name="ownEmail"
                  value={ownEmail}
                  onChange={handleInputChange}
                  type="email"
                  className="form-control"
                />
                <label>{messages.enter_own_email}</label>
              </div>
            </Fragment>
          ) : (
            ''
          )}
          <div className="tooltip-container form-element">
            <div className="tooltip w-200">{messages.tt_message}</div>
            <textarea
              name="messageToSend"
              value={messageToSend}
              onChange={handleInputChange}
              className="form-control"
            />
            <label>
              {messages.message_receiver} ({messages.msg_optional})
            </label>
          </div>
          <div className="tooltip-container form-element">
            <div className="tooltip w-200">{messages.password_text}</div>
            <input
              name="password"
              value={password}
              onChange={handleInputChange}
              type="password"
              className="form-control"
            />
            <label>
              {messages.password} ({messages.msg_optional})
            </label>
          </div>
          <div className="tooltip-container checkbox-block">
            <div className="tooltip w-200">{messages.password_text}</div>
            <i className="float-left fa fa-question-circle" />
            <div className="custom-checkbox pull-left">
              <input
                name="isDestructFile"
                value={isDestructFile}
                onChange={handleInputChange}
                type="checkbox"
                className="custom-control-input"
              />
              <label className="custom-control-label">
                {messages.destruct_file}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="button__block float-left">
        <div className="float-left btn-group">
          <i className="fa fa-question-circle tooltip-container">
            <div className="tooltip w-200">{messages.share_type_texts}</div>
          </i>
          <button
            type="btn"
            className={
              'btn-orange btn-sm br-left icon-buttons' +
              (isSendMail ? ' active-link' : '')
            }
            onClick={toggleIsSendMail}
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
              (!isSendMail ? ' active-link' : '')
            }
            onClick={toggleIsSendMail}
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
            className="btn btn-orange btn-block btn-sm btn-upload"
            onClick={shareFiles}
          >
            {messages.share_files}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default SendForm;

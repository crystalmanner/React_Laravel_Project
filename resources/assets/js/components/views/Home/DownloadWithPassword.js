import React, { Fragment } from 'react';

const DownloadWithPassword = ({
  messages,
  passwordToSubmit,
  onDownloadClick,
  onPasswordChange,
  isInvalidPassword
}) => {
  return (
    <Fragment>
      <div className="wrapperP">
        <div className="base">
          <div className="base-bottom" />
          <div className="lock-inside-top" />
          <div className="lock-inside-bottom" />
        </div>
        <div className="lock-cirlce">
          <div className="lock-circle-inside" />
        </div>
        <div className="lock-box" />
      </div>
      <div className="password-fill">
        <p>{messages.fill_password}</p>
        <input
          type="password"
          placeholder={messages.password}
          value={passwordToSubmit}
          onChange={onPasswordChange}
        />
        {isInvalidPassword ? (
          <span
            className="invalid-feedback"
            style={{
              display: 'block'
            }}
          >
              {messages.wrong_pass}
          </span>
        ) : (
          ''
        )}
      </div>
      <div className="button__block password-btn">
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-orange"
            onClick={onDownloadClick}
          >
            {messages.download}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default DownloadWithPassword;

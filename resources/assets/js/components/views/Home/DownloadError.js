import React, { Fragment } from 'react';

const DownloadError = ({ errorStatus, messages, resetDownloadState }) => {
  errorStatus = errorStatus || 'invalidId';

  return (
    <Fragment>
      <div className="containerBoo">
        <div className="boo-wrapper">
          <div className="boo">
            <div className="face" />
          </div>
          <div className="shadow" />
        </div>
      </div>
      <div className="status-small">
        <p>{getErrorMessage(errorStatus, messages)}</p>
      </div>
      <div className="button__block">
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-orange"
            onClick={resetDownloadState}
          >
            {messages.ok}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const getErrorMessage = (errorStatus, messages) => {
  if (errorStatus === 'invalidId') {
    return messages.upload_not_found;
  }

  return messages.ynastm;
};

export default DownloadError;

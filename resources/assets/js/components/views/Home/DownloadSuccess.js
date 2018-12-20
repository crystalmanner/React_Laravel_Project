import React, { Fragment } from 'react';

const DownloadSuccess = ({ messages }) => {
  return (
    <Fragment>
      <div className="downCloud">
        <div className="btnI downloadI">
          <div className="cloudI">
            <div className="arrowI" />
          </div>
        </div>
      </div>
      <div className="download-status downloadsuccess-status text-center">
        <p>{messages.download_started}</p>
      </div>
      <div className="button__block password-btn">
        <div className="text-center">
          <a href="/">
            <button type="submit" className="btn btn-lg btn-orange">
              {messages.ok}
            </button>
          </a>
        </div>
      </div>
    </Fragment>
  );
};

export default DownloadSuccess;

import React, { Fragment } from 'react';

const UploadCanceled = ({ refreshPage, messages }) => {
  return (
    <Fragment>
      <div className="cell sad">
        <div className="head">
          <div className="face">
            <div className="l-eye" />
            <div className="r-eye" />
            <div className="mouth" />
          </div>
        </div>
      </div>
      <div className="download-status uploadcancel text-center">
        <p>{messages.msg_upload_canceled}</p>
      </div>
      <div className="button__block">
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-lg btn-orange w-100"
            onClick={refreshPage}
          >
            {messages.ok}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UploadCanceled;

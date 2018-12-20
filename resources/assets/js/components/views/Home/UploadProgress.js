import React, { Fragment } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import roundToPlace from '../../utils/roundDecimals';

const UploadProgress = ({
  isSendMail,
  numFiles,
  numEmails,
  uploadedSizeInMB,
  totalSizeInMB,
  speedInMbps,
  isPaused,
  isCanceling,
  pauseUpload,
  resumeUpload,
  onCancelPress,
  abortCancel,
  messages,
  cancelUpload
}) => {
  const uploadedPercentage = Math.round(
    (uploadedSizeInMB / totalSizeInMB) * 100
  );

  let secondsRemaining = null;

  if (speedInMbps) {
    secondsRemaining = (totalSizeInMB - uploadedSizeInMB) / speedInMbps;
  }

  document.title = `${uploadedPercentage}.00 % - ${roundToPlace(
    uploadedSizeInMB,
    1
  )} ${messages.msg_upload_of} ${roundToPlace(totalSizeInMB, 1)} MB`;

  return (
    <Fragment>
      <div className="spinner">
        <div style={{ margin: '8px' }}>
          <CircularProgressbar
            percentage={uploadedPercentage}
            text={`${uploadedPercentage}%`}
            initialAnimation={true}
            styles={{
              path: {
                stroke: '#fbbc3f',
                path: {
                  stroke: `red, ${uploadedPercentage / 100}`
                }
              },
              text: {
                fill: '#fbbc3f',
                textAnchor: 'middle',
                marginTop: '5px'
              },
              trail: {
                stroke: '#eeeeee'
              }
            }}
          />
        </div>
      </div>
      <p>
        {isSendMail
          ? messages.msg_sending_files
              .replace('[[x]]', numFiles)
              .replace('[[Y]]', numEmails)
          : messages.msg_sending_files2.replace('[[x]]', numFiles)}
      </p>

      {isCanceling ? (
        <Fragment>
          <div
            style={{
              fontSize: '14px',
              paddingTop: '50px',
              paddingBottom: '16px',
              color: '#111111',
              textAlign: 'center',
              maxHeight: '93px'
            }}
          >
            {messages.msg_confirmExit}
          </div>
          <div className="button__block">
            <div className="pull-left">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={cancelUpload}
              >
                {messages.yes}
              </button>
            </div>
            <div className="pull-right">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={abortCancel}
              >
                {messages.no}
              </button>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            <i>
              {roundToPlace(uploadedSizeInMB, 2)}
              {messages.msg_upload_of} {roundToPlace(totalSizeInMB, 2)}
              MB
            </i>
          </p>
          <div className="status">
            <p>
              <i className="fa fa-clock-o" aria-hidden="true" /> &plusmn;{' '}
              {secondsRemaining === null
                ? '...'
                : secondsRemaining > 60
                  ? `${Math.floor(secondsRemaining / 60)} ${
                      messages.msg_minutes
                    }`
                  : `${Math.round(secondsRemaining)} ${messages.msg_seconds}`}
            </p>
            <p>
              <i className="fa fa-wifi" aria-hidden="true" />{' '}
              {roundToPlace(speedInMbps, 2)} Mbps
            </p>
          </div>
          <div className="button__block">
            <div className="pull-left">
              <button
                style={{maxWidth: '145px'}}
                type="button"
                className="btn btn-lg btn-orange"
                onClick={onCancelPress}
              >
                {messages.msg_upload_cancel}
              </button>
            </div>
            <div className="pull-right">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={() => {
                  if (isPaused) {
                    return resumeUpload();
                  }

                  pauseUpload();
                }}
              >
                {isPaused ? messages.resume : messages.pause}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UploadProgress;

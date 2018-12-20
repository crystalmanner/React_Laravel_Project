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
  isCanceled,
  pauseUpload,
  resumeUpload,
  onCancelPress,
  abortCancel,
  cancelUpload
}) => {
  const uploadedPercentage = Math.round(
    (uploadedSizeInMB / totalSizeInMB) * 100
  );

  let secondsRemaining = null;

  if (speedInMbps) {
    secondsRemaining = (totalSizeInMB - uploadedSizeInMB) / speedInMbps;
  }

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
                stroke: '#fbbc3f'
              },
              text: {
                fill: '#fbbc3f',
                textAnchor: 'middle'
              }
            }}
          />
        </div>
      </div>
      <p>
        Sending {numFiles} file(s)
        {isSendMail ? `to ${numEmails} person(s)` : ''}
      </p>

      {isCanceling ? (
        <Fragment>
          <div
            style={{
              fontSize: '14px',
              paddingTop: '14px',
              textAlign: 'center'
            }}
          >
            Are you sure you want to leave the page?
          </div>
          <div className="button__block">
            <div className="pull-left">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={cancelUpload}
              >
                Yes
              </button>
            </div>
            <div className="pull-right">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={abortCancel}
              >
                No
              </button>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            <i>
              {roundToPlace(uploadedSizeInMB, 2)}
              MB uploaded of {roundToPlace(totalSizeInMB, 2)}
              MB
            </i>
          </p>
          <div className="status">
            <p>
              <i className="fa fa-clock-o" aria-hidden="true" /> &plusmn;{' '}
              {secondsRemaining === null
                ? 'Calculating...'
                : secondsRemaining > 60
                  ? `${Math.floor(secondsRemaining / 60)} Minute(s)`
                  : `${Math.round(secondsRemaining)} Second(s)`}
            </p>
            <p>
              <i className="fa fa-wifi" aria-hidden="true" /> {roundToPlace(speedInMbps, 2)} Mbps
            </p>
          </div>
          <div className="button__block">
            <div className="pull-left">
              <button
                type="button"
                className="btn btn-lg btn-orange"
                onClick={onCancelPress}
              >
                Cancel Upload
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
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UploadProgress;

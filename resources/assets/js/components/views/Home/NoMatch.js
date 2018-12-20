import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
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
        <p>File(s) not found, maybe it have been destroyed ?</p>
      </div>
      <div className="button__block">
        <div className="text-center">
          <Link to="/">
            <button type="submit" className="btn btn-lg btn-orange">
              Go to home page
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default NoMatch;

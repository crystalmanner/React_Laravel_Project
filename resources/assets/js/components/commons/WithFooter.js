import React, { Fragment } from 'react';
import Footer from './Footer';

const WithFooter = ({ Component, ...otherProps }) => (
  <Fragment>
    <Component {...otherProps} />
    <Footer />
  </Fragment>
);

export default WithFooter;

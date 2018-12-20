import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import Header from '../../commons/Header';
import localize from '../../commons/LanguageHOC';
import { getLanguageSpecificMetaTagsAndTitle } from '../../utils/tags';

const Advertisement = props => {
  return (
    <Fragment>
      {getLanguageSpecificMetaTagsAndTitle(
        props.messages.mt_advertisement_desc,
        props.messages.mt_advertisement_keywords,
        props.messages.mt_advertisement_title
      )}
      <Header title="ADVERTISEMENT" />
      <section id="content" style={{ marginBottom: '190px' }}>
        <div className="content-wrap">
          <div className="container clearfix">
            <div className="col_full">
              <blockquote>
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.messages.page_advertisement_content
                  }}
                />
                <Link to="contact-us">
                  {props.messages.page_advertisement_contact}
                </Link>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default localize(Advertisement);

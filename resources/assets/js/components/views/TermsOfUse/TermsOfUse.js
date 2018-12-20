import React, { Fragment } from 'react';

import Header from '../../commons/Header';
import localize from '../../commons/LanguageHOC';
import { getLanguageSpecificMetaTagsAndTitle } from '../../utils/tags';

const TermsOfUse = props => {
  return (
    <Fragment>
      {getLanguageSpecificMetaTagsAndTitle(
        props.messages.mt_terms_of_use_desc,
        props.messages.mt_terms_of_use_keywords,
        props.messages.mt_terms_of_use_title
      )}
      <Header title="TERMS OF USE" />
      <section id="content" style={{ marginBottom: '190px' }}>
        <div className="content-wrap">
          <div className="container clearfix">
            <div className="col_full">
              {
                <span
                  dangerouslySetInnerHTML={{
                    __html: props.messages.terms_of_use_page_content
                  }}
                />
              }
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default localize(TermsOfUse);

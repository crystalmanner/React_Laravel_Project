import $ from 'jquery';
import React from 'react';
import { Helmet } from 'react-helmet';

// export const setLanguageSpecificMetaTagsAndTitle = (desc, keywords, title) => {

//   document.title = title;

//   $('meta[name=description]').remove();
//   $('head').append(`<meta name="description" content="${desc}">`);

//   $('meta[name=Keywords]').remove();
//   $('head').append(`<meta name="Keywords" content="${keywords}">`);

//   $('meta[property="og:description"]').remove();
//   $('head').append(
//     `<meta property="og:description" content="${desc}">`
//   );

//   $('meta[property="og:title"]').remove();
//   $('head').append(`<meta property="og:title" content="${title}">`);

//   $('meta[name="twitter:title"]').remove();
//   $('head').append(
//     `<meta name="twitter:title" content="${title}">`
//   );

//   $('meta[name="twitter:description"]').remove();
//   $('head').append(
//     `<meta name="twitter:description" content="${desc}">`
//   );
// };

export const getLanguageSpecificMetaTagsAndTitle = (
  desc,
  keywords,
  title,
  isSetTitle = true
) => {
  return (
    <Helmet>
      {isSetTitle ? <title>{title}</title> : ''}

      <meta name="description" content={desc} />
      <meta name="Keywords" content={keywords} />

      <meta property="og:description" content={desc} />
      <meta property="og:title" content={title} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
};

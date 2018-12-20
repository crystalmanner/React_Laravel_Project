import React, { Fragment } from 'react';

import Header from '../../commons/Header';

const PrivacyPolicy = () => {
  document.title = 'Sendgb.com | Privacy Policy';

  return (
    <Fragment>
      <Header title="PRIVACY POLICY" />
      <section id="content" style={{ marginBottom: '190px' }}>
        <div className="content-wrap">
          <div className="container clearfix">
            <div className="col_full">
              <p>
                For SendGB, the privacy of personal information is essential.
                Data can be collected at any time while using our products and
                services. The collected data is only used by SendGB to help
                improve the site / service and is not shared with third parties.
                <br />
                <br />
                The SendGB site takes precautions to prevent unauthorized access
                to the information of the person. The information belonging to
                our users is only given to third parties or institutions by
                court decision. User information (behavior) can be used by
                SendGB to provide better service.
                <br />
                <br />
                <b>
                  Collected data pertaining to the user during the use of
                  SendGB;
                </b>
                <br />
                <br />
                Uploaded file type,
                <br />
                File size,
                <br />
                Number of files,
                <br />
                Receivers Email addresses,
                <br />
                Sender email address,
                <br />
                Sender's IP address, browser information, location information,
                <br />
                The recipient's IP address, browser information, location
                information,
                <br />
                <br />
                <b>SendGB</b> will not receive credit card or payment
                information from users.
                <br />
                <br />
                <b>SendGB</b> uses the SSL-Secure Sockets Layer (secure login
                layer) certificate for security between users and servers.
                <br />
                <br />
                <b>SendGB</b> uses <b> "Cookies" </b> like many websites. A
                cookie is a small data file that is transferred to your
                computer's hard drive for record keeping purposes.
                <br />
                <br />
                For example, <b>SendGB</b> loads a cookie that remembers your
                user ID to make your next visit easier.
                <br />
                <br />
                <b>SendGB</b> is so important to your personal information
                security that it handles very little personal data. You do not
                need to register to use <b>SendGB</b>. We do not have an entry
                procedure for our free services.
                <br />
                <br />
                To use our service and send your files, you may need to enter
                your own e-mail address, the files (recipients) you want to send
                and the e-mail addresses of the recipients. With your file you
                can also add a personal message for recipients. <b>
                  SendGB
                </b>{' '}
                must be able to process this data when sending files to ensure
                that you use our service. Basically we will use your personal
                data only to send your file and improve our services. Of course,
                we will not sell it to third parties or affiliated parties or
                use it for disturbing commercial messages.
                <br />
                <br />
                If you have any questions about how <b>SendGB</b> handles your
                personal data, please send an email to{' '}
                <a href="mailto:info@sendgb.com">info@sendgb.com</a> to{' '}
                <b>SendGB</b>.<br />
                <br />
                You can always safely use <b>SendGB.com</b> for large file
                sending.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default PrivacyPolicy;

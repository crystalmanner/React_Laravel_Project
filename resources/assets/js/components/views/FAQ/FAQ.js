import React, { Fragment } from 'react';

import Header from '../../commons/Header';

const FAQ = () => {
  document.title = 'SendGB | Send Large Files, What is SendGB?';

  return (
    <Fragment>
      <Header title="FREQUENTLY ASKED QUESTIONS" />
      <section id="content" style={{ marginBottom: '190px' }}>
        <div className="content-wrap">
          <div className="container clearfix">
            <div className="col_full">
              <blockquote>
                We want to help you get the most out of SendGB. We have added a
                list of the most common questions regarding SendGB. If you can't
                find the answer for what you are looking for below, then please
                get in touch with us at{' '}
                <a href="mailto:info@sendgb.com">info@sendgb.com</a>
              </blockquote>
              <p />
            </div>

            <div className="postcontent nobottommargin clearfix col_full">
              <div id="faqs" className="faqs">
                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question1"
                  >
                    <i className="fa fa-question-circle" />
                    Do I need to register to send large files?
                  </div>
                  <div className="togglec collapse" id="Question1">
                    Absolutely not, in fact you can't register because we don't
                    have this facility. You can use SendGB 100% free without
                    registration for life, Guaranteed.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question2"
                  >
                    <i className="fa fa-question-circle" />
                    Which file formats can be shared?
                  </div>
                  <div className="togglec collapse" id="Question2">
                    All known file formats are supported. You can send all file
                    types.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question3"
                  >
                    <i className="fa fa-question-circle" />
                    What's the file size limit to transfer?
                  </div>
                  <div className="togglec collapse" id="Question3">
                    You can upload up to 4 GB per file.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question4"
                  >
                    <i className="fa fa-question-circle" />
                    Can I share folders?
                  </div>
                  <div className="togglec collapse" id="Question4">
                    If you want to upload a whole folder, it is not directly
                    possible due to current web browser limitations. The way to
                    get around this is to compress (zip) the folder and add
                    files as zip.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question5"
                  >
                    <i className="fa fa-question-circle" />
                    How can I upload files?
                  </div>
                  <div className="togglec collapse" id="Question5">
                    Click <b>"Add File(s)"</b> button to select the file that
                    you want to share, or just drag and drop your file anywhere
                    on upload page to start sending.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question6"
                  >
                    <i className="fa fa-question-circle" />
                    How many people can I send files to?
                  </div>
                  <div className="togglec collapse" id="Question6">
                    You can send files to up to 20 people per transfer.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question7"
                  >
                    <i className="fa fa-question-circle" />
                    How many times can I upload?
                  </div>
                  <div className="togglec collapse" id="Question7">
                    You can make unlimited transfers per day. No transfer limit.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question8"
                  >
                    <i className="fa fa-question-circle" />
                    How long are my files kept?
                  </div>
                  <div className="togglec collapse" id="Question8">
                    Your files will be stored on the server for a time frame of
                    7 days. For data privacy reasons, data that is subject to
                    expiration will be deleted automatically.
                    <br />
                    <br />
                    Once a file has expired, it is automatically removed from
                    our servers. Unfortunately once a file has been removed,
                    there is no way of retrieving it back.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question9"
                  >
                    <i className="fa fa-question-circle" />
                    Can I recover a deleted file?
                  </div>
                  <div className="togglec collapse" id="Question9">
                    No, once the file is removed it's completely gone, no logs
                    or records are kept and the only way it can come back is if
                    it's uploaded again.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question10"
                  >
                    <i className="fa fa-question-circle" />
                    Why the uploading speed is slow?
                  </div>
                  <div className="togglec collapse" id="Question10">
                    There are many factors which affect upload speed. These can
                    include your computer, network, router, your ISP traffic and
                    our server load.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question11"
                  >
                    <i className="fa fa-question-circle" />
                    Can I protect my file with password?
                  </div>
                  <div className="togglec collapse" id="Question11">
                    You can add password protection to every transfer to enjoy
                    enhanced security. If you would like to utilize this option,
                    make sure that all of your recipients are aware of the
                    password because they will not be able download the data
                    without it.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question12"
                  >
                    <i className="fa fa-question-circle" />
                    Do i need to install software to upload/download files?
                  </div>
                  <div className="togglec collapse" id="Question12">
                    Our service is accessible directly from your browser
                    (Chrome, Firefox, Internet Explorer, Safari...) without any
                    software installation or application requirements.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question13"
                  >
                    <i className="fa fa-question-circle" />
                    Which browser can I use?
                  </div>
                  <div className="togglec collapse" id="Question13">
                    SendGB has been developed and tested to work with most web
                    browsers. SendGB would highly recommend you use the latest
                    version of Google Chrome, Firefox, Safari or Internet
                    Explorer.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question14"
                  >
                    <i className="fa fa-question-circle" />
                    Why does the upload or download do not run as expected?
                  </div>
                  <div className="togglec collapse" id="Question14">
                    SendGB is compatible with all browsers.We would recommend
                    updating your web browser to the most up to date.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question15"
                  >
                    <i className="fa fa-question-circle" />
                    Can't open the downloaded file. What can I do?
                  </div>
                  <div className="togglec collapse" id="Question15">
                    Your Files will are compressed as .Zip file format on the
                    server during the attaching process. Zip files will have the
                    extension .zip, which can be opened by a windows or WinZip.
                    You can download the free Zip Program.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question16"
                  >
                    <i className="fa fa-question-circle" />
                    Will Sendgb send any notification downloading my files?
                  </div>
                  <div className="togglec collapse" id="Question16">
                    Yes, SendGB sends email notifications for uploading,
                    downloading and deleting…
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question17"
                  >
                    <i className="fa fa-question-circle" />
                    Why the recipient can not get an email?
                  </div>
                  <div className="togglec collapse" id="Question17">
                    If the recipient has not received an email as notification.
                    The recipient can check their spam or junk folder.
                    Sometimes, email will end up in one of these folders.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question18"
                  >
                    <i className="fa fa-question-circle" />
                    Will the recipients see the email addresses I sent the file
                    to?
                  </div>
                  <div className="togglec collapse" id="Question18">
                    Each email is sent separately. It is just like using BCC
                    function in an email.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question19"
                  >
                    <i className="fa fa-question-circle" />
                    How can i delete my upload?
                  </div>
                  <div className="togglec collapse" id="Question19">
                    There is no facility to delete an uploaded file. But don'y
                    worry if you select "Destruct the file" in options menu. The
                    upload will destruct itself after all the recipients have
                    downloaded the file.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question20"
                  >
                    <i className="fa fa-question-circle" />I can't find
                    downloaded files. Where are they?
                  </div>
                  <div className="togglec collapse" id="Question20">
                    Your file will store in your computer's Downloads folder.
                    This can be changed (for Chrome, Explorer, Firefox, and
                    Safari). If you still do not find, use the search function
                    on your computer.{' '}
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question21"
                  >
                    <i className="fa fa-question-circle" />
                    Who you are?
                  </div>
                  <div className="togglec collapse" id="Question21">
                    Sendgb is bootstrapped and developed by a group of
                    developers. It was developed in March 2015.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question22"
                  >
                    <i className="fa fa-question-circle" />
                    Where are SendGB Servers?
                  </div>
                  <div className="togglec collapse" id="Question22">
                    Our servers are located in Paris, France
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question23"
                  >
                    <i className="fa fa-question-circle" />
                    Do you use cookies?
                  </div>
                  <div className="togglec collapse" id="Question23">
                    We use cookies to improve the user interface (email address
                    auto-complete, language etc.) Also, we use the statistical
                    application Google Analytics, which uses it own cookies{' '}
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question24"
                  >
                    <i className="fa fa-question-circle" />
                    Do you store information about users?
                  </div>
                  <div className="togglec collapse" id="Question24">
                    We store little information about users (email, ip, language
                    and Web browser). This information is used for security
                    purposes and to enable us to make statistics about our users
                    and improve our services.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question25"
                  >
                    <i className="fa fa-question-circle" />
                    Do you use my information?
                  </div>
                  <div className="togglec collapse" id="Question25">
                    We do not sell and do not distribute information of our
                    users to third parties. We only use your information to
                    improve our services.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question26"
                  >
                    <i className="fa fa-question-circle" />
                    Do I have to pay to sending files?
                  </div>
                  <div className="togglec collapse" id="Question26">
                    SendGB is totally free.No needed payment for sending files
                    up to 4 GB.
                  </div>
                </div>

                <div className="toggle faq faq-marketplace faq-authors">
                  <div
                    className="togglet"
                    data-toggle="collapse"
                    href="#Question27"
                  >
                    <i className="fa fa-question-circle" />
                    How can I contribute to SendGB?
                  </div>
                  <div className="togglec collapse" id="Question27">
                    SendGB is a totally free file transfer service. We always
                    need the support of our users. You can share SendGB with
                    your friends. You can also hear SendGB via social media. We
                    can support your social responsibility project with your
                    contribution.
                    <br />
                    <br />
                    <b>Our Social Media Accounts:</b>
                    <br />
                    <br />
                    <b>Facebook:</b>{' '}
                    <a href="https://www.facebook.com/sendgb" target="_blank">
                      https://www.facebook.com/sendgb
                    </a>
                    <br />
                    <b>Twitter:</b>{' '}
                    <a href="https://twitter.com/sendgb" target="_blank">
                      https://twitter.com/sendgb
                    </a>
                    <br />
                    <b>Linkedin:</b>{' '}
                    <a
                      href="https://www.linkedin.com/company/sendgb"
                      target="_blank"
                    >
                      https://www.linkedin.com/company/sendgb
                    </a>
                    <br />
                    <b>Google+:</b>{' '}
                    <a href="https://plus.google.com/+sendgb" target="_blank">
                      https://plus.google.com/+sendgb
                    </a>
                    <br />
                    <b>Instagram:</b>{' '}
                    <a href="https://www.instagram.com/sendgb/" target="_blank">
                      https://www.instagram.com/sendgb/
                    </a>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default FAQ;

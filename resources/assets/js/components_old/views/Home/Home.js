import $ from 'jquery';
import React, { Component } from 'react';
import Dropzone from 'react-fine-uploader/dropzone';
import FineUploaderTraditional from 'fine-uploader-wrappers';

import logo from '../../../../images/logo-b@1x.png';

import { FORM_STATES, SIDE_MENU_LINKS, SITE_URL } from './constants';

import Sidemenu from './Sidemenu';
import SendForm from './SendForm';
import ImageSlide from './ImageSlide';
import UploadProgress from './UploadProgress';
import UploadComplete from './UploadComplete';
import localize from '../../commons/LanguageHOC';
import emitLanguageChangeEvent from '../../utils/events';

window.addEventListener(
  'dragover',
  function(e) {
    e.preventDefault();
  },
  false
);
window.addEventListener(
  'drop',
  function(e) {
    e.preventDefault();
  },
  false
);

//Creating a random string as upload ID
function shuffle(string) {
  const parts = string.split('');
  for (let i = parts.length; i > 0; ) {
    const random = parseInt(Math.random() * i);
    const temp = parts[--i];
    parts[i] = parts[random];
    parts[random] = temp;
  }
  return parts.join('');
}

const long_value = shuffle(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
);
const long_value_fid = shuffle(
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
);
const value = long_value.substr(0, 11);
const valuefid = long_value_fid.substr(0, 7);

const uploader = new FineUploaderTraditional({
  options: {
    uploaderType: 'basic',
    autoUpload: false,
    version: 2,
    request: {
      endpoint: SITE_URL + '/api/upload'
    },
    debug: true,
    chunking: {
      enabled: true,
      partSize: 5 * 1024 * 1024,
      success: {
        endpoint: SITE_URL + '/api/upload?done'
      },
      concurrent: {
        enabled: true
      }
    },
    deleteFile: {
      enabled: true
    },
    retry: {
      enableAuto: true,
      autoAttemptDelay: 60,
      maxAutoAttempts: 30
    },
    resume: {
      enabled: true
    },
    camera: {
      ios: true
    },
    multiple: true,
    workarounds: {
      iosEmptyVideos: true,
      ios8BrowserCrash: true,
      ios8SafariUploads: true
    },
    validation: {
      itemLimit: 500,
      sizeLimit: 4 * 1024 * 1024 * 1024
    }
  }
});

const isFileGone = status => {
  return ['canceled', 'deleted'].indexOf(status) >= 0;
};

class Home extends Component {
  constructor() {
    super();

    this.sideMenuLinks = [
      SIDE_MENU_LINKS.aboutUs,
      SIDE_MENU_LINKS.howSendgbWorks,
      SIDE_MENU_LINKS.faq,
      SIDE_MENU_LINKS.socialResponsibility,
      SIDE_MENU_LINKS.privacyPolicy,
      SIDE_MENU_LINKS.termsOfUse,
      SIDE_MENU_LINKS.advertisement,
      SIDE_MENU_LINKS.contactUs
    ];

    this.languages = [
      { title: 'English', className: 'bg-en', key: 'en' },
      { title: 'Türkçe', className: 'bg-tr', key: 'tr' },
      { title: 'Deutsch', className: 'bg-de', key: 'de' },
      { title: 'Français', className: 'bg-fr', key: 'fr' },
      { title: 'Nederlands', className: 'bg-nl', key: 'nl' },
      { title: 'Español', className: 'bg-es', key: 'es' },
      { title: 'Italiano', className: 'bg-it', key: 'it' },
      { title: 'Hrvatska', className: 'bg-hr', key: 'hr' },
      { title: 'Român', className: 'bg-ro', key: 'ro' },
      { title: 'Russian', className: 'bg-ru', key: 'ru' },
      { title: 'Português', className: 'bg-pt', key: 'pt' },
      { title: 'عربى', className: 'bg-ar', key: 'ar' }
    ];

    this.state = {
      isSendMail: true,
      language: 'English',
      isSubmenuOpen: false,
      canShowSubmenu: false,
      submittedFiles: [],
      totalFileGigaBytes: 0,
      ownEmail: '',
      emailsToSendTo: [],
      newEmailToSendTo: '',
      messageToSend: '',
      password: '',
      isDestructFile: false,
      formState: FORM_STATES.isInitializing,
      isFileUploaded: false,
      uploadData: {
        uploadStartTime: null,
        uploadedSizeInMB: 0, // TODO: Use data from server instead of static value
        speedInMbps: 0, // TODO: Use data from server instead of static value
        isCanceled: false,
        isCanceling: false,
        isPaused: false
      },
      uploadTimer: '',
      uploadCompleteData: {
        downloadLink: 'http://127.0.0.1:8000/eIRU8QDXOVM', // TODO: Use data from server instead of static value
        isCopied: false
      }
    };

    this.shareFiles = this.shareFiles.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.pauseUpload = this.pauseUpload.bind(this);
    this.abortCancel = this.abortCancel.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.resumeUpload = this.resumeUpload.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.toggleSubmenu = this.toggleSubmenu.bind(this);
    this.addEmailToSendTo = this.addEmailToSendTo.bind(this);
    this.toggleIsSendMail = this.toggleIsSendMail.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDownloadLinkCopy = this.onDownloadLinkCopy.bind(this);
    this.removeEmailToSendTo = this.removeEmailToSendTo.bind(this);
    this.toggleCanShowSubmenu = this.toggleCanShowSubmenu.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addEmailToSendTo() {
    const newEmail = this.state.newEmailToSendTo;

    if (newEmail) {
      // TODO: also validate email here before adding it to email list.
      this.setState({
        newEmailToSendTo: '',
        emailsToSendTo: [...this.state.emailsToSendTo, newEmail]
      });
    }
  }

  removeEmailToSendTo(emailIndex) {
    let emailsToSendTo = this.state.emailsToSendTo;

    this.setState({
      emailsToSendTo: [
        ...emailsToSendTo.slice(0, emailIndex),
        ...emailsToSendTo.slice(emailIndex + 1)
      ]
    });
  }

  componentDidMount() {
    $('.carousel').carousel({
      interval: 3000
    });

    uploader.on('statusChange', (id, oldStatus, newStatus) => {
      // TODO: Call 'removeFileRef' after file has been uploaded.
      if (newStatus === 'submitted') {
        const submittedFiles = [...this.state.submittedFiles];
        let totalFileGigaBytes = this.state.totalFileGigaBytes;

        const fileBytes = uploader.methods.getSize(id);
        totalFileGigaBytes += fileBytes / Math.pow(10, 9);

        submittedFiles.push(id);
        this.setState({ submittedFiles, totalFileGigaBytes });
      } else if (isFileGone(newStatus)) {
        const submittedFiles = this.state.submittedFiles;
        let totalFileGigaBytes = this.state.totalFileGigaBytes;

        const indexToRemove = submittedFiles.indexOf(id);

        const fileBytes = uploader.methods.getSize(id);
        totalFileGigaBytes -= fileBytes / Math.pow(10, 9);

        submittedFiles.splice(indexToRemove, 1);
        this.setState({ submittedFiles, totalFileGigaBytes });
      }
    });

    uploader.on('totalProgress', (totalUploadedBytes, totalBytes) => {
      let speedInMbps = this.state.uploadData.speedInMbps;
      const uploadedSizeInMB = totalUploadedBytes * Math.pow(10, -6);

      const timeStarted = this.state.uploadData.uploadStartTime;

      if (Date.parse(timeStarted)) {
        const secondsElapsed = (new Date() - timeStarted) / 1000;

        speedInMbps = uploadedSizeInMB / secondsElapsed;
      }

      this.setState({
        uploadData: {
          ...this.state.uploadData,
          uploadedSizeInMB: uploadedSizeInMB,
          speedInMbps
        }
      });
    });

    uploader.on('allComplete', (succeeded, failed) => {
      const filesAdded = this.state.submittedFiles.length;
      if (succeeded.length >= filesAdded) {
        const formInfo = this.getFormInfoObject();
        formInfo.zip = filesAdded;
        formInfo.qqtotalfilesize =
          this.state.totalFileGigaBytes * Math.pow(10, 9);

        $.post(
            SITE_URL + '/api/upload',
          formInfo,
          function(theResponse) {}
        );
      }

      this.goToNextFormState();

      $('html head')
        .find('title')
        .text('100%');

      const UploadURL = SITE_URL + '/' + value;

      const downloadLink = 'https://' + UploadURL;
      this.setState({
        uploadCompleteData: {
          ...this.state.uploadCompleteData,
          downloadLink: downloadLink
        }
      });

      //PLAY SOUND
      // try {
      //   $('#PlayOnUpload').trigger('click');
      // } catch (err) {}

      if (this.state.isSendMail) {
        // document.getElementById('emailMessage').style.display = 'block';
      } else {
        // document.getElementById('linkMessage').style.display = 'block';
      }
    });
  }

  getFormInfoObject() {
    return {
      email_from: this.state.ownEmail,
      email_to: this.state.emailsToSendTo,
      share: this.state.isSendMail ? 'mail' : 'link',
      u_type: 1,
      destruct: this.state.isDestructFile ? 'yes' : 'no',
      message: this.state.messageToSend,
      password: this.state.password,
      id: value,
      fid: valuefid
    };
  }

  toggleCanShowSubmenu() {
    let isSubmenuOpen = this.state.isSubmenuOpen;

    if (this.state.canShowSubmenu) {
      isSubmenuOpen = false;
    }

    this.setState((prevState, props) => {
      return { canShowSubmenu: !prevState.canShowSubmenu, isSubmenuOpen };
    });
  }

  toggleSubmenu() {
    this.setState((prevState, props) => {
      return { isSubmenuOpen: !prevState.isSubmenuOpen };
    });
  }

  setLanguage(newLanguage) {
    this.setState({ language: newLanguage.title });
    emitLanguageChangeEvent(newLanguage.key);
  }

  mapMenuLinkToRoutePath(menulink) {
    switch (menulink) {
      case SIDE_MENU_LINKS.aboutUs:
        return 'about-us';
      case SIDE_MENU_LINKS.howSendgbWorks:
        return 'how-does-it-work';
      case SIDE_MENU_LINKS.faq:
        return 'faq';
      case SIDE_MENU_LINKS.socialResponsibility:
        return 'social-responsibility';
      case SIDE_MENU_LINKS.privacyPolicy:
        return 'privacy-policy';
      case SIDE_MENU_LINKS.termsOfUse:
        return 'terms-of-use';
      case SIDE_MENU_LINKS.advertisement:
        return 'advertisement';
      case SIDE_MENU_LINKS.contactUs:
        return 'contact-us';
      default:
        return '';
    }
  }

  onMenuSelect(menuLink) {
    // TODO: Obtain a mapping from language to route value and also from menuLink to route value
    // TODO: Maybe find another way to open link in new tab.
    const win = window.open(
      this.state.language + '/' + this.mapMenuLinkToRoutePath(menuLink),
      '_blank'
    );
    win.focus();
  }

  goToNextFormState() {
    switch (this.state.formState) {
      case FORM_STATES.isInitializing:
        this.setState({ formState: FORM_STATES.isUploading });

        break;

      case FORM_STATES.isUploading:
        this.setState({ formState: FORM_STATES.uploadCompleted });

        break;

      default:
        this.setState({ formState: FORM_STATES.isInitializing });
        break;
    }
  }

  shareFiles() {
    if (!this.state.submittedFiles.length) {
      return;
    }

    if (
      this.state.isSendMail &&
      !(
        this.state.ownEmail &&
        this.state.emailsToSendTo &&
        this.state.emailsToSendTo.length
      )
    ) {
      return;
    }

    this.goToNextFormState();
    this.uploadFiles();
  }

  toggleIsSendMail() {
    this.setState({ isSendMail: !this.state.isSendMail });
  }

  uploadFiles() {
    this.setState({
      uploadData: { ...this.state.uploadData, uploadStartTime: new Date() }
    });

    const u_type = 1;
    const share = this.state.isSendMail ? 'mail' : 'link';

    const formInfo = this.getFormInfoObject();

    uploader.methods.setParams(formInfo);

    uploader.methods.uploadStoredFiles();

    const degis =
      'id=' +
      value +
      '&opt=ins&utype=' +
      u_type +
      '&type=' +
      share +
      '&size=0&files=' +
      this.state.submittedFiles.length;

    $.post('http://127.0.0.1:8000/api/ajax', degis, function(
      response
    ) {});
  }

  // fakeUpload() {
  //   const uploadTimer = setInterval(() => {
  //     let newUploadedSizeInMB = this.state.uploadData.uploadedSizeInMB + 4;
  //     let timeRemaining = '2 minutes';

  //     let isStopTimer = false;

  //     if (newUploadedSizeInMB > this.state.totalFileGigaBytes * 1000) {
  //       newUploadedSizeInMB = this.state.totalFileGigaBytes * 1000;
  //       isStopTimer = true;
  //       timeRemaining = '0 seconds';
  //     }

  //     this.setState({
  //       uploadData: {
  //         ...this.state.uploadData,
  //         uploadedSizeInMB: newUploadedSizeInMB,
  //         timeRemaining
  //       }
  //     });

  //     if (isStopTimer) {
  //       clearInterval(uploadTimer);
  //       this.goToNextFormState();
  //     }
  //   }, 1000);

  //   this.setState({ uploadTimer });
  // }

  refreshPage() {
    window.location.reload(false);
  }

  cancelUpload() {
    this.setState({
      uploadData: { ...this.state.uploadData, isCanceled: true }
    });

    uploader.methods.cancelAll();

    this.refreshPage();
  }

  pauseUpload() {
    this.setState({
      uploadData: { ...this.state.uploadData, isPaused: true }
    });

    for (let fileId of this.state.submittedFiles) {
      const isPaused = uploader.methods.pauseUpload(fileId);
    }
  }

  onCancelPress() {
    this.setState({
      uploadData: { ...this.state.uploadData, isCanceling: true }
    });
  }

  abortCancel() {
    this.setState({
      uploadData: { ...this.state.uploadData, isCanceling: false }
    });
  }

  resumeUpload() {
    this.setState({
      uploadData: { ...this.state.uploadData, isPaused: false }
    });

    this.setState({
      uploadData: { ...this.state.uploadData, uploadStartTime: new Date() }
    });

    for (let fileId of this.state.submittedFiles) {
      const isResumed = uploader.methods.continueUpload(fileId);
    }
  }

  onDownloadLinkCopy() {
    this.setState({
      uploadCompleteData: { ...this.state.uploadCompleteData, isCopied: true }
    });
  }

  getViewFromFormState() {
    switch (this.state.formState) {
      case FORM_STATES.isInitializing:
        return (
          <SendForm
            isSendMail={this.state.isSendMail}
            ownEmail={this.state.ownEmail}
            emailsToSendTo={this.state.emailsToSendTo}
            newEmailToSendTo={this.state.newEmailToSendTo}
            messageToSend={this.state.messageToSend}
            password={this.state.password}
            isDestructFile={this.state.isDestructFile}
            addEmailToSendTo={this.addEmailToSendTo}
            removeEmailToSendTo={this.removeEmailToSendTo}
            handleInputChange={this.handleInputChange}
            shareFiles={this.shareFiles}
            uploader={uploader}
            submittedFiles={this.state.submittedFiles}
            totalFileGigaBytes={this.state.totalFileGigaBytes}
            toggleIsSendMail={this.toggleIsSendMail}
            messages={this.props.messages}
          />
        );

      case FORM_STATES.isUploading:
        return (
          <UploadProgress
            isSendMail={this.state.isSendMail}
            numEmails={this.state.emailsToSendTo.length}
            numFiles={this.state.submittedFiles.length}
            totalSizeInMB={this.state.totalFileGigaBytes * 1000}
            onCancelPress={this.onCancelPress}
            pauseUpload={this.pauseUpload}
            resumeUpload={this.resumeUpload}
            cancelUpload={this.cancelUpload}
            abortCancel={this.abortCancel}
            {...this.state.uploadData}
          />
        );

      case FORM_STATES.uploadCompleted:
        return (
          <UploadComplete
            isSendMail={this.state.isSendMail}
            refreshPage={this.refreshPage}
            onCopy={this.onDownloadLinkCopy}
            {...this.state.uploadCompleteData}
          />
        );

      default:
        return '';
    }
  }

  render() {
    return (
      <div className="main--container">
        <Dropzone
          style={{
            height: '100%',
            width: '100%',
            position: 'fixed',
            zIndex: '10'
          }}
          dropActiveClassName="dropzone-active"
          uploader={uploader}
        >
          <span style={{ display: 'none' }}>Drop your files here</span>
        </Dropzone>
        <div
          id="carousel"
          className="carousel carousel-fade"
          data-ride="carousel"
        >
          <ImageSlide />
          <div className="inner__container">
            <div className="row">
              <div className="logo-container">
                <a className="menulink">
                  <i className="fa fa-bars" />
                </a>
                <img src={logo} alt="SendGB" />
                <Sidemenu
                  language={this.state.language}
                  languages={this.languages}
                  menuLinks={this.sideMenuLinks}
                  isSubmenuOpen={this.state.isSubmenuOpen}
                  canShowSubmenu={this.state.canShowSubmenu}
                  setLanguage={this.setLanguage}
                  onMenuSelect={this.onMenuSelect}
                  toggleSubmenu={this.toggleSubmenu}
                  toggleCanShowSubmenu={this.toggleCanShowSubmenu}
                />
              </div>
            </div>
            <div className="row">
              <div className="OuterDiv">
                <div className="MainOuter">
                  <div className="MainMiddle">
                    <div className="MainContent">
                      <div
                        className={
                          'form__container bounceInLeft animated' +
                          (this.state.formState === FORM_STATES.isUploading
                            ? ' file-progress-section'
                            : '') +
                          (this.state.formState === FORM_STATES.uploadCompleted
                            ? ' upload-success-section'
                            : '')
                        }
                      >
                        {this.getViewFromFormState()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default localize(Home);

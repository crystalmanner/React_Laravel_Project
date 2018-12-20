import $ from 'jquery';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dropzone from 'react-fine-uploader/dropzone';
import FineUploaderTraditional from 'fine-uploader-wrappers';
// import FineUploaderS3 from 'fine-uploader-wrappers/s3';

import logo from '../../assets/images/sendgb.png';
import audioOgg from '../../assets/audio/sendgb.ogg';
import audioMp3 from '../../assets/audio/sendgb.mp3';
import audioAac from '../../assets/audio/sendgb.aac';

import { FORM_STATES, SIDE_MENU_LINKS, SITE_URL } from './constants';

import Sidemenu from './Sidemenu';
import SendForm from './SendForm';
import Download from './Download';
import ImageSlide from './ImageSlide';
import UploadProgress from './UploadProgress';
import UploadComplete from './UploadComplete';
import localize from '../../commons/LanguageHOC';
import { isValidEmail } from '../../utils/validation';
import emitLanguageChangeEvent from '../../utils/events';
import UploadCanceled from './UploadCanceled';
import NoMatch from './NoMatch';
import { getCurrentlySelectedLanguage } from '../../config/lang';
import { getLanguageSpecificMetaTagsAndTitle } from '../../utils/tags';
import {Button, Modal} from "react-bootstrap";

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
      // endpoint: 'http://45.33.27.72/nurettins/src/upload-chunks.php'
      endpoint: '/api/upload-chunks'
    },
    debug: true,
    chunking: {
      enabled: true,
      partSize: 5 * 1024 * 1024,
      success: {
        // endpoint: 'http://45.33.27.72/nurettins/src/upload-chunks.php?done'
          endpoint: '/api/upload-chunks?done'
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
      enabled: true,
      recordsExpireIn: 4
    },
    camera: {
      ios: true
    },
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

const LAST_USED_SENDER_EMAIL_KEY = 'lastUsedSenderEmail';

class Home extends Component {
  constructor(props) {
    super(props);

    const { pathname } = this.props.location;

    const isDownload = pathname && pathname !== '/';

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

    // fetch current language from local storage and set it in state
    const currentLanguage = getCurrentlySelectedLanguage().toLowerCase();
    const currentLanguageObject = this.languages.find(
      language => language.key === currentLanguage
    );

    this.state = {
      isDisableTooltip1Fade: false,
      isDownload,
      isDownloadError: false,
      customDropzone: null,
      isDropzoneActive: false,
      isSendMail: true,
      language: currentLanguageObject || {
        title: 'English',
        className: 'bg-en',
        key: 'en'
      },
      isSubmenuOpen: false,
      canShowSubmenu: false,
      submittedFiles: [],
      submittedFileNames: [],
      totalFileGigaBytes: 0,
      triedToSubmitMoreThan4GB: false,
      ownEmail: '',
      isOwnEmailInvalid: false,
      emailsToSendTo: [],
      newEmailToSendTo: '',
      isShowEmailsToSendList: true,
      isnewEmailToSendToInvalid: false,
      sendToEmailInvalidMessage: this.props.messages.msg_wrongem,
      messageToSend: '',
      password: '',
      isDestructFile: false,
      formState: FORM_STATES.isInitializing,
      isFileUploaded: false,
      uploadData: {
        uploadStartTime: null,
        uploadedSizeInMB: 0, // TODO: Use data from server instead of static value
        speedInMbps: 0, // TODO: Use data from server instead of static value
        isCanceling: false,
        isPaused: false
      },
      uploadTimer: '',
      uploadCompleteData: {
        downloadId: '',
        downloadLink: '', // TODO: Use data from server instead of static value
        isCopied: false
      },
      showReportModal:false,
      totalUploadedFiles: 0
    };

    this.shareFiles = this.shareFiles.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.pauseUpload = this.pauseUpload.bind(this);
    this.abortCancel = this.abortCancel.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.cancelUpload = this.cancelUpload.bind(this);
    this.resumeUpload = this.resumeUpload.bind(this);
    this.onCancelPress = this.onCancelPress.bind(this);
    this.toggleSubmenu = this.toggleSubmenu.bind(this);
    this.setIsSendMail = this.setIsSendMail.bind(this);
    this.reportDownload = this.reportDownload.bind(this);
    this.showReportModal = this.showReportModal.bind(this);
    this.addEmailToSendTo = this.addEmailToSendTo.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setIsDownloadError = this.setIsDownloadError.bind(this);
    this.resetDownloadState = this.resetDownloadState.bind(this);
    this.onDownloadLinkCopy = this.onDownloadLinkCopy.bind(this);
    this.removeEmailToSendTo = this.removeEmailToSendTo.bind(this);
    this.toggleCanShowSubmenu = this.toggleCanShowSubmenu.bind(this);
    this.setOwnEmailValidity = this.setOwnEmailValidity.bind(this);
    this.onSendToEmailInputBlur = this.onSendToEmailInputBlur.bind(this);
    this.toggleIsShowEmailsToSendList = this.toggleIsShowEmailsToSendList.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  setOwnEmailValidity() {
    this.setState({ isOwnEmailInvalid: !isValidEmail(this.state.ownEmail) });
  }

  addEmailToSendTo() {
    const newEmail = this.state.newEmailToSendTo;

    if (!newEmail) {
      return;
    }

    if (this.state.emailsToSendTo.length >= 20) {
      this.setState({
        isnewEmailToSendToInvalid: true,
        sendToEmailInvalidMessage: 'Maximum 20 emails exceeded.'
      });

      // TODO: Need to notify user of maximum limit exceeded with error message or some notification sign.
      return;
    }

    if (this.state.emailsToSendTo.includes(newEmail)) {
      this.setState({
        newEmailToSendTo: '',
        isnewEmailToSendToInvalid: false
      });

      return;
    }

    if (isValidEmail(newEmail)) {
      this.setState({
        newEmailToSendTo: '',
        isnewEmailToSendToInvalid: false,
        emailsToSendTo: [...this.state.emailsToSendTo, newEmail]
      });

      return;
    }

    this.setState({
      isnewEmailToSendToInvalid: true,
      sendToEmailInvalidMessage: this.props.messages.msg_wrongem
    });
  }

  onSendToEmailInputBlur() {
    this.addEmailToSendTo();

    if (this.state.isnewEmailToSendToInvalid && this.state.newEmailToSendTo) {
      return;
    }

    this.toggleIsShowEmailsToSendList();
  }

  setIsDropzoneActive(isActive) {
    this.setState({ isDropzoneActive: isActive });
  }

  removeEmailToSendTo(emailIndex) {
    let emailsToSendTo = this.state.emailsToSendTo;

    if (
      this.state.sendToEmailInvalidMessage === 'Maximum 20 emails exceeded.'
    ) {
      if (this.state.isnewEmailToSendToInvalid) {
        this.setState({ isnewEmailToSendToInvalid: false });
      }
    }

    this.setState({
      emailsToSendTo: [
        ...emailsToSendTo.slice(0, emailIndex),
        ...emailsToSendTo.slice(emailIndex + 1)
      ]
    });
  }

  componentDidMount() {
    let lastUsedSenderEmail = localStorage.getItem(LAST_USED_SENDER_EMAIL_KEY);

    if(lastUsedSenderEmail){
        this.setState({ ownEmail: lastUsedSenderEmail });
    }

    $('.carousel').carousel({
      interval: 3000
    });

    $('#container-one').mouseenter(() => {
      if (!this.state.isDisableTooltip1Fade) {
        $('#tooltip1').fadeIn(200);
      }
    });
    $('#container-one').mouseleave(() => {
      if (!this.state.isDisableTooltip1Fade) {
        $('#tooltip1').fadeOut(0);
      }
    });

    $('#container-two').mouseenter(function() {
      $('#tooltip2').fadeIn(200);
    });
    $('#container-two').mouseleave(function() {
      $('#tooltip2').fadeOut(0);
    });

    $('#container-three').mouseenter(function() {
      $('#tooltip3').fadeIn(200);
    });
    $('#container-three').mouseleave(function() {
      $('#tooltip3').fadeOut(0);
    });

    $('#container-four').mouseenter(function() {
      $('#tooltip4').fadeIn(200);
    });
    $('#container-four').mouseleave(function() {
      $('#tooltip4').fadeOut(0);
    });

    $('#container-five').mouseenter(function() {
      $('#tooltip5').fadeIn(200);
    });
    $('#container-five').mouseleave(function() {
      $('#tooltip5').fadeOut(0);
    });

    $('#container-six').mouseenter(function() {
      $('#tooltip6').fadeIn(200);
    });
    $('#container-six').mouseleave(function() {
      $('#tooltip6').fadeOut(0);
    });

    $('#container-seven').mouseenter(function() {
      $('#tooltip7').fadeIn(200);
    });
    $('#container-seven').mouseleave(function() {
      $('#tooltip7').fadeOut(0);
    });

    this.setState({
      customDropzone: document.querySelector('#custom-dropzone')
    });

    uploader.on('validate', data => {
      const { name, size: byteSize } = data;
      // check if file name exists
      if (this.state.submittedFileNames.includes(name)) {
        return false;
      }

      // check if file size of 4GB is exceeded
      if (
        (this.state.totalFileGigaBytes + byteSize * Math.pow(10, -9)) * 1000 >
        4096
      ) {
        // Change the tooltip text to: You can't transfer the files more than 4GB!
        // and show tooltip to the user so that he/she notices notification
        this.setState({
          isDisableTooltip1Fade: true,
          triedToSubmitMoreThan4GB: true
        });

        $('#tooltip1')
          .fadeIn(200)
          .css({ 'box-shadow': 'inset 0 0 5px 0px red' });

        setTimeout(() => {
          $('#tooltip1')
            .fadeOut(200)
            .css({ 'box-shadow': 'none' });

          this.setState({
            isDisableTooltip1Fade: false,
            triedToSubmitMoreThan4GB: false
          });
        }, 2000);

        return false;
      }

      return true;
    });

    uploader.on('statusChange', (id, oldStatus, newStatus) => {
      if (newStatus === 'submitted') {
        const submittedFiles = [...this.state.submittedFiles];
        const submittedFileNames = [...this.state.submittedFileNames];
        let totalFileGigaBytes = this.state.totalFileGigaBytes;

        const fileBytes = uploader.methods.getSize(id);
        totalFileGigaBytes += fileBytes / Math.pow(10, 9);

        const fileName = uploader.methods.getName(id);
        submittedFileNames.push(fileName);

        submittedFiles.push(id);

        this.setState({
          submittedFiles,
          submittedFileNames,
          totalFileGigaBytes,
          isDropzoneActive: false
        });
      } else if (isFileGone(newStatus)) {
        const submittedFiles = [...this.state.submittedFiles];
        const submittedFileNames = [...this.state.submittedFileNames];
        let totalFileGigaBytes = this.state.totalFileGigaBytes;

        let indexToRemove = submittedFiles.indexOf(id);
        submittedFiles.splice(indexToRemove, 1);

        const fileBytes = uploader.methods.getSize(id);
        totalFileGigaBytes -= fileBytes / Math.pow(10, 9);

        const fileName = uploader.methods.getName(id);
        indexToRemove = submittedFileNames.indexOf(fileName);
        submittedFileNames.splice(indexToRemove, 1);

        this.setState({
          submittedFiles,
          submittedFileNames,
          totalFileGigaBytes
        });
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
      let totalUploadedFiles = this.state.totalUploadedFiles + 1;
      this.setState({ totalUploadedFiles });
      const filesAdded = this.state.submittedFiles.length;
      if (this.state.totalUploadedFiles >= filesAdded) {
        const formInfo = this.getFormInfoObject();
        formInfo.zip = filesAdded;
        formInfo.qqtotalfilesize = this.state.totalFileGigaBytes * Math.pow(10, 9);

        $.post(
          // 'http://45.33.27.72/nurettins/src/upload-chunks.php?allComplete',
          'api/upload-chunks?allComplete',
          formInfo,
          function(theResponse) {}
        );
      }

      this.goToNextFormState();

      $('html head')
        .find('title')
        .text('100%');

      const siteUrl = window.location.origin;
      const downloadLink = `${siteUrl}/${value}`;

      this.setState({
        uploadCompleteData: {
          ...this.state.uploadCompleteData,
          downloadId: value,
          downloadLink: downloadLink
        }
      });

      //PLAY SOUND
      try {
        const audioElement = document.querySelector('#upload-complete-audio');
        audioElement.play();
      } catch (error) {
        console.error(error);
      }

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
      fid: valuefid,
      upload_lang: localStorage.getItem('SG_LANG')
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
    this.setState({ language: newLanguage });
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
    const url = window.location.href;
    const urlArray = url.split('/');
    const baseUrl = urlArray[0] + '//' + urlArray[2];
    const newLink = `${baseUrl}/${this.mapMenuLinkToRoutePath(menuLink)}`;

    const win = window.open(newLink, '_blank');
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

      case FORM_STATES.uploadCompleted:
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
    localStorage.setItem(LAST_USED_SENDER_EMAIL_KEY, this.state.ownEmail);
  }

  setIsSendMail(isSend) {
    this.setState({ isSendMail: isSend });
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

    // $.post('http://45.33.27.72/nurettins/ajax_start.php', degis, function(response) {
    //
    //   console.log(response);
    //
    // });

      $.post('/api/ajax', degis, function(response) {
          console.log(response);
      });
  }

  refreshPage() {
    window.location.reload(false);
  }

  cancelUpload() {
    this.setState({
      formState: FORM_STATES.uploadCanceled
    });

    uploader.methods.cancelAll();
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

  async resumeUpload() {
    await this.setState({
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

  reportDownload() {
    const downloadId = this.state.download_id;

    const request = new XMLHttpRequest();

    request.open('POST', '/api/ajax', true);
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    request.onload = () => {
        this.setState({
            showReportModal: false
        })
    };

    request.onerror = () => {
        this.setState({
            showReportModal: false
        })
    };

    const formData = new FormData();

    formData.append('opt', 'report');
    formData.append('id', downloadId);

    const data = new URLSearchParams(formData);

    request.send(data);
  }

  getViewFromFormState() {
    if (this.props.isNoMatch) {
      return <NoMatch />;
    }

    switch (this.state.formState) {
      case FORM_STATES.isInitializing:
        return (
          <SendForm
            triedToSubmitMoreThan4GB={this.state.triedToSubmitMoreThan4GB}
            isSendMail={this.state.isSendMail}
            ownEmail={this.state.ownEmail}
            isOwnEmailInvalid={this.state.isOwnEmailInvalid}
            setOwnEmailValidity={this.setOwnEmailValidity}
            emailsToSendTo={this.state.emailsToSendTo}
            newEmailToSendTo={this.state.newEmailToSendTo}
            isShowEmailsToSendList={this.state.isShowEmailsToSendList}
            toggleIsShowEmailsToSendList={this.toggleIsShowEmailsToSendList}
            onSendToEmailInputBlur={this.onSendToEmailInputBlur}
            isnewEmailToSendToInvalid={this.state.isnewEmailToSendToInvalid}
            sendToEmailInvalidMessage={this.state.sendToEmailInvalidMessage}
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
            setIsSendMail={this.setIsSendMail}
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
            messages={this.props.messages}
            {...this.state.uploadData}
          />
        );

      case FORM_STATES.uploadCanceled:
        return (
          <UploadCanceled
            messages={this.props.messages}
            refreshPage={this.refreshPage}
          />
        );

      case FORM_STATES.uploadCompleted:
        return (
          <UploadComplete
            isSendMail={this.state.isSendMail}
            refreshPage={this.refreshPage}
            onCopy={this.onDownloadLinkCopy}
            messages={this.props.messages}
            {...this.state.uploadCompleteData}
          />
        );

      default:
        return '';
    }
  }

  toggleIsShowEmailsToSendList() {
    this.setState({
      isShowEmailsToSendList: !this.state.isShowEmailsToSendList
    });
  }

  setIsDownloadError(isError) {
    this.setState({ isDownloadError: isError });
  }

  resetDownloadState() {
    this.setState({ isDownload: false, isDownloadError: false });
    this.props.history.push('/');
  }

  showReportModal(download_id = null) {
    this.setState({
        showReportModal: true,
        download_id
    })
  }

  handleClose() {
    this.setState({
        showReportModal: false
    })
  }

  render() {
    return (
      <div className="main--container">
        {this.state.formState === FORM_STATES.isInitializing
          ? getLanguageSpecificMetaTagsAndTitle(
              this.props.messages.mt_desc,
              this.props.messages.mt_keywords,
              this.props.messages.mt_title
            )
          : getLanguageSpecificMetaTagsAndTitle(
              this.props.messages.mt_desc,
              this.props.messages.mt_keywords,
              this.props.messages.mt_title,
              false
            )}
        <div
          id="custom-dropzone"
          style={{
            height: '100%',
            width: '100%',
            position: 'fixed',
            zIndex: '10'
          }}
          className={this.state.isDropzoneActive ? 'dropzone-active' : ''}
          onDragLeave={() => {
            this.setIsDropzoneActive(false);
          }}
        >
          <span style={{ display: 'none' }}>Drop your files here</span>
        </div>
        <Dropzone
          element={this.state.customDropzone}
          dropActiveClassName="dropzone-active"
          uploader={uploader}
          multiple
        />
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
                  currentLanguage={this.state.language}
                  languages={this.languages}
                  menuLinks={this.sideMenuLinks}
                  isSubmenuOpen={this.state.isSubmenuOpen}
                  canShowSubmenu={this.state.canShowSubmenu}
                  setLanguage={this.setLanguage}
                  onMenuSelect={this.onMenuSelect}
                  toggleSubmenu={this.toggleSubmenu}
                  toggleCanShowSubmenu={this.toggleCanShowSubmenu}
                  messages={this.props.messages}
                />
              </div>
            </div>
            <div className="row">
              <div className="OuterDiv">
                <div className="MainOuter">
                  <div className="MainMiddle">
                    <div
                      className="MainContent"
                      onDragEnter={() => {
                        this.setIsDropzoneActive(true);
                      }}
                    >
                      <div
                        className={
                          'form__container bounceInLeft animated' +
                          (this.state.formState === FORM_STATES.isUploading ||
                          this.state.formState === FORM_STATES.uploadCanceled
                            ? ' file-progress-section'
                            : '') +
                          (this.state.formState === FORM_STATES.uploadCompleted
                            ? ' upload-success-section'
                            : '') +
                          (this.state.isDownload ? ' download-section' : '') +
                          (this.state.isDownloadError ? ' error-section' : '')
                        }
                      >
                        <audio
                          id="upload-complete-audio"
                          controls
                          style={{ display: 'none' }}
                        >
                          <source src={audioOgg} type="audio/ogg" />
                          <source src={audioMp3} type="audio/mpeg" />
                          <source src={audioAac} type="audio/aac" />
                        </audio>
                        <Switch>
                          <Route
                            exact
                            path="/:downloadId"
                            render={props => (
                              <Download
                                {...props}
                                messages={this.props.messages}
                                setIsDownloadError={this.setIsDownloadError}
                                resetDownloadState={this.resetDownloadState}
                                showReportModal={this.showReportModal}
                              />
                            )}
                          />
                          {this.getViewFromFormState()}
                        </Switch>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={this.state.showReportModal} onHide={this.handleClose}>
              <Modal.Body>
                <div className="modal-body text-center">
                  <i style={{ fontSize: '9em', color: '#f61212' }} className="fa fa-exclamation-triangle fa-5x"/>
                  <br />
                  Are you sure you want to report this file ?
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                    onClick={this.handleClose}
                    id="close-report-popup"
                    className="btn btn-default btn-sm"
                    style={{ color: '#fff' }}
                >
                  Close
                </Button>
                <Button
                    onClick={this.reportDownload}
                    className="btn btn-danger btn-sm"
                    style={{ color: '#fff' }}
                >
                  Report
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default localize(Home);

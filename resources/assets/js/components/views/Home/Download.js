import React, { Fragment, Component } from 'react';
import roundToPlace from '../../utils/roundDecimals';
import DownloadWithPassword from './DownloadWithPassword';
import DownloadSuccess from './DownloadSuccess';
import DownloadError from './DownloadError';

export default class Download extends Component {
  constructor(props) {
    super(props);

    const downloadId =
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.downloadId;

    this.state = {
      isInvalidId: false,
      isNeedPassword: false,
      files: [],
      secretKey: '',
      downloadId,
      sizeInBytes: 0,
      message: '',
      isDestruct: '',
      destructedAt: new Date(),
      passwordToSubmit: '',
      isInvalidPassword: false,
      isDownloadedSuccessfully: false
    };

    this.downloadFile = this.downloadFile.bind(this);
    this.downloadFiles = this.downloadFiles.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  componentDidMount() {
    // call api with download/upload id received from route of Home via props
    this.fetchDownloadInfo();
  }

  fetchDownloadInfo() {
    const request = new XMLHttpRequest();

    // request.open('POST', 'http://45.33.27.72/nurettins/ajax_start.php', true);
    request.open('POST', '/api/ajax', true);
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );

    request.onload = () => {
      if (request.status === 200) {
        const responseObject = JSON.parse(request.response);

        if (+responseObject.status === 403) {
          this.setState({
            secretKey: responseObject.secret,
            downloadId: responseObject.download_id,
            isNeedPassword: true
          });

          return;
        }

        if (Array.isArray(responseObject) && !responseObject.length) {
          this.setState({ isInvalidId: true });
          this.props.setIsDownloadError(true);
        }

        if (!(responseObject.details && responseObject.details.length)) {
          return;
        }

        this.setState({
          secretKey: responseObject.details[0].secret_code,
          message: responseObject.details[0].message,
          sizeInBytes: responseObject.details[0].size,
          isDestruct:
            responseObject.details[0].destruct.toLowerCase() === 'yes',
          destructedAt: new Date(1000 * responseObject.details[0].time_expire
          ),
          downloadId: responseObject.details[0].upload_id,
          files: responseObject.files
        });
      }
    };

    const formData = new FormData();

    formData.append('opt', 'download');
    formData.append('id', this.state.downloadId);
    const data = new URLSearchParams(formData);

    request.send(data);
  }

  downloadFiles(e, file_id = null) {
    const request = new XMLHttpRequest();

    // request.open('POST', 'http://45.33.27.72/nurettins/src/action.php', true);
    request.open('POST', '/api/download', true);
    request.setRequestHeader(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    request.responseType = 'blob';

    request.onload = () => {
      if (request.status === 200) {
        // Try to find out the filename from the content disposition `filename` value
        const disposition = request.getResponseHeader('Content-Disposition');

        const matches = /"([^"]*)"/.exec(disposition);

        const filename = matches != null && matches[1] ? matches[1] : null;

        if (!filename) {
          console.error('filename could not be extracted');

          return;
        }

        // The actual download
        const blob = new Blob([request.response], { type: 'application/*' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

          if(file_id === null) {
              this.setState({isDownloadedSuccessfully: true});
          }
      }

      if (request.status === 204) {
        // for when a download manager intercepts the response
        if(file_id === null) {
            this.setState({isDownloadedSuccessfully: true});
        }
      }

      // handle errors here
      if (request.status >= 400) {
          this.setState({ isInvalidPassword: true });
      }
    };

    request.onerror = () => {
      this.setState({ isInvalidPassword: true });
    };

    const formData = new FormData();

    formData.append('action', 'download');
    formData.append('secret_code', this.state.secretKey);
    formData.append('download_id', this.state.downloadId);

    if(file_id !== null) {
        formData.append('file_id', file_id);
    }

    if (this.state.isNeedPassword) {
      formData.append('password', this.state.passwordToSubmit);
    }

    const data = new URLSearchParams(formData);

    request.send(data);
  }

  onPasswordChange(e) {
    this.setState({ passwordToSubmit: e.target.value });
  }

  downloadFile(e, id) {
      this.downloadFiles(e, id);
  }

  render() {
    return (
      <Fragment>
        {this.state.isInvalidId ? (
          <DownloadError
            errorStatus="invalidId"
            messages={this.props.messages}
            resetDownloadState={this.props.resetDownloadState}
          />
        ) : this.state.isDownloadedSuccessfully ? (
          <DownloadSuccess messages={this.props.messages} />
        ) : this.state.isNeedPassword ? (
          <DownloadWithPassword
            messages={this.props.messages}
            isInvalidPassword={this.state.isInvalidPassword}
            onDownloadClick={this.downloadFiles}
            onPasswordChange={this.onPasswordChange}
            passwordToSubmit={this.state.passwordToSubmit}
          />
        ) : (
          <Fragment>
            <div id="ms-container">
              <label htmlFor="ms-download" style={{ display: 'block' }}>
                <div className="ms-content">
                  <div className="ms-content-inside">
                    <input type="checkbox" id="ms-download" />
                    <div className="ms-line-down-container">
                      <div className="ms-line-down" />
                    </div>
                    <div className="ms-line-point" />
                  </div>
                </div>
              </label>
            </div>
            <div className="download-status direct-download">
              {' '}
              {this.props.messages.total_files}: {this.state.files.length}{' '}
              <i className="fa fa-cloud-download" />{' '}
              {roundToPlace(this.state.sizeInBytes / Math.pow(10, 6), 2)} MB
            </div>
            <div className="status-small">
              <p>
                {this.props.messages.destructed_on}:{' '}
                {this.state.destructedAt &&
                  this.state.destructedAt.toISOString().slice(0, 10)}
              </p>
            </div>
            <div className="file-container">
              {this.state.files &&
                this.state.files.map(fileItem => (
                  <div key={fileItem.id} className="file-name">
                    <svg
                      style={{ width: '10px', height: '10px' }}
                      aria-hidden="true"
                      data-prefix="far"
                      data-icon="file"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="svg-inline--fa fa-file fa-w-12 fa-2x"
                    >
                      <path
                        fill="currentColor"
                        d="M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48z"
                        className=""
                      />
                    </svg>
                    {fileItem.file}
                    <span className={'fa fa-eye pull-right download-one'} onClick={(e) => this.downloadFile(e, fileItem.id)}> </span>
                    <span className={'fa fa-download pull-right download-one'} onClick={(e) => this.downloadFile(e, fileItem.id)}> </span>
                  </div>
                ))}
            </div>
            <div className="button__block direct-download-btn-block clearfix">
              <div className="pull-left">
                <button
                  type="submit"
                  className="btn btn-lg btn-orange left-btn"
                  onClick={this.downloadFiles}
                >
                  {this.props.messages.download}
                  {this.state.isDestruct
                    ? ` & ${this.props.messages.destruct}`
                    : ''}
                </button>
              </div>
              <div className="pull-right" onClick={()=>this.props.showReportModal(this.state.downloadId)}>
                <a className="btn btn-sm btn-pink">
                  <i className="fa fa-flag" />
                </a>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

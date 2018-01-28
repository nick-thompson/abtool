import React, { Component } from 'react';

import cx from 'classnames';
import './DropTarget.css';

class DropTarget extends Component {
  constructor(props) {
    super(props);

    this._fileReader = new FileReader();

    this.state = {
      loading: false,
    };
  }

  _onFileRead = (file, e) => {
    window.setTimeout(() => {
      this.setState({loading: false});
    }, 2000);

    const audio = new Audio();

    audio.src = e.target.result;

    if (this.props.onAudioReady) {
      this.props.onAudioReady(file.name, audio);
    }
  }

  _noopHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  _handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({loading: true});

    const files = e.dataTransfer.files;
    const file = files[0];

    this._fileReader.onload = this._onFileRead.bind(this, file);
    this._fileReader.readAsDataURL(files[0]);
  };

  _renderContent = () => {
    if (this.state.loading) {
      return (
        <div className="DropTargetUpload">
          <img src="/abtool_spinner.gif" alt="Loading..." className="DropTargetUplaodLogo" />
        </div>
      );
    }

    if (this.props.trackName) {
      return (
        <span className="DropTargetTrackName">{this.props.trackName}</span>
      );
    }

    return (
      <div className="DropTargetUpload">
        <img src="/abtool_upload.png" alt="Upload a file" className="DropTargetUplaodLogo" />
      </div>
    );
  }

  render() {
    const classes = cx({
      DropTargetContainer: true,
      DropTargetContainerSelected: this.props.selected,
    });

    return (
      <a
        href="#"
        className={classes}
        onClick={this.props.onClick}
        onDragEnter={this._noopHandler}
        onDragOver={this._noopHandler}
        onDrop={this._handleDrop}>
        {this._renderContent()}
      </a>
    );
  }
}

export default DropTarget;

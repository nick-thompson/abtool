import React, { Component } from 'react';

import cx from 'classnames';
import './DropTarget.css';

class DropTarget extends Component {
  constructor(props) {
    super(props);

    this._fileReader = new FileReader();

    this.state = {
      loading: false,
      dropHover: false,
    };
  }

  _onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      dropHover: true,
    });
  }

  _onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({
      dropHover: false,
    });
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

    this.setState({
      loading: true,
      dropHover: false,
    });

    const files = e.dataTransfer.files;
    const file = files[0];

    this._fileReader.onload = this._onFileRead.bind(this, file);
    this._fileReader.readAsDataURL(files[0]);
  };

  _handleClick = (e) => {
    const hasTrack = typeof this.props.trackName === 'string' &&
      this.props.trackName.length > 0;

    // Force file dialog open
    if (!hasTrack) {
      const input = document.createElement('input');

      input.type = 'file';
      input.addEventListener('change', (fileEvent) => {
        if (input.files.length > 0) {
          const file = input.files[0];

          this.setState({ loading: true });

          this._fileReader.onload = this._onFileRead.bind(this, file);
          this._fileReader.readAsDataURL(file);
        }
      });

      input.dispatchEvent(new MouseEvent('click'));

      // Don't fall into the onClick handler below if we've just gone through
      // the file dialog flow.
      return void 0;
    }

    if (typeof this.props.onClick === 'function') {
      this.props.onClick(e);
    }
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
      DropTargetContainerHover: this.state.dropHover || (this.props.selected && !this.state.loading),
    });

    return (
      <button
        className={classes}
        onClick={this._handleClick}
        onDragEnter={this._onDragEnter}
        onDragOver={this._onDragEnter}
        onDragLeave={this._onDragLeave}
        onDrop={this._handleDrop}>
        {this._renderContent()}
      </button>
    );
  }
}

export default DropTarget;

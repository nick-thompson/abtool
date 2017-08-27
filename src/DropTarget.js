import React, { Component } from 'react';

import cx from 'classnames';
import './DropTarget.css';

class DropTarget extends Component {
  constructor(props) {
    super(props);

    this._fileReader = new FileReader();
  }

  _onFileRead = (file, e) => {
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

    const files = e.dataTransfer.files;
    const file = files[0];

    this._fileReader.onload = this._onFileRead.bind(this, file);
    this._fileReader.readAsDataURL(files[0]);
  };

  render() {
    const classes = cx({
      DropTargetContainer: true,
      DropTargetBVariant: this.props.variant === 'B',
    });

    return (
      <div
        className={classes}
        onDragEnter={this._noopHandler}
        onDragOver={this._noopHandler}
        onDrop={this._handleDrop}>
        {this.props.trackName || 'Drop Song File'}
      </div>
    );
  }
}

export default DropTarget;

import React, { Component } from 'react';

class DropTarget extends Component {
  constructor(props) {
    super(props);

    this._fileReader = new FileReader();
    this._fileReader.onload = this._onFileRead;
  }

  _onFileRead = (e) => {
    const audio = new Audio();

    audio.src = e.target.result;

    if (this.props.onAudioReady) {
      this.props.onAudioReady(audio);
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
    this._fileReader.readAsDataURL(files[0]);
  };

  render() {
    return (
      <div
        className="DropTargetContainer"
        onDragEnter={this._noopHandler}
        onDragOver={this._noopHandler}
        onDrop={this._handleDrop}>
        SWAGTHO
      </div>
    );
  }
}

export default DropTarget;

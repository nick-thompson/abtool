import DropTarget from './DropTarget';
import React, { Component } from 'react';
import Transport from './Transport';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftFileName: '',
      leftAudio: null,
      rightFileName: '',
      rightAudio: null,
      transportProgress: 0,
      playing: false,
    };
  }

  _leftAudioReady = (name, audio) => {
    if (this.state.leftAudio) {
      this.state.leftAudio.removeEventListener('timeupdate');
      this.state.leftAudio.removeEventListener('ended');
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);
    audio.addEventListener('ended', this._onReset);

    this.setState({
      leftFileName: name,
      leftAudio: audio,
    });
  };

  _rightAudioReady = (name, audio) => {
    if (this.state.rightAudio) {
      this.state.rightAudio.removeEventListener('timeupdate');
      this.state.rightAudio.removeEventListener('ended');
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);
    audio.addEventListener('ended', this._onReset);

    this.setState({
      rightFileName: name,
      rightAudio: audio,
    });
  };

  _onTimeUpdate = () => {
    const {leftAudio, rightAudio} = this.state;
    const shouldSkip = leftAudio !== null &&
      rightAudio !== null &&
      leftAudio.duration !== rightAudio.duration;

    if (shouldSkip) {
      return this.setState({
        transportProgress: 0,
      });
    }

    const audio = leftAudio || rightAudio;

    this.setState({
      transportProgress: audio.currentTime / audio.duration,
    });
  };

  _onSeek = (amt) => {
    const {leftAudio, rightAudio} = this.state;
    const shouldSkip = leftAudio !== null &&
      rightAudio !== null &&
      leftAudio.duration !== rightAudio.duration;

    if (!shouldSkip) {
      const duration = leftAudio.duration;
      const seekPoint = amt * duration;

      leftAudio && (leftAudio.currentTime = seekPoint);
      rightAudio && (rightAudio.currentTime = seekPoint);

      this.setState({
        transportProgress: amt,
      });
    }
  };

  _onPlayPause = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {leftAudio, rightAudio} = this.state;

    if (leftAudio === null && rightAudio === null) {
      return;
    }

    if (this.state.playing) {
      leftAudio && leftAudio.pause();
      rightAudio && rightAudio.pause();
    } else {
      leftAudio && leftAudio.play();
      rightAudio && rightAudio.play();
    }

    this.setState({
      playing: !this.state.playing,
    });
  };

  _onReset = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {leftAudio, rightAudio} = this.state;

    if (leftAudio === null && rightAudio === null) {
      return;
    }

    if (this.state.playing) {
      leftAudio && leftAudio.pause();
      rightAudio && rightAudio.pause();
    }

    leftAudio && (leftAudio.currentTime = 0);
    rightAudio && (rightAudio.currentTime = 0);

    this.setState({
      playing: false,
      transportProgress: 0,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="MainContainer">
          <div className="TextContainer">
            <h1>Online Audio</h1>
            <h1>A|B Reference Tool</h1>
            <p>
              A/B referencing plays an essential part in production, mixing and mastering, BNCE offers a faster, easier and more accurate method to compare multiple audio files. 
            </p>
          </div>
          <div className="DropCellContainer">
            <DropTarget
              trackName={this.state.leftFileName}
              onAudioReady={this._leftAudioReady} />
            <DropTarget
              trackName={this.state.rightFileName}
              onAudioReady={this._rightAudioReady} />
          </div>
          <Transport
            playing={this.state.playing}
            onSeek={this._onSeek}
            onReset={this._onReset}
            onPlayPause={this._onPlayPause}
            fillAmount={this.state.transportProgress} />
        </div>
        <div className="AppFooter">
          <div className="AppBnceAd">
            swag
          </div>
          <div className="AppCIAd">
            swag
          </div>
        </div>
      </div>
    );
  }
}

export default App;

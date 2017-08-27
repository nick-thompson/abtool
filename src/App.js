import DropTarget from './DropTarget';
import React, { Component } from 'react';
import Transport from './Transport';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftSelected: false,
      rightSelected: false,
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

    if (this.state.rightAudio)
      this.state.rightAudio.muted = true;

    this.setState({
      leftFileName: name,
      leftAudio: audio,
      leftSelected: true,
    });
  };

  _rightAudioReady = (name, audio) => {
    if (this.state.rightAudio) {
      this.state.rightAudio.removeEventListener('timeupdate');
      this.state.rightAudio.removeEventListener('ended');
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);
    audio.addEventListener('ended', this._onReset);

    if (this.state.leftAudio)
      this.state.leftAudio.muted = true;

    this.setState({
      rightFileName: name,
      rightAudio: audio,
      rightSelected: true,
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

  _handleSelectLeft = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {leftAudio, rightAudio} = this.state;

    if (rightAudio)
      rightAudio.muted = true;

    if (leftAudio)
      leftAudio.muted = false;

    this.setState({
      leftSelected: true,
      rightSelected: false,
    });
  };

  _handleSelectRight = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {leftAudio, rightAudio} = this.state;

    if (rightAudio)
      rightAudio.muted = false;

    if (leftAudio)
      leftAudio.muted = true;

    this.setState({
      leftSelected: false,
      rightSelected: true,
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
        <div className="AppHeader">
          <a href="/">
            <img className="AppLogo" src="/logo.png" alt="BNCE Platform" />
          </a>
          <a className="AppLaunch" href="http://www.bnceplatform.com">
            Launch with us
          </a>
        </div>
        <div className="MainContainer">
          <div className="TextContainer">
            <h1 className="HeaderNoMargin">Online Audio</h1>
            <h1 className="HeaderNoMargin">A|B Reference Tool</h1>
            <p className="TextBody">
              A/B referencing plays an essential part in production, mixing and mastering, BNCE offers a faster, easier and more accurate method to compare multiple audio files. 
            </p>
          </div>
          <div className="DropCellContainer">
            <DropTarget
              selected={this.state.leftSelected}
              onClick={this._handleSelectLeft}
              trackName={this.state.leftFileName}
              onAudioReady={this._leftAudioReady} />
            <DropTarget
              variant="B"
              selected={this.state.rightSelected}
              onClick={this._handleSelectRight}
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
          <div className="AppFooterAd AppBnceAd">
            <a href="http://www.bnceplatform.com" className="AppFooterText" target="_blank">
              <div className="AppFooterAdText">
                <h2 className="HeaderNoMargin">BNCE Platform</h2>
                <h5 className="HeaderNoMargin">Designed for music creators.</h5>
              </div>
              <div className="AppFooterArrowContainer">
                <img src="/arrow-red.png" className="AppFooterArrow" />
              </div>
            </a>
          </div>
          <div className="AppFooterAd AppCIAd">
            <a href="https://creativeintent.co/products/temper" className="AppFooterText AppFooterInvertedText" target="_blank">
              <div className="AppFooterAdText">
                <h2 className="HeaderNoMargin">Temper</h2>
                <h5 className="HeaderNoMargin">New Phase Distortion Plugin</h5>
              </div>
              <div className="AppFooterArrowContainer">
                <img src="/arrow-white.png" className="AppFooterArrow" />
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

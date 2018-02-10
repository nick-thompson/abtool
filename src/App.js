import Container from './Container';
import Chrome from './Chrome';
import DropTarget from './DropTarget';
import Newsletter from './Newsletter';
import React, { Component } from 'react';
import Split, { SplitCell } from './Split';
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
      this.state.leftAudio.removeEventListener('timeupdate', this._onTimeUpdate);
      this.state.leftAudio.removeEventListener('ended', this._onReset);
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);
    audio.addEventListener('ended', this._onReset);

    if (this.state.rightAudio)
      this.state.rightAudio.muted = true;

    this.setState({
      leftFileName: name,
      leftAudio: audio,
    });
  };

  _rightAudioReady = (name, audio) => {
    if (this.state.rightAudio) {
      this.state.rightAudio.removeEventListener('timeupdate', this._onTimeUpdate);
      this.state.rightAudio.removeEventListener('ended', this._onReset);
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);
    audio.addEventListener('ended', this._onReset);

    if (this.state.leftAudio)
      this.state.leftAudio.muted = true;

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
      <Chrome>
        <div className="App_HeroContainer">
          <video playsInline autoPlay muted loop poster="grid_video_cover.jpg" className="App__HeroVideo" id="bgvid">
            <source src="grid_video.webm" type="video/webm" />
            <source src="grid_video.mp4" type="video/mp4" />
          </video>
          <div className="App__MainContainer">
            <div className="App_TextContainer">
              <h1 className="App__HeaderNoMargin">Online Audio</h1>
              <h1 className="App__HeaderNoMargin App__Header-Teal">A/B Mix Referencer</h1>
              <p className="App__TextBody">
                A/B referencing plays an essential part in production, mixing and mastering process. The A/B Referencer offers a faster, easy method to compare multiple audio files on the fly. Check your mix for dynamics, compare your samples to mixes you like or just compare two versions of the same mix to get an idea of whether changes you have made were beneficial to the mix. Lots of uses for this tool, and it’s free! Drop your files into each bin and switch between the two to listen.
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
        </div>
        <div className="App__Section App__Section-Elevated">
          <Container>
            <Split>
              <SplitCell>
                Get updates on new audio tools, audio plugins, and more.
              </SplitCell>
              <SplitCell>
                <Newsletter />
              </SplitCell>
            </Split>
          </Container>
        </div>
        <div className="App__Section">
          <Newsletter />
        </div>
      </Chrome>
    );
  }
}

export default App;

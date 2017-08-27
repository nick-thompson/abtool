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
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);

    this.setState({
      leftFileName: name,
      leftAudio: audio,
    });
  };

  _rightAudioReady = (name, audio) => {
    if (this.state.rightAudio) {
      this.state.rightAudio.removeEventListener('timeupdate');
    }

    audio.addEventListener('timeupdate', this._onTimeUpdate);

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

    this.setState({
      transportProgress: leftAudio.currentTime / leftAudio.duration,
    });
  };

  _onPlayPause = () => {
    if (this.state.playing) {
      this.state.leftAudio.pause();
      this.state.rightAudio.pause();
    } else {
      this.state.leftAudio.play();
      this.state.rightAudio.play();
    }

    this.setState({
      playing: !this.state.playing,
    });
  };

  _onReset = () => {
  };

  render() {
    return (
      <div className="App">
        <div className="MainContainer">
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
            onReset={this._onReset}
            onPlayPause={this._onPlayPause}
            fillAmount={this.state.transportProgress} />
        </div>
      </div>
    );
  }
}

export default App;

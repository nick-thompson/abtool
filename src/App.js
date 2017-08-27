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
    };
  }

  _leftAudioReady = (name, audio) => {
    this.setState({
      leftFileName: name,
      leftAudio: audio,
    });
  };

  _rightAudioReady = (name, audio) => {
    this.setState({
      rightFileName: name,
      rightAudio: audio,
    });
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
            onReset={() => {}}
            onPlayPause={() => {}}
            fillAmount={0.5} />
        </div>
      </div>
    );
  }
}

export default App;

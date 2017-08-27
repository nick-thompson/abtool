import DropTarget from './DropTarget';
import React, { Component } from 'react';
import Transport from './Transport';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <DropTarget onAudioReady={(audio) => audio.play()} />
        <DropTarget onAudioReady={(audio) => audio.play()} />
        <Transport
          onReset={() => {}}
          onPlayPause={() => {}}
          fillAmount={0.5} />
      </div>
    );
  }
}

export default App;

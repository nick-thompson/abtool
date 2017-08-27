import React, { Component } from 'react';

import './Transport.css';

class Transport extends Component {
  render() {
    return (
      <div className="TransportContainer">
        <button className="TransportReset" onClick={this.props.onReset}>
          Reset
        </button>
        <button className="TransportPlayPause" onClick={this.props.onPlayPause}>
          Play/Pause
        </button>
        <div className="TransportProgressTrack">
          <div
            className="TransportProgressFill"
            style={{width: this.props.fillAmount * 100 + '%'}} />
        </div>
      </div>
    );
  }
}

export default Transport;

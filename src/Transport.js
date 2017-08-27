import React, { Component } from 'react';

import './Transport.css';

class Transport extends Component {
  _handleProgressClick = (e) => {
    const offset = e.pageX - e.target.offsetLeft;
    const relativeAmount = offset / e.target.offsetWidth;

    if (this.props.onSeek) {
      this.props.onSeek(relativeAmount);
    }
  };

  render() {
    return (
      <div className="TransportContainer">
        <button className="TransportReset" onClick={this.props.onReset}>
          Reset
        </button>
        <button className="TransportPlayPause" onClick={this.props.onPlayPause}>
          Play/Pause
        </button>
        <div className="TransportProgressTrack" onClick={this._handleProgressClick}>
          <div
            className="TransportProgressFill"
            style={{width: this.props.fillAmount * 100 + '%'}} />
        </div>
      </div>
    );
  }
}

export default Transport;

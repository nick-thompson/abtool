import React, { Component } from 'react';

import cx from 'classnames';
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
    const playPauseClasses = cx({
      TransportButton: true,
      TransportPlay: !this.props.playing,
      TransportPause: this.props.playing,
    });

    return (
      <div className="TransportContainer">
        <div className="TransportButtonContainer">
          <button
            className="TransportButton TransportReset"
            onClick={this.props.onReset}>
          </button>
        </div>
        <div className="TransportButtonContainer">
          <button
            className={playPauseClasses}
            onClick={this.props.onPlayPause}>
          </button>
        </div>
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

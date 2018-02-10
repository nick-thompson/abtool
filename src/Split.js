import React, { Component } from 'react';

import './Split.css';

class Split extends Component {
  render() {
    return (
      <div className="Split">
        {this.props.children}
      </div>
    );
  }
}

export class SplitCell extends Component {
  render() {
    return (
      <div className="Split__SplitCell">
        {this.props.children}
      </div>
    );
  }
}

export default Split;

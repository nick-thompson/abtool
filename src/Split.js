import React, { Component } from 'react';

import './Split.css';

class Split extends Component {
  render() {
    const classes = `Split ${this.props.className || ''}`;
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export class SplitCell extends Component {
  render() {
    const classes = `Split__SplitCell ${this.props.className || ''}`;
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
}

export default Split;

import React, { Component } from 'react';
import Split, { SplitCell } from './Split';

import './Newsletter.css';

class Newsletter extends Component {
  render() {
    return (
      <Split>
        <SplitCell className="Newsletter__Description">
          Get updates on new audio tools, audio plugins, and more.
        </SplitCell>
        <SplitCell>
          <form className="Newsletter__Form">
            <input
              className="Newsletter__TextInput"
              type="text"
              name="email"
              placeholder="Enter your email address" />
            <input
              className="Newsletter__Submit"
              type="submit"
              value="Subscribe" />
          </form>
        </SplitCell>
      </Split>
    );
  }
}

export default Newsletter;

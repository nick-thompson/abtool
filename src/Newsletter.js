import React, { Component } from 'react';

import './Newsletter.css';

class Newsletter extends Component {
  render() {
    return (
      <form>
        <input
          className="Newsletter__TextInput"
          type="text"
          name="email"
          placeholder="Enter your email address" />
      </form>
    );
  }
}

export default Newsletter;

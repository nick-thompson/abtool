import React, { Component } from 'react';

import './Chrome.css';

class Chrome extends Component {
  render() {
    return (
      <div className="Chrome">
        <div className="Chrome__Header">
          <a href="/">
            <img
              className="Chrome__AppLogo"
              src="/abtool_logo.png"
              alt="A/B Reference Tool, by Creative Intent" />
          </a>
        </div>
        <div className="Chrome__AppContent">
          {this.props.children}
        </div>
        <div className="Chrome__AppFooter">
          <div>
            Designed by <a href="https://seizedigital.com/" target="_blank" className="Chrome__AppFooter__Link">Seize Digital</a>
          </div>
          <div>
            Developed by <a href="https://creativeintent.co/" target="_blank" className="Chrome__AppFooter__Link">Creative Intent</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Chrome;

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
          <form className="Newsletter__Form validate" action="https://creativeintent.us16.list-manage.com/subscribe/post?u=df972a422ecdf06989756c3b0&amp;id=e2925c2ec3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" noValidate>
            <input
              required
              className="Newsletter__TextInput"
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              placeholder="Enter your email address" />
            {/* A bot will fill this out... a human wont. */}
            <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true">
              <input type="text" name="b_df972a422ecdf06989756c3b0_e2925c2ec3" tabIndex="-1" value="" />
            </div>
            <input
              className="Newsletter__Submit"
              type="submit"
              id="mc-embedded-subscribe"
              value="Subscribe" />
          </form>
        </SplitCell>
      </Split>
    );
  }
}

export default Newsletter;

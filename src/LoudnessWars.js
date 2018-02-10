import React, { Component } from 'react';
import Split, { SplitCell } from './Split';

import './LoudnessWars.css';

class LoudnessWars extends Component {
  render() {
    return (
      <Split>
        <SplitCell>
          <img src="loudnessgraph.png" alt="Loudness Wars Infographic" className="LoudnessWars__Graph" />
        </SplitCell>
        <SplitCell className="LoudnessWars__Quote">
          <h1 className="LoudnessWars__Title">Is the Loudness War Real?</h1>
          <p>
            “90% is loudness envy, and 10% represents a true change of taste
            in the younger generation. Even though tastes are changing, it is
            a fact that very small differences in loudness affect listening
            perception.”
          </p>
          <h4 className="LoudnessWars__Attr">Bob Katz, Mastering Engineer</h4>
        </SplitCell>
      </Split>
    );
  }
}

export default LoudnessWars;

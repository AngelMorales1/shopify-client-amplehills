import React, { Component } from 'react';
import cx from 'classnames';

import styles from './OurPledge.scss';

class OurPledge extends Component {
  render() {
    return (
      <div
        className={cx(
          'border m4 flex justify-around items-center',
          styles['OurPledge-container']
        )}
      >
        <div className="callout mx-auto flex">Our Pledge</div>
        <div className="mx-auto flex ">
          Ice cream arrives fresh delicious, and frozen
        </div>
        <div className="uppercase mx-auto">More Info</div>
      </div>
    );
  }
}

export default OurPledge;

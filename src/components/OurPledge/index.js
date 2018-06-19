import React, { Component } from 'react';
import cx from 'classnames';

import styles from './OurPledge.scss';

class OurPledge extends Component {
  render() {
    return (
      <div
        className={cx(
          'm4 flex clearfix items-center bg-varden',
          styles['OurPledge-container']
        )}
      >
        <p className="mx-auto col4 px1 flex text-madison-blue bold">
          Our Pledge
        </p>
        <p className="uppercase mx-auto col4 px1 flex text-madison-blue">
          Ice cream arrives fresh delicious, and frozen
        </p>
        <p className="uppercase mx-auto col4 px1 text-madison-blue bold">
          More Info
        </p>
      </div>
    );
  }
}

export default OurPledge;

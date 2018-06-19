import React, { Component } from 'react';
import cx from 'classnames';

import styles from './OurPledge.scss';
import { Image } from 'components/base';

class OurPledge extends Component {
  render() {
    return (
      <div className="flex flex-column items-center">
        <Image
          alt="bubble icon"
          src="/assets/images/bubble-icon.svg"
          className={cx('icon', styles['OurPledge-icon'])}
        />
        <div
          className={cx(
            'bg-varden p2 flex items-center',
            styles['OurPledge-container']
          )}
        >
          <p className="col4 mx2 text-madison-blue bold nowrap">Our Pledge</p>
          <p className="col4 mx2 flex uppercase text-madison-blue info-text-small semi-bold">
            Ice cream arrives fresh delicious, and frozen
          </p>
          <p
            className={cx(
              'col4 mx2 uppercase text-madison-blue info-text-big bold nowrap',
              styles['OurPledge__moreinfo']
            )}
          >
            More Info
          </p>
        </div>
      </div>
    );
  }
}

export default OurPledge;

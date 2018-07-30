import React from 'react';
import cx from 'classnames';

import { Image } from 'components/base';
import styles from './Loader.scss';

const Loader = () => {
  return (
    <div className={cx(styles['Loader'], `w100 flex bg-white p2`)}>
      <Image
        className={styles['Loader__image']}
        src="/assets/images/ample-hills-logo.svg"
      />
    </div>
  );
};

export default Loader;

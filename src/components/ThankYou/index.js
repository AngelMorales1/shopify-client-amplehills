import React from 'react';
import cx from 'classnames';

import { Button } from 'components/base';

import styles from './ThankYou.scss';

const ThankYou = () => (
  <div
    className={cx(
      styles['ThankYou'],
      'flex flex-column items-center justify-center drip bg-seafoam'
    )}
  >
    <div className={cx(styles['ThankYou__inner'], 'center p2')}>
      <h1 className="block-headline mb2">Thank you for participating.</h1>
      <div className="flex flex-column items-center justify-center center markdown-block">
        <p className="mb3 col-12 md-col-8">
          Your vote is locked in and the tallying is underway. Stay tuned for
          updates on the winners of this round!
        </p>
      </div>
      <div className="flex items-center justify-center">
        <Button
          to="/flavor-frenzy-2021"
          label="Return to Flavor Frenzy"
          color="madison-blue"
          variant="primary"
        />
      </div>
    </div>
  </div>
);

export default ThankYou;

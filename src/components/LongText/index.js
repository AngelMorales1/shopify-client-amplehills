import React from 'react';
import cx from 'classnames';

import get from 'utils/get';
import { PortableText } from 'components/base';

import styles from './LongText.scss';

const LongText = props => {
  const { z, block, setRef } = props;
  const dripIsOn = get(block, 'drip', false);
  const upperDripIsOn = get(block, 'upperDrip', false);
  const colorClass = `LongText--${get(block, 'backgroundColor', 'white')}`;
  const title = get(block, 'title', '');
  const subtitle = get(block, 'subtitle', '');
  const text = get(block, 'text', '');

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['LongText'],
        styles[colorClass],
        'flex justify-center px3 items-center text-center'
      )}
    >
      <div
        className={cx('w100 flex flex-column content-width', {
          drip: dripIsOn,
          'upper-drip': upperDripIsOn
        })}
      >
        <div
          className={cx(
            styles['LongText__title-container'],
            'col-12 my4 center'
          )}
        >
          {subtitle && (
            <span className="small-title block mb1 text-peach">{subtitle}</span>
          )}
          <h2 className="block-headline">{title}</h2>
        </div>
        <div className="portable-text text-column">
          <PortableText blocks={text} />
        </div>
      </div>
    </div>
  );
};

export default LongText;

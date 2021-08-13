import React from 'react';
import ReactPlayer from 'react-player';
import cx from 'classnames';

import styles from './VideoBlock.scss';

const VideoBlock = props => {
  const { z, block, setRef } = props;

  if (!block || !block.url) return;

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        'flex justify-center px3',
        styles['VideoBlock'],
        styles[`VideoBlock--${block.backgroundColor}`],
        { drip: block.drip }
      )}
    >
      <div className="w100 flex content-width center flex-column items-center justify-center">
        {block.title && (
          <div
            className={cx(
              styles['VideoBlock__title-container'],
              'col-12 md-col-4 mb3'
            )}
          >
            <h2 className="block-headline">{block.title}</h2>
          </div>
        )}
        <div className={cx('w100 pb3', styles['VideoBlock__video'])}>
          <ReactPlayer
            url={block.url}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoBlock;

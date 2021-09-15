import React from 'react';
import cx from 'classnames';
import get from 'lodash/get';

import { PortableText, Image, Button } from 'components/base';
import styles from './Featured3UpContent.scss';

const Featured3UpContent = ({ block, z, setRef }) => {
  const drip = get(block, 'drip', false);
  const upperDrip = get(block, 'upperDrip', false);
  const colorClass = `Featured3UpContent--${get(
    block,
    'backgroundColor',
    'white'
  )}`;

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx(
        styles['Featured3UpContent'],
        styles[colorClass],
        'flex flex-column items-center justify-center col-12',
        {
          drip,
          'upper-drip': upperDrip
        }
      )}
    >
      <div className="py3 col-12 flex flex-column items-center">
        <h2 className="my3 block-headline">{block.title}</h2>
        <div
          className={cx(
            styles['Featured3UpContent__features'],
            'flex flex-wrap justify-center col-12'
          )}
        >
          {get(block, 'features', []).map(feature => (
            <div
              className={cx(
                styles['Featured3UpContent__feature'],
                'col-6 md-col-4'
              )}
            >
              <div className="card bg-seafoam h100">
                <Image src={feature.image.src} alt={feature.image.alt} />
                <div className="flex flex-column p3">
                  <span className="small-title mb2">{feature.title}</span>
                  <span className="portable-text">
                    <PortableText blocks={feature.description} />
                  </span>
                  {feature.linkText && feature.link && (
                    <Button
                      className="inline-block"
                      color="clear-madison-blue-border"
                      variant="primary-small"
                      to={feature.link}
                      label={feature.linkText}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured3UpContent;

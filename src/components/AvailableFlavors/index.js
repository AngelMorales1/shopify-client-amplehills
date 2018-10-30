import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import contentfulImgUtil from 'utils/contentfulImgUtil';

import { Button, Image } from 'components/base';
import styles from './AvailableFlavors.scss';

const AvailableFlavors = ({ drip, setRef, location, block, z, ...props }) => {
  const title = get(block, 'fields.title', '');
  const locationId = get(location, 'id', '');

  return (
    <div
      ref={refBlock => setRef(refBlock)}
      style={{ zIndex: z }}
      className={cx({ drip: drip }, 'bg-iceberg py4 px3')}
    >
      <div className="mx-auto flex flex-column items-center container-width">
        <h2 className="block-headline center mb3">{title}</h2>
        <div
          className={cx(
            styles['AvailableFlavors__card-container'],
            'flex flex-wrap items-center justify-center'
          )}
        >
          {get(location, 'availableFlavors', []).map(flavor => {
            const fields = get(flavor, 'fields', {});
            const title = get(fields, 'title', '');
            const label = get(fields, 'label', '');
            const image = get(fields, 'image.fields.file.url', '');
            const isLocationSpecial = get(fields, 'locationSpecial', []).find(
              location => {
                return get(location, 'sys.id', '') === locationId;
              }
            );

            return (
              <div
                className={cx(
                  styles['AvailableFlavors__card'],
                  'flex flex-row justify-between items-center bg-white m1 p1'
                )}
              >
                <Image
                  className={cx(
                    styles['AvailableFlavors__card-image'],
                    'col-5'
                  )}
                  src={contentfulImgUtil(image, '200')}
                />
                <div className="col-6">
                  {label &&
                    !isLocationSpecial && (
                      <p className="small mb1 carter text-peach">{label}</p>
                    )}
                  {isLocationSpecial && (
                    <p className="small mb1 carter text-peach">
                      Location Special
                    </p>
                  )}
                  <p className="small bold">{title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

AvailableFlavors.propTypes = {};

AvailableFlavors.defaultProps = {};

export default AvailableFlavors;

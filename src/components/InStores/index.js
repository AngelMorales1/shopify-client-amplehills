import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import cx from 'classnames';
import get from 'utils/get';

import { Button } from 'components/base';
import styles from './InStores.scss';

const InStores = ({ localRetailers, text }) => {
  return (
    <div>
      <div className="bg-iceberg py4 px3 flex flex-column justify-center items-center drip">
        <h2 className="block-headline center mb3">Local Retailers</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: marked(text)
          }}
          className="markdown-block center text-container-width"
        />
      </div>
      <div className="mt3 py4 px3 flex flex-column items-center">
        {Object.values(localRetailers).map((localRetailer, i) => {
          return (
            <div
              key={get(localRetailer, 'uuid', i)}
              className={cx(
                styles['InStores__local-retailer-container'],
                'flex form-container-width justify-between w100 my2 p3'
              )}
            >
              <div
                className={cx(
                  styles['InStores__local-retailer-text-container']
                )}
              >
                <p className="bold mb1">{localRetailer.title}</p>
                <p>{`${get(localRetailer, 'address', '')}, ${get(
                  localRetailer,
                  'city',
                  ''
                )}, ${get(localRetailer, 'state', '')} ${get(
                  localRetailer,
                  'zip',
                  ''
                )}`}</p>
              </div>
              <Button
                className={cx(styles['InStores__local-retailer-button'])}
                variant="primary-small"
                color="peach"
                label={localRetailer.number}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InStores;

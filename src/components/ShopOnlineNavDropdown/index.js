import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ShopOnlineNavDropdown.scss';
import { Image, Button } from 'components/base';

const ShopOnlineNavDropdown = ({ productLanding, alertIsActive }) => {
  const iceCreamProducts = get(productLanding, 'iceCreamProducts', []);
  const merchProducts = get(productLanding, 'merchandiseProducts', []);

  return (
    <div className="absolute">
      <div
        className={cx(
          styles['ShopOnlineNavDropdown'],
          { [styles['ShopOnlineNavDropdown--with-alert']]: alertIsActive },
          'w100 pt3 px4 bg-peach z-nav fixed drip flex flex-row items-center'
        )}
      >
        <div className="col-6 flex flex-row justify-center mx-auto">
          {iceCreamProducts.map(product => {
            const fields = get(product, 'fields', {});
            const image = get(fields, 'dropdownNavImage.fields.file.url', '');
            const title = get(fields, 'productTitle', '');
            const handle = get(fields, 'productHandle', '');

            return (
              <Button
                key={handle}
                variant="style-none"
                to={`/products/${handle}`}
              >
                <div
                  className={cx(
                    styles['ShopOnlineNavDropdown__card'],
                    'bg-white mx2 p3 flex flex-column items-center justify-between'
                  )}
                >
                  <div
                    className={cx(
                      styles['ShopOnlineNavDropdown__image--container'],
                      'w100'
                    )}
                  >
                    <Image
                      className={cx(
                        styles['ShopOnlineNavDropdown__image'],
                        'wh100'
                      )}
                      src={image}
                    />
                  </div>
                  <div
                    className={cx(
                      styles['ShopOnlineNavDropdown__card-text-container'],
                      'flex flex-row items-center'
                    )}
                  >
                    <p className="white-space-normal center text-heavy-gray">
                      {title}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
        <div
          className={cx(
            styles['ShopOnlineNavDropdown__merch-container'],
            'col-2 absolute r0'
          )}
        >
          <p className="text-white bold">Merch</p>
          {merchProducts.map(merch => {
            const fields = get(merch, 'fields', {});
            const title = get(fields, 'title', '');
            const handle = get(fields, 'handle', '');
            return (
              <Button variant="style-none" to={`/merchandise/${handle}`}>
                <p className="text-white light mt1">{title}</p>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShopOnlineNavDropdown;

ShopOnlineNavDropdown.propTypes = {};

ShopOnlineNavDropdown.defaultProps = {};

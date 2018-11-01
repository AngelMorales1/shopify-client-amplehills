import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ShopOnlineNavDropdown.scss';
import { Image, Button } from 'components/base';

const ShopOnlineNavDropdown = ({
  productLanding,
  alertIsActive,
  shopOnlineDropdownIsOpen,
  openShopOnline,
  closeShopOnline
}) => {
  const iceCreamProducts = get(productLanding, 'iceCreamProducts', []);
  const merchProducts = get(productLanding, 'merchandiseProducts', []);

  return (
    <div
      onMouseEnter={openShopOnline}
      onMouseLeave={closeShopOnline}
      className={cx(
        styles['ShopOnlineNavDropdown'],
        {
          [styles['ShopOnlineNavDropdown--active']]: shopOnlineDropdownIsOpen
        },
        'relative transition-dropdown-slide-down'
      )}
    >
      <div
        className={cx(
          styles['ShopOnlineNavDropdown__nav-container'],
          {
            [styles[
              'ShopOnlineNavDropdown__nav-container--with-alert'
            ]]: alertIsActive
          },
          'absolute z-nav'
        )}
      >
        <div
          className={cx(
            'w100 pt3 px4 bg-peach fixed drip flex flex-row items-center'
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
                  onClick={closeShopOnline}
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
                <Button
                  onClick={closeShopOnline}
                  key={handle}
                  variant="style-none"
                  to={`/merchandise/${handle}`}
                >
                  <p className="text-white light mt1">{title}</p>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOnlineNavDropdown;

ShopOnlineNavDropdown.propTypes = {
  productLanding: PropTypes.object,
  alertIsActive: PropTypes.bool,
  shopOnlineDropdownIsOpen: PropTypes.bool,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
};

ShopOnlineNavDropdown.defaultProps = {
  productLanding: {},
  alertIsActive: false,
  shopOnlineDropdownIsOpen: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

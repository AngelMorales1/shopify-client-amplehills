import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import styles from './ShopDropdown.scss';
import { Image, Button } from 'components/base';

const ShopDropdown = ({
  productLanding,
  shopDropdownIsOpen,
  openShopDropdown,
  closeShopDropdown,
  products,
  settings
}) => {
  const iceCreamProducts = get(productLanding, 'iceCreamProducts', []);
  const merchProducts = get(productLanding, 'merchandiseProducts', []);

  return (
    <div
      onMouseEnter={openShopDropdown}
      onMouseLeave={closeShopDropdown}
      className={cx(
        styles['ShopDropdown'],
        {
          [styles['ShopDropdown--inactive']]: !shopDropdownIsOpen
        },
        'relative'
      )}
      aria-hidden={!shopDropdownIsOpen}
    >
      <div
        className={cx(styles['ShopDropdown__nav-container'], 'absolute z-nav')}
      >
        <div className={cx('w100 pt3 px4 bg-peach fixed drip')}>
          <div
            className={cx(
              'content-width mx-auto flex flex-row items-center justify-end',
              {
                'justify-center': !merchProducts.length
              }
            )}
          >
            <div className={cx(styles['ShopDropdown__product-wrapper'])}>
              <div
                className={cx(
                  styles['ShopDropdown__product-container'],
                  'flex flex-row justify-center mx-auto'
                )}
              >
                {settings.productsInNav.map(product => {
                  if (!product) return null;

                  return (
                    <div key={product._id} className="mx1">
                      <Button
                        ariaLabel={`Go to ${product.title}`}
                        onClick={closeShopDropdown}
                        variant="style-none"
                        to={`/products/${product.productHandle}`}
                      >
                        <div
                          className={cx(
                            styles['ShopDropdown__card'],
                            'bg-white p3 flex flex-column items-center justify-between'
                          )}
                        >
                          <div
                            className={cx(
                              styles['ShopDropdown__image--container'],
                              'w100'
                            )}
                          >
                            <Image
                              className={cx(
                                styles['ShopDropdown__image'],
                                'wh100'
                              )}
                              src={`${product.gridImage.src}?w=400`}
                            />
                          </div>
                          <div
                            className={cx(
                              styles['ShopDropdown__card-text-container'],
                              'flex flex-row items-center'
                            )}
                          >
                            <p className="white-space-normal center text-heavy-gray">
                              {product.title}
                            </p>
                          </div>
                        </div>
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* {merchProducts.length ? (
              <div className={cx(styles['ShopDropdown__merch-container'])}>
                <div className="ml2">
                  <p className="text-white bold">Merch</p>
                  {merchProducts.map(merch => {
                    const fields = get(merch, 'fields', {});
                    const title = get(fields, 'title', '');
                    const handle = get(fields, 'handle', '');
                    return (
                      <Button
                        ariaLabel={`Go to ${title}`}
                        onClick={closeShopDropdown}
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
            ) : null} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDropdown;

ShopDropdown.propTypes = {
  productLanding: PropTypes.object,
  shopDropdownIsOpen: PropTypes.bool,
  openShopDropdown: PropTypes.func,
  closeShopDropdown: PropTypes.func
};

ShopDropdown.defaultProps = {
  productLanding: null,
  shopDropdownIsOpen: false,
  openShopDropdown: () => {},
  closeShopDropdown: () => {}
};

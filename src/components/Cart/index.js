import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  updateLineItems,
  removeLineItems
} from 'state/actions/checkoutActions';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import products from 'state/selectors/products';
import lineItems from 'state/selectors/lineItems';
import checkoutModel from 'models/checkoutModel';
import itemModel from 'models/itemModel';
import productModel from 'models/productModel';

import { Button, Image, QuantitySelector, TextField } from 'components/base';
import DeleteModal from 'components/DeleteModal';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './Cart.scss';

const Cart = props => {
  const updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    props.actions.updateLineItems(get(props, 'checkout.id', null), items);
  };
  const {
    checkout,
    actions: { removeLineItems },
    items,
    products
  } = props;

  const breadcrumbs = [{ to: '/products', label: 'Continue Shopping' }];
  const cart = (
    <div className={cx(styles['Cart'], 'flex flex-column items-center')}>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
        className="flex flex-row items-center self-start mb4"
      />
      <h2 className="block-headline-mobile-small">Cart</h2>
      <div className={cx(styles['Cart__container'], 'w100')}>
        <div className="flex xs-hide sm-hide mt4 pt4 justify-between">
          <span className={cx(styles['Cart__item-title'], 'bold')}>Item</span>
          <span
            className={cx(
              styles['Cart__quantity-title'],
              'bold flex justify-end col-3'
            )}
          >
            Quantity
          </span>
          <span className="bold flex justify-end col-3">Total Price</span>
        </div>
        <div className={cx(styles['Cart__decorative-line'], 'mt3 w100')} />
        <div className="my3">
          {items.map(item => {
            const link = Object.values(products).find(
              value => value.id === item.productId
            ).handle;

            return (
              <div key={item.id} className="mb3">
                <div
                  className={cx(
                    styles['Cart__content-container'],
                    'flex items-start justify-end'
                  )}
                >
                  <div className="md-hide lg-hide flex items-start justify-between w100">
                    <div className="my2">
                      <Link
                        className="text-decoration-none"
                        exact
                        to={`/products/${link}`}
                      >
                        <span className="bold">{item.title}</span>
                      </Link>
                      <div className="flex flex-column mt2">
                        {item.subItems.map(subItem => {
                          return (
                            <span
                              key={subItem.handle}
                              className="small mb1"
                            >{`${subItem.quantity}x ${
                              products[subItem.handle].title
                            }`}</span>
                          );
                        })}
                      </div>
                    </div>
                    <span className="bold small my2 md-hide lg-hide">
                      {item.price}
                    </span>
                  </div>
                  <div
                    className={cx(
                      styles['Cart__title'],
                      'xs-hide sm-hide flex flex-column mr-auto'
                    )}
                  >
                    <Link
                      className="text-decoration-none my2 xs-hide sm-hide"
                      exact
                      to={`/products/${link}`}
                    >
                      <span className="bold ">{item.title}</span>
                    </Link>
                    {item.subItems.map(subItem => {
                      return (
                        <span key={subItem.handle} className="small mb1">{`${
                          subItem.quantity
                        }x ${products[subItem.handle].title}`}</span>
                      );
                    })}
                  </div>
                  <div
                    className={cx(
                      styles['Cart__content-inner-wrapper'],
                      'flex items-start mr2'
                    )}
                  >
                    <Button
                      className="my2 icon"
                      variant="icon"
                      onClick={() => removeLineItems(item.id)}
                    >
                      <Image src="/assets/images/icon-trash.svg" />
                    </Button>
                    <QuantitySelector
                      className={cx(styles['Cart__quantity'], 'my2')}
                      quantity={item.quantity}
                      variant="small"
                      onChange={quantity =>
                        updateLineItem(
                          item.id,
                          quantity,
                          get(props, 'checkout.id', null)
                        )
                      }
                    />
                  </div>
                  <span className="bold small my2 xs-hide sm-hide col-3 flex justify-end right">
                    ${item.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx(styles['Cart__decorative-line'], ' w100')} />
        <div
          className={cx(
            styles['Cart__shipping-info'],
            'flex flex-column justify-between'
          )}
        >
          <div className={cx(styles['Cart__shipping-info__container'], 'flex')}>
            <div className="col-12 md-col-5">
              <p className="uppercase info-text-small">
                When the shipping label is created you will receive an email
                with your tracking number.
              </p>
            </div>
            <div
              className={cx(
                styles['Cart__shipping-info__checkout'],
                'col-12 md-col-4'
              )}
            >
              <p
                className={cx(
                  styles['Cart__shipping-info__tax'],
                  'uppercase info-text-small flex items-center col-6 md-col-12'
                )}
              >
                Shipping & taxes calculated at checkout
              </p>
              <div
                className={cx(
                  styles['Cart__shipping-info-total'],
                  'flex justify-between'
                )}
              >
                <p className="price-text flex items-center mt1">{`Subtotal: $${
                  checkout.subtotalPrice
                }`}</p>

                <div className="my1 md-col-4 md-hide lg-hide">
                  <Button
                    className="flex items-center justify-center"
                    label="Checkout"
                    color="madison-blue"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['Cart__message-checkout-container'],
              'flex flex-row justify-between'
            )}
          >
            <div className="col-12 md-col-6">
              <h2 className="sub-title mt2 mb3">Gift Message</h2>
              <TextField
                className="mb2 md-hide lg-hide"
                variant="light-gray"
                placeholder={`Write a message`}
              />
              <TextField
                className="mb2 xs-hide sm-hide"
                variant="light-gray-tall"
                multiLine={true}
                placeholder={`Write a message`}
              />
              <span className="uppercase info-text-small">
                Gift messages will not include prices
              </span>
              <div
                className={cx(
                  styles['Cart__decorative-line'],
                  'mt3 md-hide lg-hide w100'
                )}
              />
            </div>
            <div className="my1 md-col-4 xs-hide sm-hide">
              <Button
                className="flex items-center justify-center"
                label="Checkout"
                color="madison-blue"
              />
            </div>
          </div>
        </div>
      </div>
      <DeleteModal />
    </div>
  );

  const emptyCart = (
    <div className="flex justify-center items-center flex-column p4">
      <h2 className="block-headline m4">Your cart is empty</h2>
      <Link className="text-decoration-none" exact to={`/products`}>
        shop
      </Link>
    </div>
  );

  return items.length > 0 ? cart : emptyCart;
};

Cart.propTypes = {
  actions: PropTypes.shape({
    removeLineItems: PropTypes.func,
    updateLineItems: PropTypes.func
  }),
  checkout: checkoutModel.propTypes,
  items: itemModel.propTypes,
  products: PropTypes.objectOf(productModel.propTypes)
};

Cart.defaultProps = {
  actions: {
    removeLineItems: () => {},
    updateLineItems: () => {}
  },
  checkout: checkoutModel.default,
  items: itemModel.default,
  products: {}
};

const mapStateToProps = (state, props) => {
  return {
    ...state,
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', []),
    items: lineItems(state),
    products: products(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        removeLineItems,
        updateLineItems
      },
      dispatch
    )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

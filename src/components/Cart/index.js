import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  updateLineItems,
  removeLineItems,
  updateNote
} from 'state/actions/checkoutActions';

import { IDLE, PENDING, FULFILLED, REJECTED } from 'constants/Status';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import products from 'state/selectors/products';
import lineItems from 'state/selectors/lineItems';
import checkoutModel from 'models/checkoutModel';
import itemModel from 'models/itemModel';
import productModel from 'models/productModel';

import {
  Button,
  Image,
  QuantitySelector,
  TextField,
  FormFlash
} from 'components/base';
import DeleteModal from 'components/DeleteModal';
import Breadcrumbs from 'components/Breadcrumbs';
import styles from './Cart.scss';

class Cart extends Component {
  constructor(props) {
    super(...arguments);

    this.state = {
      note: get(props.checkout, 'note') ? get(props.checkout, 'note') : ''
    };
  }

  updateNote = () => {
    const checkoutId = get(this.props, 'checkout.id', '');
    const { note } = this.state;
    const input = { note };

    this.props.actions.updateNote(checkoutId, input);
  };

  updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    this.props.actions.updateLineItems(
      get(this.props.checkout, 'id', ''),
      items
    );
  };

  render() {
    const { actions, checkout, items, products, updatingNote } = this.props;
    const currentNote = get(checkout, 'note') ? get(checkout, 'note') : '';
    const breadcrumbs = [{ to: '/products', label: 'Continue Shopping' }];

    const cart = (
      <div className={cx(styles['Cart'], 'flex flex-column')}>
        <Breadcrumbs breadcrumbs={breadcrumbs} className="mb4" />
        <h2 className="block-headline-mobile-small mx-auto">Cart</h2>
        <div className={cx(styles['Cart__container'])}>
          <div
            className={cx(
              styles['Cart__block-with-border'],
              'flex xs-hide sm-hide mt4 py3 justify-between'
            )}
          >
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

          <div className={cx(styles['Cart__block-with-border'], 'my3 pb3')}>
            {items.map(item => {
              const handle = Object.values(products).find(product => {
                return product.variants.some(
                  variant => variant.id === item.productId
                );
              }).handle;

              return (
                <div
                  key={item.id}
                  className={cx(styles['Cart__content-container'], 'my3 flex')}
                >
                  <div className="md-hide lg-hide flex items-start justify-between w100">
                    <div className="my2">
                      <Link
                        className="text-decoration-none"
                        to={`/products/${handle}`}
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
                      className="text-decoration-none"
                      to={`/products/${handle}`}
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
                    {products[handle].cartDetails ? (
                      <div className="flex flex-column">
                        <pre className={styles['Cart__product-details']}>
                          {products[handle].cartDetails}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                  <div
                    className={cx(
                      styles['Cart__content-inner-wrapper'],
                      'mr2 flex'
                    )}
                  >
                    <div
                      className={cx(
                        styles['Cart__delete'],
                        'flex items-center col-8'
                      )}
                    >
                      <Button
                        variant="style-none"
                        onClick={() => actions.removeLineItems(item.id)}
                      >
                        <Image
                          className="icon-small"
                          src="/assets/images/icon-trash.svg"
                        />
                      </Button>
                    </div>
                    <div className="flex items-center">
                      <QuantitySelector
                        quantity={item.quantity}
                        variant="small"
                        onChange={quantity =>
                          this.updateLineItem(item.id, quantity)
                        }
                      />
                    </div>
                  </div>
                  <span className="bold small my2 xs-hide sm-hide col-3 flex justify-end items-center">
                    ${item.price}
                  </span>
                </div>
              );
            })}
          </div>
          <div
            className={cx(
              styles['Cart__shipping-info'],
              'flex flex-column justify-between'
            )}
          >
            <div
              className={cx(styles['Cart__shipping-info__container'], 'flex')}
            >
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
              </div>
            </div>
          </div>
          <div
            className={cx(
              styles['Cart__message-checkout-container'],
              'flex flex-row justify-between'
            )}
          >
            <div className="col-12 md-col-6 xs-hide sm-hide">
              <div className="flex justify-between items-center">
                <h2 className="sub-title mt2 mb3">Gift Message</h2>
                <Button
                  disabled={
                    this.state.note === currentNote || updatingNote === PENDING
                  }
                  className={cx(styles['Cart__update-button'], {
                    [styles['Cart__update-button--active']]:
                      this.state.note !== currentNote
                  })}
                  variant="primary-small"
                  color="peach"
                  label="Update"
                  onClick={this.updateNote}
                />
              </div>
              {updatingNote === FULFILLED ? (
                <FormFlash
                  className="mb2"
                  success={true}
                  message="Your gift message has updated successfully."
                />
              ) : null}
              {updatingNote === REJECTED ? (
                <FormFlash
                  className="mt1"
                  error={true}
                  message="There was an unexpected error while updating your gift message."
                />
              ) : null}
              <TextField
                className="mb2 md-hide lg-hide"
                variant="light-gray"
                placeholder={`Write a message`}
              />
              <TextField
                className="mb2 xs-hide sm-hide"
                variant="light-gray-tall"
                multiLine={true}
                placeholder={`Write a message. Don't forget to include your name!`}
                value={this.state.note}
                onChange={note =>
                  note ? this.setState({ note }) : this.setState({ note: '' })
                }
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
            <div className="my1 md-col-4">
              <Button
                className="inline-block"
                label="Checkout"
                color="madison-blue"
                to={get(checkout, 'webUrl', '')}
              />
            </div>
          </div>
        </div>
        <DeleteModal />
      </div>
    );

    const emptyCart = (
      <div className="flex justify-center items-center flex-column p4">
        <h2 className="block-headline mt4 mb3">Your cart is empty!</h2>
        <Link className="text-decoration-none" to={`/products`}>
          <Button
            label="Find Your Pint &rarr;"
            color="madison-blue"
            variant="primary"
            to="/products"
          />
        </Link>
      </div>
    );

    return items.length ? cart : emptyCart;
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    checkout: get(state, 'session.checkout', {}),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', []),
    updatingNote: get(state, 'status.updatingNote', IDLE),
    items: lineItems(state),
    products: products(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        removeLineItems,
        updateLineItems,
        updateNote
      },
      dispatch
    )
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

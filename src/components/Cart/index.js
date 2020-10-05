import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {
  updateLineItems,
  removeLineItems,
  updateNote
} from 'state/actions/checkoutActions';

import { IDLE, PENDING, REJECTED } from 'constants/Status';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import products from 'state/selectors/products';
import events from 'state/selectors/events';
import allMerchandise from 'state/selectors/allMerchandise';
import lineItems from 'state/selectors/lineItems';
import partyDeposit from 'state/selectors/partyDeposit';
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

  updateNote = note => {
    const checkoutId = get(this.props, 'checkout.id', '');
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

  handleGiftMessageChange = newNote => {
    const note = newNote || '';
    this.setState({ note }, () => this.updateNote(note));
  };

  render() {
    const { actions, checkout, items, updatingNote } = this.props;
    const currentNote = get(checkout, 'note', '');
    const breadcrumbs = [{ to: '/products', label: 'Continue Shopping' }];
    const getNote = this.state.note ? this.state.note : null;
    const shippableItemIsIncluded = get(this, 'props.items', []).filter(
      item => {
        return get(item, 'product.shippableItem', false);
      }
    ).length;

    const cart = (
      <div className="transition-slide-up">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          className="mx-auto container-width"
        />
        <div className={cx(styles['Cart'], 'flex flex-column')}>
          <h2 className="block-headline-mobile-small mx-auto">Cart</h2>
          <div className={cx(styles['Cart__container'])}>
            <div
              className={cx(
                styles['Cart__block-with-border'],
                'flex xs-hide sm-hide mt4 py3 justify-between'
              )}
            >
              <span
                className={cx(styles['Cart__item-title'], 'line-item-title')}
              >
                Item
              </span>
              <span
                className={cx(
                  styles['Cart__quantity-title'],
                  'line-item-title flex justify-end col-3'
                )}
              >
                Quantity
              </span>
              <span className="line-item-title flex justify-end col-2">
                Total Price
              </span>
            </div>

            <div className={cx(styles['Cart__block-with-border'], 'my3')}>
              {get(this, 'props.items', []).map(item => {
                const product = item.product;
                const hasCartDetail = get(item, 'cartAttributes', []).length;

                return (
                  <div
                    key={item.id}
                    className={cx(
                      styles['Cart__content-container'],
                      'my3 flex'
                    )}
                  >
                    <div className="md-hide lg-hide flex items-start justify-between w100">
                      <div className="my2">
                        <Link
                          className="text-decoration-none"
                          to={get(product, 'link', '/')}
                        >
                          <span className="small bold">{item.title}</span>
                        </Link>
                        <div className="flex flex-column mt2">
                          {item.cartAttributes.map(cartItemDetail => {
                            if (`${cartItemDetail}`.startsWith('__'))
                              return null;
                            return (
                              <span key={cartItemDetail} className="small mb1">
                                {cartItemDetail}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <span className="line-item-title my2 md-hide lg-hide">
                        {item.price}
                      </span>
                    </div>
                    <div
                      className={cx(
                        styles['Cart__title'],
                        'xs-hide sm-hide flex flex-column mr-auto col-5'
                      )}
                    >
                      <Link
                        className={cx('text-decoration-none', {
                          [styles[
                            'Cart__title--with-cart-detail'
                          ]]: hasCartDetail,
                          [styles[
                            'Cart__title--without-cart-detail'
                          ]]: !hasCartDetail
                        })}
                        to={get(product, 'link', '/')}
                      >
                        <span className="small bold">{item.title}</span>
                      </Link>
                      {item.cartAttributes.map(cartItemDetail => {
                        if (`${cartItemDetail}`.startsWith('__')) return null;
                        return (
                          <span key={cartItemDetail} className="small mb1">
                            {cartItemDetail}
                          </span>
                        );
                      })}
                    </div>
                    <div
                      className={cx(
                        styles['Cart__content-inner-wrapper'],
                        'mr2 flex col-12 md-col-5'
                      )}
                    >
                      <div
                        className={cx(
                          styles['Cart__delete'],
                          'flex items-center col-7'
                        )}
                      >
                        <Button
                          ariaLabel={`Remove ${item.title ||
                            'item'} from your cart.`}
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
                          title={item.title}
                          disabled={true}
                          quantity={item.quantity}
                          variant="small"
                          onChange={quantity =>
                            this.updateLineItem(item.id, quantity)
                          }
                        />
                      </div>
                    </div>
                    <span className="line-item-title my2 xs-hide sm-hide col-2 flex justify-end items-center">
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
                <div className="col-12 md-col-6">
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
                  <p className="tout bold sm-hide xs-hide">
                    Subtotal: ${this.props.checkout.subtotalPrice}
                  </p>
                </div>
              </div>

              <div
                className={cx(
                  styles['Cart__message-checkout-container'],
                  'flex'
                )}
              >
                <div className="col-12 md-col-6">
                  {shippableItemIsIncluded ? (
                    <div>
                      <div className="flex justify-between items-center">
                        <h2
                          className={cx(
                            styles['Cart__gift-message'],
                            'sub-title mb2'
                          )}
                        >
                          Gift Message
                        </h2>
                      </div>
                      {updatingNote === REJECTED ? (
                        <FormFlash
                          className="mt1"
                          error={true}
                          message="There was an unexpected error while updating your gift message."
                        />
                      ) : null}
                      <TextField
                        ariaLabel="Add your gift message here"
                        className="mb2 md-hide lg-hide"
                        variant="light-gray"
                        placeholder="Write a message."
                        value={this.state.note}
                        onChange={note => this.handleGiftMessageChange(note)}
                      />
                      <TextField
                        ariaLabel="Add your gift message here"
                        className="mb2 xs-hide sm-hide"
                        variant="light-gray-tall"
                        type="textarea"
                        placeholder="Write a message (don't forget to include your name!)"
                        value={this.state.note}
                        onChange={note => this.handleGiftMessageChange(note)}
                      />
                      <span className="uppercase info-text-small">
                        Gift messages will only be applied to shippable
                        products. They will not be applied to events, cake
                        orders, or party deposits. Gift messages will not
                        include prices.
                      </span>
                      <div
                        className={cx(
                          styles['Cart__block-with-border'],
                          'mt3 md-hide lg-hide w100'
                        )}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="mt4 col-4 xs-hide sm-hide flex flex-row">
                  <Button
                    ariaLabel="Checkout"
                    className="inline-block mr3"
                    openInCurrentTab={true}
                    label="Checkout"
                    color="madison-blue"
                    disabled={
                      getNote !== currentNote || updatingNote === PENDING
                    }
                    to={get(checkout, 'webUrl', '')}
                  />
                </div>
              </div>
            </div>
            <div className="my1 col-12 md-col-4 flex flex-row items-center justify-between md-hide lg-hide">
              <p className="line-item-title">
                Subtotal: ${this.props.checkout.subtotalPrice}
              </p>
              <Button
                ariaLabel="Checkout"
                className="inline-block"
                openInCurrentTab={true}
                label="Checkout"
                color="madison-blue"
                disabled={getNote !== currentNote || updatingNote === PENDING}
                to={get(checkout, 'webUrl', '')}
              />
            </div>
          </div>
          <DeleteModal />
        </div>
      </div>
    );

    const emptyCart = (
      <div className="flex justify-center items-center flex-column p4">
        <h2 className="block-headline mt4 mb3">Your cart is empty!</h2>
        <Link className="text-decoration-none" to={`/products`}>
          <Button
            ariaLabel="Find your pint"
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
    checkout: get(state, 'session.checkout'),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', []),
    updatingNote: get(state, 'status.updatingNote', IDLE),
    items: lineItems(state),
    products: products(state),
    events: events(state),
    partyDeposit: partyDeposit(state),
    allMerchandise: allMerchandise(state)
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
  items: PropTypes.arrayOf(itemModel.propTypes),
  products: productModel.propTypes
};

Cart.defaultProps = {
  actions: {
    removeLineItems: () => {},
    updateLineItems: () => {}
  },
  checkout: checkoutModel.default,
  items: [],
  products: null
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);

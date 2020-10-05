import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeMiniCart } from 'state/actions/ui/miniCartUIActions';
import {
  updateLineItems,
  removeLineItems
} from 'state/actions/checkoutActions';

import products from 'state/selectors/products';
import checkout from 'state/selectors/checkout';
import allMerchandise from 'state/selectors/allMerchandise';
import lineItems from 'state/selectors/lineItems';
import events from 'state/selectors/events';
import partyDeposit from 'state/selectors/partyDeposit';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import checkoutModel from 'models/checkoutModel';

import { Button, Image, QuantitySelector } from 'components/base';
import DeleteModal from 'components/DeleteModal';
import styles from './MiniCart.scss';

class MiniCart extends Component {
  updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    this.props.actions.updateLineItems(this.props.checkout.id, items);
  };

  render() {
    const {
      checkout,
      items,
      miniCartIsOpen,
      actions: { closeMiniCart, removeLineItems }
    } = this.props;

    const classes = cx(
      styles['MiniCart'],
      'col-11 fixed z-nav bg-white card drop-shadow-xlarge',
      {
        [styles['MiniCart--open']]: miniCartIsOpen
      }
    );

    return (
      <div className="relative" aria-hidden={!miniCartIsOpen}>
        <div className={classes}>
          <div className="mb3 pt3 px3 center relative">
            <strong className="callout">Cart</strong>
            <Button
              ariaLabel="Close Mini Cart"
              variant="icon-small"
              className={cx(styles['MiniCart__close-button'], 'absolute r0 m3')}
              onClick={() => closeMiniCart()}
            >
              <Image src="/assets/images/icon-close.svg" />
            </Button>
          </div>

          <div className={cx(styles['MiniCart__line-items'], 'mb2 px3')}>
            {items.map(item => {
              const classes = cx(styles['MiniCart__line-item'], 'mb3', {
                mb4: item.cartAttributes.length,
                [styles['MiniCart__line-item--updating']]:
                  this.props.lineItemsBeingUpdated.includes(item.id) ||
                  this.props.lineItemsBeingRemoved.includes(item.id)
              });

              const { cartAttributes } = item;

              return (
                <div className={classes} key={item.id}>
                  <div className="mb2 flex flex-wrap justify-between">
                    <div className="flex flex-row justify-between w100">
                      <span className="line-item-title mr2 col-10">
                        {item.title}
                      </span>
                      <span className="line-item-title col-2">
                        ${item.price}
                      </span>
                    </div>
                    {cartAttributes.length ? (
                      <div className="w100">
                        <ul className="my1">
                          {cartAttributes.map(cartItemDetail => {
                            if (`${cartItemDetail}`.startsWith('__'))
                              return null;
                            return (
                              <li
                                className="sub-line-item small"
                                key={cartItemDetail}
                              >
                                {cartItemDetail}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="w100 flex justify-between">
                    <QuantitySelector
                      title={item.title}
                      disabled={true}
                      quantity={item.quantity}
                      variant="medium"
                      onChange={quantity =>
                        this.updateLineItem(item.id, quantity)
                      }
                    />
                    <Button
                      ariaLabel={`Remove ${item.title || 'item'} from the cart`}
                      variant="icon"
                      onClick={() => removeLineItems(item.id)}
                    >
                      <Image src="/assets/images/icon-trash.svg" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="my3 px3 flex justify-between items-center">
            <span className="bold">Subtotal: ${checkout.subtotalPrice}</span>
            <Button
              disabled={!items.length}
              to="/cart"
              color="madison-blue"
              onClick={() => closeMiniCart()}
              label="Checkout"
              className="mb1"
            />
          </div>
        </div>
        <DeleteModal />
      </div>
    );
  }
}

MiniCart.propTypes = {
  miniCartIsOpen: PropTypes.bool,
  lineItemsBeingRemoved: PropTypes.arrayOf(PropTypes.string),
  lineItemsBeingUpdated: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    removeLineItems: PropTypes.func,
    updateLineItems: PropTypes.func
  }),
  checkout: checkoutModel.propTypes,
  products: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  )
};

MiniCart.defaultProps = {
  miniCartIsOpen: false,
  lineItemsBeingRemoved: [''],
  lineItemsBeingUpdated: [''],
  actions: {
    removeLineItems: () => {},
    updateLineItems: () => {}
  },
  checkout: checkoutModel.default,
  products: []
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen', false),
    checkout: checkout(state),
    products: products(state),
    events: events(state),
    allMerchandise: allMerchandise(state),
    items: lineItems(state),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', []),
    partyDeposit: partyDeposit(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeMiniCart,
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
)(MiniCart);

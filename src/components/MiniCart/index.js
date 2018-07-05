import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeMiniCart } from 'state/actions/ui/miniCartUIActions';
import {
  confirmRemoveLineItems,
  cancelRemoveLineItems,
  updateLineItems,
  removeLineItems
} from 'state/actions/checkoutActions';
import products from 'state/selectors/products';
import lineItems from 'state/selectors/lineItems';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';

import { Button, Image, QuantitySelector } from 'components/base';
import styles from './MiniCart.scss';

class MiniCart extends Component {
  updateLineItem = (item, quantity) => {
    const items = [
      {
        id: item,
        quantity
      }
    ];

    this.props.actions.updateLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  confirmRemoveLineItems = item => {
    const items = [item];

    this.props.actions.confirmRemoveLineItems(
      get(this.props, 'checkout.id', null),
      items
    );
  };

  renderDeleteModal() {
    const classes = cx(
      'fixed-cover bg-white-wash flex justify-center items-center',
      styles['MiniCart__delete-modal'],
      {
        [styles['MiniCart__delete-modal--active']]: this.props
          .lineItemsBeingRemoved.length
      }
    );

    const id = this.props.lineItemsBeingRemoved[0];

    return (
      <div className={classes}>
        <div
          className={cx(
            styles['MiniCart__delete-modal-inner'],
            'w100 bg-white drop-shadow-xlarge p3 card'
          )}
        >
          <div className="mb4">
            <span className="big bold">
              Are you sure you want to remove this from your cart?
            </span>
          </div>
          <div className="flex justify-end">
            <Button
              variant="no-style"
              label="Cancel"
              className="mr3 text-peach"
              onClick={() => this.props.actions.cancelRemoveLineItems(id)}
            />
            <Button
              variant="primary"
              color="madison-blue"
              label="Yes"
              onClick={() => this.confirmRemoveLineItems(id)}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      checkout,
      items,
      products,
      actions: { closeMiniCart, removeLineItems }
    } = this.props;

    const classes = cx(
      styles['MiniCart'],
      'col-11 fixed z-nav p3 bg-white card drop-shadow-xlarge',
      {
        [styles['MiniCart--open']]: this.props.miniCartIsOpen
      }
    );

    return (
      <div className="relative">
        <div className={classes}>
          <div className="mb3 center relative">
            <strong className="callout">Cart</strong>
            <Button
              variant="icon-small"
              className="absolute t0 r0 mt1"
              onClick={() => closeMiniCart()}
            >
              <Image src="/assets/images/icon-close.svg" />
            </Button>
          </div>

          <div className={cx(styles['MiniCart__line-items'], 'mb4')}>
            {items.map(item => {
              const classes = cx(styles['MiniCart__line-item'], 'mb3', {
                mb4: item.subItems.length,
                [styles['MiniCart__line-item--updating']]:
                  this.props.lineItemsBeingUpdated.includes(item.id) ||
                  this.props.lineItemsBeingRemoved.includes(item.id)
              });

              const { subItems } = item;

              return (
                <div className={classes} key={item.id}>
                  <div className="mb2 flex flex-wrap justify-between">
                    <span className="line-item-title mr2">{item.title}</span>
                    <span className="line-item-title">${item.price}</span>
                    {subItems.length ? (
                      <div className="w100">
                        <ul className="mt2 mb1">
                          {subItems.map(subItem => (
                            <li
                              className="sub-line-item small"
                              key={subItem.handle}
                            >{`${subItem.quantity}x ${
                              products[subItem.handle].title
                            }`}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                  <div className="w100 flex justify-between">
                    <QuantitySelector
                      quantity={item.quantity}
                      variant="small"
                      onChange={quantity =>
                        this.updateLineItem(item.id, quantity)
                      }
                    />
                    <Button
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

          <div className="mt3 flex justify-between items-center">
            <span className="bold">Subtotal: ${checkout.subtotalPrice}</span>
            <Button
              disabled={!items.length}
              // TODO: redirect to amplehills.com/checkout
              to={checkout.webUrl}
              color="madison-blue"
              onClick={() => closeMiniCart()}
              label="Checkout"
            />
          </div>
        </div>
        {this.renderDeleteModal()}
      </div>
    );
  }
}

MiniCart.propTypes = {
  actions: PropTypes.shape({
    closeMiniCart: PropTypes.func,
    removeLineItems: PropTypes.func,
    cancelRemoveLineItems: PropTypes.func,
    confirmRemoveLineItems: PropTypes.func,
    updateLineItems: PropTypes.func
  }),
  checkout: PropTypes.shape({
    id: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        quantity: PropTypes.number
      })
    )
  }),
  miniCartIsOpen: PropTypes.bool,
  lineItemsBeingRemoved: PropTypes.arrayOf(PropTypes.string),
  lineItemsBeingUpdated: PropTypes.arrayOf(PropTypes.string)
};

MiniCart.defaultProps = {
  actions: {
    closeMiniCart: () => {},
    removeLineItems: () => {},
    cancelRemoveLineItems: () => {},
    confirmRemoveLineItems: () => {},
    updateLineItems: () => {}
  },
  checkout: {
    id: '',
    items: [
      {
        id: '',
        title: '',
        quantity: 1
      }
    ]
  },
  miniCartIsOpen: false,
  lineItemsBeingRemoved: [],
  lineItemsBeingUpdated: []
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen', false),
    checkout: get(state, 'session.checkout', {}),
    products: products(state),
    items: lineItems(state),
    lineItemsBeingUpdated: get(state, 'status.lineItemsBeingUpdated', []),
    lineItemsBeingRemoved: get(state, 'status.lineItemsBeingRemoved', [])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        closeMiniCart,
        removeLineItems,
        cancelRemoveLineItems,
        confirmRemoveLineItems,
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
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
import lineItems from 'state/selectors/lineItems';

import PropTypes from 'prop-types';
import cx from 'classnames';
import get from 'utils/get';
import checkoutModel from 'models/checkoutModel';
import productModel from 'models/productModel';

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
      products,
      actions: { closeMiniCart, removeLineItems }
    } = this.props;

    console.log(checkout);

    const classes = cx(
      styles['MiniCart'],
      'col-11 fixed z-nav bg-white card drop-shadow-xlarge',
      {
        [styles['MiniCart--open']]: this.props.miniCartIsOpen
      }
    );

    return (
      <div className="relative">
        <div className={classes}>
          <div className="mb3 pt3 px3 center relative">
            <strong className="callout">Cart</strong>
            <Button
              variant="icon-small"
              className={cx(styles['MiniCart__close-button'], 'absolute r0 m3')}
              onClick={() => closeMiniCart()}
            >
              <Image src="/assets/images/icon-close.svg" />
            </Button>
          </div>

          <div className={cx(styles['MiniCart__line-items'], 'mb2 px3')}>
            {items.map(item => {
              const handle = Object.values(products).find(product => {
                return product.variants.some(
                  variant => variant.id === item.productId
                );
              }).handle;

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
                        <ul className="my1">
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
                    {products[handle].cartDetails ? (
                      <div className="flex flex-column my1">
                        <pre className={styles['MiniCart__product-details']}>
                          {products[handle].cartDetails}
                        </pre>
                      </div>
                    ) : null}
                  </div>
                  <div className="w100 flex justify-between">
                    <QuantitySelector
                      quantity={item.quantity}
                      variant="medium"
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

          <div className="my3 px3 flex justify-between items-center">
            <span className="bold">Subtotal: ${checkout.subtotalPrice}</span>
            <Button
              disabled={!items.length}
              // TODO: redirect to amplehills.com/checkout
              to={checkout.webUrl}
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
  products: PropTypes.objectOf(productModel.propTypes)
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
  products: {}
};

const mapStateToProps = state => {
  return {
    ...state,
    miniCartIsOpen: get(state, 'miniCartUI.miniCartIsOpen', false),
    checkout: checkout(state),
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
